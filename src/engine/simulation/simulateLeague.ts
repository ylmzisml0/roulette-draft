// ============================================
// League Simulation Engine
// ============================================

import type {
  SimulateLeagueRequest,
  LeagueSimulationResponse,
  TeamRatings,
  MatchFixture,
  TeamStats,
  MatchEvent,
  YellowCardEvent,
  RedCardEvent,
} from './types';

// ============================================
// Deterministic PRNG (Mulberry32)
// ============================================

function seededRng(seed: string | number): () => number {
  let state: number;
  
  if (typeof seed === 'string') {
    // Hash string to number
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      const char = seed.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    state = Math.abs(hash);
  } else {
    state = seed;
  }
  
  return () => {
    state = (state + 0x6D2B79F5) | 0;
    let t = Math.imul(state ^ (state >>> 15), state | 1);
    t = t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ============================================
// Position Categorization
// ============================================

function getPositionCategory(position: string): 'GK' | 'DEF' | 'MID' | 'ATT' {
  const pos = position.toUpperCase();
  if (pos === 'GK') return 'GK';
  if (pos.includes('CB') || pos.includes('LB') || pos.includes('RB') || pos.includes('WB') || pos === 'CB' || pos === 'LB' || pos === 'RB') return 'DEF';
  if (pos.includes('DM') || pos.includes('CM') || pos.includes('AM') || pos.includes('CDM') || pos.includes('CAM') || pos === 'CM') return 'MID';
  return 'ATT'; // ST, CF, LW, RW, SS, etc.
}

// ============================================
// Team Rating Calculation
// ============================================

function scaleMarketValue(mv: number): number {
  // Logistic scale: scaled = 100 / (1 + exp(-(log10(mv) - µ) * k))
  // µ ~ 6.5 (≈ €3m), k ~ 1.15
  if (mv <= 0) return 20; // Minimum rating for missing values
  const log10mv = Math.log10(mv);
  const mu = 6.5;
  const k = 1.15;
  const scaled = 100 / (1 + Math.exp(-(log10mv - mu) * k));
  return Math.max(20, Math.min(100, scaled));
}

function computeTeamRatings(
  team: SimulateLeagueRequest['teams'][0],
  leagueMedianMV: number
): TeamRatings {
  const positions: {
    GK: number[];
    DEF: number[];
    MID: number[];
    ATT: number[];
  } = {
    GK: [],
    DEF: [],
    MID: [],
    ATT: [],
  };

  // Group players by position and collect market values
  team.players.forEach(player => {
    const category = getPositionCategory(player.position);
    const mv = player.marketValue ?? leagueMedianMV;
    const overall = player.overall;
    
    // Scale from market value
    let effective = scaleMarketValue(mv);
    
    // Blend with overall if provided (70% MV-scaled, 30% overall)
    if (overall !== undefined && overall >= 0 && overall <= 100) {
      effective = 0.7 * effective + 0.3 * overall;
    }
    
    positions[category].push(effective);
  });

  // Compute weighted mean for each category (at least 1 player assumed)
  const keeperRating = positions.GK.length > 0
    ? positions.GK.reduce((sum, val) => sum + val, 0) / positions.GK.length
    : 50; // Default if no GK
  
  const defenseRating = positions.DEF.length > 0
    ? positions.DEF.reduce((sum, val) => sum + val, 0) / positions.DEF.length
    : 50;
  
  const midfieldRating = positions.MID.length > 0
    ? positions.MID.reduce((sum, val) => sum + val, 0) / positions.MID.length
    : 50;
  
  const attackRating = positions.ATT.length > 0
    ? positions.ATT.reduce((sum, val) => sum + val, 0) / positions.ATT.length
    : 50;

  // Composite power rating
  const powerRating = 
    0.30 * attackRating +
    0.30 * midfieldRating +
    0.30 * defenseRating +
    0.10 * keeperRating;

  return {
    keeperRating: Math.round(keeperRating * 10) / 10,
    defenseRating: Math.round(defenseRating * 10) / 10,
    midfieldRating: Math.round(midfieldRating * 10) / 10,
    attackRating: Math.round(attackRating * 10) / 10,
    powerRating: Math.round(powerRating * 10) / 10,
  };
}

// ============================================
// Poisson Distribution
// ============================================

function poissonPMF(k: number, lambda: number): number {
  if (lambda <= 0) return k === 0 ? 1 : 0;
  let logProb = -lambda + k * Math.log(lambda);
  for (let i = 2; i <= k; i++) {
    logProb -= Math.log(i);
  }
  return Math.exp(logProb);
}

function poissonSample(lambda: number, rnd: () => number): number {
  if (lambda <= 0.1) return 0;
  if (lambda >= 3.5) lambda = 3.5;
  
  // Build cumulative distribution up to max 10 goals
  const cdf: number[] = [];
  let cumsum = 0;
  for (let k = 0; k <= 10; k++) {
    cumsum += poissonPMF(k, lambda);
    cdf.push(cumsum);
  }
  
  // Sample using inverse transform
  const u = rnd();
  for (let k = 0; k < cdf.length; k++) {
    if (u <= cdf[k]) {
      return k;
    }
  }
  return Math.min(10, Math.floor(lambda));
}

// ============================================
// Expected Goals & Score Generation
// ============================================

function computeExpectedGoals(
  homeTeam: TeamRatings,
  awayTeam: TeamRatings,
  homeAdvantage: number = 4
): { xgHome: number; xgAway: number } {
  // Apply home advantage
  const homePower = homeTeam.powerRating + homeAdvantage;
  const awayPower = awayTeam.powerRating;

  // Attack/defense biases
  const atkBiasHome = homeTeam.attackRating / 50;
  const defBiasAway = awayTeam.defenseRating / 50;
  const atkBiasAway = awayTeam.attackRating / 50;
  const defBiasHome = homeTeam.defenseRating / 50;

  // Base league goal rate
  const baseHomeRate = 1.35;
  const baseAwayRate = 1.10;

  // Convert to lambdas
  let lambdaHome = baseHomeRate * atkBiasHome / defBiasAway * (homePower + 10) / (awayPower + 10);
  let lambdaAway = baseAwayRate * atkBiasAway / defBiasHome * (awayPower + 10) / (homePower + 10);

  // Clamp
  lambdaHome = Math.max(0.1, Math.min(3.5, lambdaHome));
  lambdaAway = Math.max(0.1, Math.min(3.5, lambdaAway));

  return {
    xgHome: Math.round(lambdaHome * 100) / 100,
    xgAway: Math.round(lambdaAway * 100) / 100,
  };
}

function generateScore(
  xgHome: number,
  xgAway: number,
  rnd: () => number
): { homeScore: number; awayScore: number } {
  const homeScore = poissonSample(xgHome, rnd);
  const awayScore = poissonSample(xgAway, rnd);
  return { homeScore, awayScore };
}

// ============================================
// Weighted Minute Distribution
// ============================================

function weightedMinute(rnd: () => number): number {
  // Heavier in 15-30, 60-90
  const u = rnd();
  if (u < 0.05) {
    // 0-15: 5%
    return Math.floor(rnd() * 15) + 1;
  } else if (u < 0.35) {
    // 15-30: 30%
    return Math.floor(rnd() * 15) + 16;
  } else if (u < 0.65) {
    // 30-45: 30%
    return Math.floor(rnd() * 15) + 31;
  } else if (u < 0.80) {
    // 45-60: 15%
    return Math.floor(rnd() * 15) + 46;
  } else {
    // 60-90: 20%
    return Math.floor(rnd() * 30) + 61;
  }
}

// ============================================
// Match Event Generation
// ============================================

function assignScorersAndEvents(
  homeTeam: SimulateLeagueRequest['teams'][0],
  awayTeam: SimulateLeagueRequest['teams'][0],
  homeScore: number,
  awayScore: number,
  rnd: () => number
): MatchEvent[] {
  const events: MatchEvent[] = [];
  
  // Helper to get players by position category
  const getPlayersByCategory = (team: SimulateLeagueRequest['teams'][0], category: 'GK' | 'DEF' | 'MID' | 'ATT'): string[] => {
    return team.players
      .filter(p => getPositionCategory(p.position) === category)
      .map(p => p.name);
  };

  const homeFW = getPlayersByCategory(homeTeam, 'ATT');
  const homeMF = getPlayersByCategory(homeTeam, 'MID');
  const homeDF = getPlayersByCategory(homeTeam, 'DEF');
  const awayFW = getPlayersByCategory(awayTeam, 'ATT');
  const awayMF = getPlayersByCategory(awayTeam, 'MID');
  const awayDF = getPlayersByCategory(awayTeam, 'DEF');

  // Generate goals
  const goalMinutes: Array<{ minute: number; team: 'home' | 'away'; scorerCategory: 'FW' | 'MF' | 'DF' | 'OG' }> = [];
  
  for (let i = 0; i < homeScore; i++) {
    const minute = Math.min(90, weightedMinute(rnd));
    const categoryRoll = rnd();
    let scorerCategory: 'FW' | 'MF' | 'DF' | 'OG';
    if (categoryRoll < 0.55) scorerCategory = 'FW';
    else if (categoryRoll < 0.85) scorerCategory = 'MF';
    else if (categoryRoll < 0.95) scorerCategory = 'DF';
    else scorerCategory = 'OG';
    
    goalMinutes.push({ minute, team: 'home', scorerCategory });
  }
  
  for (let i = 0; i < awayScore; i++) {
    const minute = Math.min(90, weightedMinute(rnd));
    const categoryRoll = rnd();
    let scorerCategory: 'FW' | 'MF' | 'DF' | 'OG';
    if (categoryRoll < 0.55) scorerCategory = 'FW';
    else if (categoryRoll < 0.85) scorerCategory = 'MF';
    else if (categoryRoll < 0.95) scorerCategory = 'DF';
    else scorerCategory = 'OG';
    
    goalMinutes.push({ minute, team: 'away', scorerCategory });
  }

  // Assign actual player names and assists
  goalMinutes.forEach(({ minute, team, scorerCategory }) => {
    const isHome = team === 'home';
    const teamPlayers = isHome ? homeTeam.players : awayTeam.players;
    let scorer: string | undefined;
    let assistBy: string | undefined;
    
    if (scorerCategory === 'OG') {
      // Own goal - scorer is from opposite team
      const oppositeTeam = isHome ? awayTeam : homeTeam;
      const dfPlayers = getPlayersByCategory(oppositeTeam, 'DEF');
      scorer = dfPlayers.length > 0 ? dfPlayers[Math.floor(rnd() * dfPlayers.length)] : 'Unknown Player';
    } else {
      const pool = isHome
        ? (scorerCategory === 'FW' ? homeFW : scorerCategory === 'MF' ? homeMF : homeDF)
        : (scorerCategory === 'FW' ? awayFW : scorerCategory === 'MF' ? awayMF : awayDF);
      
      if (pool.length > 0) {
        scorer = pool[Math.floor(rnd() * pool.length)];
      } else {
        // Fallback to any player
        scorer = teamPlayers[Math.floor(rnd() * teamPlayers.length)]?.name || 'Unknown Player';
      }
    }

    // 25-35% chance of assist
    if (scorerCategory !== 'OG' && rnd() < 0.30) {
      const assistPool = isHome ? [...homeMF, ...getPlayersByCategory(homeTeam, 'ATT')] : [...awayMF, ...getPlayersByCategory(awayTeam, 'ATT')];
      if (assistPool.length > 0) {
        const assistPlayer = assistPool[Math.floor(rnd() * assistPool.length)];
        if (assistPlayer !== scorer) {
          assistBy = assistPlayer;
        }
      }
    }

    const detailOptions: Array<'OpenPlay' | 'SetPiece' | 'Penalty' | 'OwnGoal' | 'Counter'> = 
      scorerCategory === 'OG' 
        ? ['OwnGoal']
        : ['OpenPlay', 'SetPiece', 'Penalty', 'Counter'];
    
    const detail = detailOptions[Math.floor(rnd() * detailOptions.length)];

    events.push({
      type: 'GOAL',
      minute,
      teamId: isHome ? homeTeam.id : awayTeam.id,
      team: isHome ? homeTeam.name : awayTeam.name,
      playerName: scorer,
      assistBy,
      detail,
    });
  });

  // Generate yellow cards (1-3 per match, reduced)
  const yellowCardCount = Math.max(1, Math.min(3, Math.round(poissonSample(1.8, rnd))));
  
  for (let i = 0; i < yellowCardCount; i++) {
    const minute = Math.min(90, weightedMinute(rnd));
    const teamRoll = rnd();
    const isHomeCard = teamRoll < 0.5;
    const team = isHomeCard ? homeTeam : awayTeam;
    const player = team.players[Math.floor(rnd() * team.players.length)]?.name || 'Unknown Player';
    
    events.push({
      type: 'YELLOW',
      minute,
      teamId: team.id,
      team: team.name,
      playerName: player,
    });
  }

  // Small chance of red card (only if yellow exists)
  const yellowEvents = events.filter(e => e.type === 'YELLOW') as YellowCardEvent[];
  if (yellowEvents.length > 0 && rnd() < 0.03) {
    const yellowToUpgrade = yellowEvents[Math.floor(rnd() * yellowEvents.length)];
    const redEvent: RedCardEvent = {
      type: 'RED',
      minute: yellowToUpgrade.minute,
      teamId: yellowToUpgrade.teamId,
      team: yellowToUpgrade.team,
      playerName: yellowToUpgrade.playerName,
    };
    events.push(redEvent);
  }

  // No substitutions - removed

  // Sort all events by minute
  events.sort((a, b) => a.minute - b.minute);
  
  return events;
}

// ============================================
// Fixture Generation (Round-Robin)
// ============================================

function buildFixtures(
  teams: SimulateLeagueRequest['teams'],
  providedFixtures?: SimulateLeagueRequest['fixtures']
): MatchFixture[] {
  if (providedFixtures && providedFixtures.length > 0) {
    // Use provided fixtures
    return providedFixtures.map((fix, idx) => ({
      homeTeamId: fix.homeTeamId,
      awayTeamId: fix.awayTeamId,
      round: Math.floor(idx / (teams.length / 2)) + 1,
    }));
  }

  // Generate double round-robin (each team plays each other twice: home and away)
  const fixtures: MatchFixture[] = [];
  const teamIds = teams.map(t => t.id);
  const n = teamIds.length;
  
  // Double round-robin: each team plays each other twice (home and away)
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i !== j) {
        // Home match
        fixtures.push({
          homeTeamId: teamIds[i],
          awayTeamId: teamIds[j],
          round: 0, // Will be set below
        });
      }
    }
  }
  
  // Distribute matches across rounds
  // Each round should have approximately n/2 matches (when n is even) or (n-1)/2 (when n is odd)
  const matchesPerRound = Math.ceil(n / 2);
  fixtures.forEach((fix, idx) => {
    fix.round = Math.floor(idx / matchesPerRound) + 1;
  });

  return fixtures;
}

// ============================================
// Match ID Generation (Deterministic)
// ============================================

function generateMatchId(
  leagueId: string,
  season: string | undefined,
  round: number,
  homeTeamId: string,
  awayTeamId: string
): string {
  // Simple hash for deterministic ID
  const str = `${leagueId}|${season || ''}|${round}|${homeTeamId}|${awayTeamId}`;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16).padStart(8, '0');
}

// ============================================
// Standings Calculation with Tiebreakers
// ============================================

function computeStandings(
  results: LeagueSimulationResponse['results'],
  teamPowers: LeagueSimulationResponse['teamPowers']
): LeagueSimulationResponse['standings'] {
  const statsMap = new Map<string, TeamStats>();
  
  // Initialize stats for all teams
  teamPowers.forEach(tp => {
    statsMap.set(tp.teamId, {
      teamId: tp.teamId,
      team: tp.teamName,
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDiff: 0,
      points: 0,
      powerRating: tp.powerRating,
    });
  });

  // Aggregate results
  results.forEach(match => {
    const homeStats = statsMap.get(match.homeTeamId)!;
    const awayStats = statsMap.get(match.awayTeamId)!;

    homeStats.played++;
    awayStats.played++;
    homeStats.goalsFor += match.homeScore;
    homeStats.goalsAgainst += match.awayScore;
    awayStats.goalsFor += match.awayScore;
    awayStats.goalsAgainst += match.homeScore;

    if (match.winner === 'HOME') {
      homeStats.won++;
      homeStats.points += 3;
      awayStats.lost++;
    } else if (match.winner === 'AWAY') {
      awayStats.won++;
      awayStats.points += 3;
      homeStats.lost++;
    } else {
      homeStats.drawn++;
      homeStats.points += 1;
      awayStats.drawn++;
      awayStats.points += 1;
    }
  });

  // Calculate goal difference
  statsMap.forEach(stats => {
    stats.goalDiff = stats.goalsFor - stats.goalsAgainst;
  });

  // Sort with tiebreakers
  const standings = Array.from(statsMap.values()).sort((a, b) => {
    // 1. Points
    if (b.points !== a.points) return b.points - a.points;
    
    // 2. Goal Difference
    if (b.goalDiff !== a.goalDiff) return b.goalDiff - a.goalDiff;
    
    // 3. Goals For
    if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
    
    // 4. Head-to-head (simplified: use direct match result)
    const h2hResult = results.find(r => 
      (r.homeTeamId === a.teamId && r.awayTeamId === b.teamId) ||
      (r.homeTeamId === b.teamId && r.awayTeamId === a.teamId)
    );
    
    if (h2hResult) {
      let aPoints = 0;
      let bPoints = 0;
      
      if (h2hResult.homeTeamId === a.teamId) {
        if (h2hResult.winner === 'HOME') aPoints = 3;
        else if (h2hResult.winner === 'AWAY') bPoints = 3;
        else { aPoints = 1; bPoints = 1; }
      } else {
        if (h2hResult.winner === 'AWAY') aPoints = 3;
        else if (h2hResult.winner === 'HOME') bPoints = 3;
        else { aPoints = 1; bPoints = 1; }
      }
      
      if (bPoints !== aPoints) return bPoints - aPoints;
    }
    
    // 5. Power Rating
    if (b.powerRating !== a.powerRating) return b.powerRating - a.powerRating;
    
    // 6. Lexicographic team name
    return a.team.localeCompare(b.team);
  });

  // Assign ranks
  return standings.map((stat, idx) => ({
    ...stat,
    rank: idx + 1,
  }));
}

// ============================================
// Main Simulation Function
// ============================================

export async function simulateLeague(
  req: SimulateLeagueRequest
): Promise<LeagueSimulationResponse> {
  // Derive seed if not provided
  const seed = req.seed || `${req.leagueId}-${req.season || 'default'}-${req.teams.map(t => t.id).join(',')}`;
  const rnd = seededRng(seed);

  // Calculate league median market value (for missing values)
  const allMarketValues = req.teams
    .flatMap(t => t.players)
    .map(p => p.marketValue)
    .filter((mv): mv is number => mv !== undefined && mv > 0);
  
  const leagueMedianMV = allMarketValues.length > 0
    ? allMarketValues.sort((a, b) => a - b)[Math.floor(allMarketValues.length / 2)]
    : 5000000; // Default €5M

  // Compute team ratings
  const teamRatingsMap = new Map<string, TeamRatings>();
  const teamPowers: LeagueSimulationResponse['teamPowers'] = req.teams.map(team => {
    const ratings = computeTeamRatings(team, leagueMedianMV);
    teamRatingsMap.set(team.id, ratings);
    return {
      teamId: team.id,
      teamName: team.name,
      powerRating: ratings.powerRating,
      attackRating: ratings.attackRating,
      midfieldRating: ratings.midfieldRating,
      defenseRating: ratings.defenseRating,
      keeperRating: ratings.keeperRating,
    };
  });

  // Build fixtures
  const fixtures = buildFixtures(req.teams, req.fixtures);
  
  // Create team lookup
  const teamMap = new Map(req.teams.map(t => [t.id, t]));

  // Simulate matches
  const results: LeagueSimulationResponse['results'] = fixtures.map(fixture => {
    const homeTeam = teamMap.get(fixture.homeTeamId)!;
    const awayTeam = teamMap.get(fixture.awayTeamId)!;
    const homeRatings = teamRatingsMap.get(fixture.homeTeamId)!;
    const awayRatings = teamRatingsMap.get(fixture.awayTeamId)!;

    // Compute xG
    const { xgHome, xgAway } = computeExpectedGoals(homeRatings, awayRatings);

    // Generate score
    const { homeScore, awayScore } = generateScore(xgHome, xgAway, rnd);

    // Determine winner
    const winner: 'HOME' | 'AWAY' | 'DRAW' = 
      homeScore > awayScore ? 'HOME' :
      awayScore > homeScore ? 'AWAY' : 'DRAW';

    // Generate events
    const events = assignScorersAndEvents(homeTeam, awayTeam, homeScore, awayScore, rnd);

    // Generate match ID
    const matchId = generateMatchId(req.leagueId, req.season, fixture.round, fixture.homeTeamId, fixture.awayTeamId);

    // Generate synthetic date (round-based)
    const baseDate = new Date();
    baseDate.setDate(baseDate.getDate() + (fixture.round - 1) * 7); // Weekly matches
    const date = baseDate.toISOString();

    return {
      matchId,
      round: fixture.round,
      date,
      venue: 'home' as const,
      homeTeamId: fixture.homeTeamId,
      homeTeam: homeTeam.name,
      awayTeamId: fixture.awayTeamId,
      awayTeam: awayTeam.name,
      homeScore,
      awayScore,
      xgHome,
      xgAway,
      winner,
      events,
    };
  });

  // Compute standings
  const standings = computeStandings(results, teamPowers);

  return {
    simulationDate: new Date().toISOString(),
    leagueId: req.leagueId,
    leagueName: req.leagueName || req.leagueId,
    season: req.season,
    totalMatches: results.length,
    seed,
    teamPowers,
    results,
    standings,
  };
}

