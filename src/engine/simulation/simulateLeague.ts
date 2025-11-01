// ============================================
// League Simulation Engine (Upgraded)
// ============================================

import type {
  SimulateLeagueRequest,
  LeagueSimulationResponse,
  TeamRatings,
  MatchFixture,
  TeamStats,
  MatchEvent,
  GoalEvent,
  YellowCardEvent,
  RedCardEvent,
  SubstitutionEvent,
} from './types';

// ============================================
// Deterministic PRNG (Mulberry32)
// ============================================

function seededRng(seed: string | number): () => number {
  let state: number;
  
  if (typeof seed === 'string') {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      const char = seed.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
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
// Position Weighted Scoring
// ============================================

const scorerWeights: Record<string, number> = {
  ST: 0.38,
  CF: 0.08,
  SS: 0.06,
  LW: 0.10,
  RW: 0.10,
  AM: 0.10,
  CM: 0.05,
  DM: 0.02,
  WB: 0.02,
  LB: 0.01,
  RB: 0.01,
  CB: 0.03,
  // GK: 0.00 (never scores except OG)
};

function getPositionGroup(position: string): string {
  const pos = position.toUpperCase();
  // Map all position variations to standard groups
  if (pos === 'GK') return 'GK';
  if (pos === 'ST' || pos === 'CF' || pos === 'SS') return pos;
  if (pos === 'LW' || pos === 'RW') return pos;
  if (pos === 'AM' || pos === 'CAM') return 'AM';
  if (pos === 'CM' || pos === 'LCM' || pos === 'RCM' || pos === 'CDM') {
    if (pos.includes('DM')) return 'DM';
    return 'CM';
  }
  if (pos === 'WB' || pos === 'LWB' || pos === 'RWB') return 'WB';
  if (pos === 'LB' || pos === 'RB') return pos;
  if (pos === 'CB' || pos === 'LCB' || pos === 'RCB') return 'CB';
  // Default fallback
  return pos;
}

function getPlayersByPosition(team: SimulateLeagueRequest['teams'][0], position: string): Array<{ name: string; position: string }> {
  return team.players.filter(p => getPositionGroup(p.position) === position);
}

function weightedSample<T>(items: T[], weights: number[], rnd: () => number): T | null {
  if (items.length === 0 || items.length !== weights.length) return null;
  
  const totalWeight = weights.reduce((sum, w) => sum + w, 0);
  if (totalWeight <= 0) return items[0] || null;
  
  let random = rnd() * totalWeight;
  for (let i = 0; i < items.length; i++) {
    random -= weights[i];
    if (random <= 0) return items[i];
  }
  return items[items.length - 1];
}

// ============================================
// Team Rating Calculation
// ============================================

function scaleMarketValue(mv: number): number {
  if (mv <= 0) return 20;
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

  team.players.forEach(player => {
    const pos = player.position.toUpperCase();
    let category: 'GK' | 'DEF' | 'MID' | 'ATT';
    
    if (pos === 'GK') {
      category = 'GK';
    } else if (pos.includes('CB') || pos.includes('LB') || pos.includes('RB') || pos.includes('WB')) {
      category = 'DEF';
    } else if (pos.includes('DM') || pos.includes('CM') || pos.includes('AM') || pos.includes('CAM') || pos.includes('CDM')) {
      category = 'MID';
    } else {
      category = 'ATT'; // ST, CF, LW, RW, SS, etc.
    }
    
    const mv = player.marketValue ?? leagueMedianMV;
    let effective = scaleMarketValue(mv);
    
    if (player.overall !== undefined && player.overall >= 0 && player.overall <= 100) {
      effective = 0.7 * effective + 0.3 * player.overall;
    }
    
    positions[category].push(effective);
  });

  const keeperRating = positions.GK.length > 0
    ? positions.GK.reduce((sum, val) => sum + val, 0) / positions.GK.length
    : 50;
  
  const defenseRating = positions.DEF.length > 0
    ? positions.DEF.reduce((sum, val) => sum + val, 0) / positions.DEF.length
    : 50;
  
  const midfieldRating = positions.MID.length > 0
    ? positions.MID.reduce((sum, val) => sum + val, 0) / positions.MID.length
    : 50;
  
  const attackRating = positions.ATT.length > 0
    ? positions.ATT.reduce((sum, val) => sum + val, 0) / positions.ATT.length
    : 50;

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

function poisson(lambda: number, rnd: () => number): number {
  if (lambda <= 0.1) return 0;
  if (lambda >= 3.5) lambda = 3.5;
  
  const cdf: number[] = [];
  let cumsum = 0;
  for (let k = 0; k <= 10; k++) {
    cumsum += poissonPMF(k, lambda);
    cdf.push(cumsum);
  }
  
  const u = rnd();
  for (let k = 0; k < cdf.length; k++) {
    if (u <= cdf[k]) {
      return k;
    }
  }
  return Math.min(10, Math.floor(lambda));
}

// ============================================
// Expected Goals with Home Advantage
// ============================================

function computeExpectedGoals(
  homeTeam: TeamRatings,
  awayTeam: TeamRatings,
  homeAdvantagePower: number = 5,
  homeAttackMultiplier: number = 1.12,
  awayAttackMultiplier: number = 0.88,
  awayPowerPenalty: number = 4
): { xgHome: number; xgAway: number } {
  // Apply home advantage to power rating
  const homePower = homeTeam.powerRating + homeAdvantagePower;
  // Apply away disadvantage (reduce away team's effective power)
  const awayPower = Math.max(awayTeam.powerRating - awayPowerPenalty, 10);

  // Attack/defense biases
  let atkBiasHome = homeTeam.attackRating / 50;
  let defBiasAway = awayTeam.defenseRating / 50;
  let atkBiasAway = awayTeam.attackRating / 50;
  let defBiasHome = homeTeam.defenseRating / 50;

  // Apply home/away multipliers (stronger home advantage, weaker away attack)
  atkBiasHome *= homeAttackMultiplier;
  atkBiasAway *= awayAttackMultiplier;
  // Away defense also slightly weaker
  defBiasAway *= 0.95;

  // Base league goal rates (home team naturally scores more)
  const baseHome = 1.40;
  const baseAway = 0.95;

  // Convert to lambdas
  let lambdaHome = baseHome * atkBiasHome / defBiasAway * (homePower + 10) / (awayPower + 10);
  let lambdaAway = baseAway * atkBiasAway / defBiasHome * (awayPower + 10) / (homePower + 10);

  // Clamp
  lambdaHome = Math.max(0.1, Math.min(3.5, lambdaHome));
  lambdaAway = Math.max(0.1, Math.min(3.5, lambdaAway));

  return {
    xgHome: Math.round(lambdaHome * 100) / 100,
    xgAway: Math.round(lambdaAway * 100) / 100,
  };
}

// ============================================
// Minute Distribution
// ============================================

function sampleMinute(rnd: () => number, profile: 'goal' | 'card' | 'sub'): number {
  const u = rnd();
  
  if (profile === 'goal') {
    // Higher density: 15-30, 60-90
    if (u < 0.05) return Math.floor(rnd() * 10) + 1;      // 1-10: 5%
    if (u < 0.35) return Math.floor(rnd() * 15) + 16;    // 15-30: 30%
    if (u < 0.60) return Math.floor(rnd() * 15) + 31;    // 30-45: 25%
    if (u < 0.75) return Math.floor(rnd() * 10) + 46;    // 45-55: 15%
    return Math.floor(rnd() * 30) + 56;                   // 60-90: 25%
  } else if (profile === 'card') {
    // Cards spread throughout, slight bias to second half
    if (u < 0.15) return Math.floor(rnd() * 15) + 1;      // 1-15: 15%
    if (u < 0.40) return Math.floor(rnd() * 15) + 16;    // 15-30: 25%
    if (u < 0.65) return Math.floor(rnd() * 15) + 31;    // 30-45: 25%
    if (u < 0.80) return Math.floor(rnd() * 15) + 46;    // 45-60: 15%
    return Math.floor(rnd() * 30) + 61;                   // 60-90: 20%
  } else { // sub
    // Substitutions: 55-85
    return Math.floor(rnd() * 30) + 56;
  }
}

// ============================================
// Goal Assignment (Position-Weighted)
// ============================================

function assignScorers(
  team: SimulateLeagueRequest['teams'][0],
  nGoals: number,
  rnd: () => number,
  isOwnGoal: boolean = false,
  opponentTeam?: SimulateLeagueRequest['teams'][0]
): GoalEvent[] {
  const goals: GoalEvent[] = [];
  
  // Own goal: assign to random defender of opponent (who scored it against their own team)
  if (isOwnGoal && opponentTeam) {
    const defenders = opponentTeam.players.filter(p => {
      const pos = getPositionGroup(p.position);
      return pos === 'CB' || pos === 'LB' || pos === 'RB' || pos === 'WB';
    });
    if (defenders.length > 0) {
      const defender = defenders[Math.floor(rnd() * defenders.length)];
      goals.push({
        type: 'GOAL',
        minute: sampleMinute(rnd, 'goal'),
        teamId: team.id, // Team that benefits from OG
        team: team.name,
        playerName: defender.name, // Player who scored OG (from opponent)
        detail: 'OwnGoal',
      });
    }
    return goals;
  }

  // Normal goals: position-weighted selection
  const eligiblePlayers = team.players.filter(p => p.position.toUpperCase() !== 'GK');
  
  if (eligiblePlayers.length === 0) return goals;

  // Build position weights based on actual lineup
  const positionCounts: Record<string, number> = {};
  eligiblePlayers.forEach(p => {
    const posGroup = getPositionGroup(p.position);
    positionCounts[posGroup] = (positionCounts[posGroup] || 0) + 1;
  });

  // Normalize weights by actual players present
  const normalizedWeights: Record<string, number> = {};
  let totalWeight = 0;
  Object.keys(scorerWeights).forEach(pos => {
    if (positionCounts[pos] && positionCounts[pos] > 0) {
      normalizedWeights[pos] = scorerWeights[pos] * positionCounts[pos];
      totalWeight += normalizedWeights[pos];
    }
  });

  // Normalize to sum to 1.0
  Object.keys(normalizedWeights).forEach(pos => {
    normalizedWeights[pos] /= totalWeight;
  });

  for (let i = 0; i < nGoals; i++) {
    const minute = Math.min(90, sampleMinute(rnd, 'goal'));
    
    // Sample position
    const positions = Object.keys(normalizedWeights);
    const weights = positions.map(p => normalizedWeights[p]);
    const sampledPos = weightedSample(positions, weights, rnd);
    
    if (!sampledPos) continue;
    
    // Get players with this position
    const playersInPos = getPlayersByPosition(team, sampledPos);
    if (playersInPos.length === 0) continue;
    
    const scorer = playersInPos[Math.floor(rnd() * playersInPos.length)];
    
    // Detail distribution
    const detailRoll = rnd();
    let detail: 'OpenPlay' | 'SetPiece' | 'Penalty' | 'OwnGoal' | 'Counter';
    if (detailRoll < 0.70) detail = 'OpenPlay';
    else if (detailRoll < 0.82) detail = 'SetPiece';
    else if (detailRoll < 0.92) detail = 'Counter';
    else detail = 'Penalty';
    
    // Penalty taker: prefer ST/AM, else highest marketValue
    if (detail === 'Penalty') {
      const penaltyTakers = team.players.filter(p => {
        const pos = getPositionGroup(p.position);
        return pos === 'ST' || pos === 'AM';
      });
      if (penaltyTakers.length > 0) {
        const taker = penaltyTakers[Math.floor(rnd() * penaltyTakers.length)];
        scorer.name = taker.name;
      } else {
        // Highest marketValue outfielder
        const sorted = [...eligiblePlayers].sort((a, b) => (b.marketValue || 0) - (a.marketValue || 0));
        scorer.name = sorted[0]?.name || scorer.name;
      }
    }
    
    // Assist (25-35% chance)
    let assistBy: string | undefined;
    if (rnd() < 0.30) {
      const assistPool = team.players.filter(p => {
        const pos = getPositionGroup(p.position);
        return (pos === 'CM' || pos === 'DM' || pos === 'AM' || pos === 'LW' || pos === 'RW' || 
                pos === 'LB' || pos === 'RB' || pos === 'WB') && p.name !== scorer.name;
      });
      if (assistPool.length > 0) {
        assistBy = assistPool[Math.floor(rnd() * assistPool.length)].name;
      }
    }
    
    goals.push({
      type: 'GOAL',
      minute,
      teamId: team.id,
      team: team.name,
      playerName: scorer.name,
      assistBy,
      detail,
    });
  }
  
  return goals;
}

// ============================================
// Cards Assignment (No GK)
// ============================================

function assignCards(
  teamA: SimulateLeagueRequest['teams'][0],
  teamB: SimulateLeagueRequest['teams'][0],
  rnd: () => number,
  powerA: number,
  powerB: number,
  scoreDiff: number // A - B (can be negative)
): { yellows: YellowCardEvent[]; reds: RedCardEvent[] } {
  const yellows: YellowCardEvent[] = [];
  const reds: RedCardEvent[] = [];
  const playerYellowCount = new Map<string, number>();
  
  // Expected yellow count: Poisson(mean ~3.2)
  const expectedYellows = poisson(3.2, rnd);
  
  // Distribute between teams (slight bias to trailing team)
  let yellowsA = Math.floor(expectedYellows / 2);
  let yellowsB = Math.floor(expectedYellows / 2);
  const remainder = expectedYellows - yellowsA - yellowsB;
  
  // Trailing team gets slightly more cards
  if (scoreDiff < 0) yellowsA += remainder;
  else if (scoreDiff > 0) yellowsB += remainder;
  else {
    if (rnd() < 0.5) yellowsA += remainder;
    else yellowsB += remainder;
  }
  
  const getOutfielders = (team: SimulateLeagueRequest['teams'][0]): Array<{ name: string }> => {
    return team.players.filter(p => p.position.toUpperCase() !== 'GK').map(p => ({ name: p.name }));
  };
  
  // Assign yellows to team A
  const outfieldersA = getOutfielders(teamA);
  for (let i = 0; i < yellowsA && outfieldersA.length > 0; i++) {
    const player = outfieldersA[Math.floor(rnd() * outfieldersA.length)];
    const minute = Math.min(90, sampleMinute(rnd, 'card'));
    
    yellows.push({
      type: 'YELLOW',
      minute,
      teamId: teamA.id,
      team: teamA.name,
      playerName: player.name,
    });
    
    playerYellowCount.set(player.name, (playerYellowCount.get(player.name) || 0) + 1);
  }
  
  // Assign yellows to team B
  const outfieldersB = getOutfielders(teamB);
  for (let i = 0; i < yellowsB && outfieldersB.length > 0; i++) {
    const player = outfieldersB[Math.floor(rnd() * outfieldersB.length)];
    const minute = Math.min(90, sampleMinute(rnd, 'card'));
    
    yellows.push({
      type: 'YELLOW',
      minute,
      teamId: teamB.id,
      team: teamB.name,
      playerName: player.name,
    });
    
    playerYellowCount.set(player.name, (playerYellowCount.get(player.name) || 0) + 1);
  }
  
  // Second yellow -> red (6% per player with existing yellow)
  yellows.forEach(yellow => {
    const count = playerYellowCount.get(yellow.playerName || '') || 0;
    if (count >= 1 && rnd() < 0.06) {
      // Second yellow happens later in the match
      const redMinute = Math.min(90, yellow.minute + Math.floor(rnd() * 30) + 10);
      reds.push({
        type: 'RED',
        minute: redMinute,
        teamId: yellow.teamId,
        team: yellow.team,
        playerName: yellow.playerName,
      });
      playerYellowCount.set(yellow.playerName || '', 0); // Reset to avoid triple
    }
  });
  
  // Straight red (1-2% chance overall, non-GK outfielders)
  if (rnd() < 0.015) {
    const allOutfielders = [...getOutfielders(teamA), ...getOutfielders(teamB)];
    if (allOutfielders.length > 0) {
      const player = allOutfielders[Math.floor(rnd() * allOutfielders.length)];
      const team = teamA.players.some(p => p.name === player.name) ? teamA : teamB;
      // Check player doesn't already have red
      const hasRed = reds.some(r => r.playerName === player.name && r.teamId === team.id);
      if (!hasRed) {
        reds.push({
          type: 'RED',
          minute: Math.min(90, sampleMinute(rnd, 'card')),
          teamId: team.id,
          team: team.name,
          playerName: player.name,
        });
      }
    }
  }
  
  return { yellows, reds };
}

// ============================================
// Substitutions
// ============================================

function assignSubs(
  team: SimulateLeagueRequest['teams'][0],
  rnd: () => number
): SubstitutionEvent[] {
  const subs: SubstitutionEvent[] = [];
  
  // 3-6 substitutions per team
  const numSubs = Math.floor(rnd() * 4) + 3;
  
  const allPlayers = team.players.map(p => p.name);
  if (allPlayers.length < numSubs + 11) {
    // Not enough players, cap it
    return subs;
  }
  
  const used = new Set<string>();
  
  for (let i = 0; i < numSubs; i++) {
    // Get players who haven't been subbed out
    const availableOut = allPlayers.filter(p => !used.has(p));
    const availableIn = allPlayers.filter(p => !used.has(p));
    
    if (availableOut.length === 0 || availableIn.length < 2) break;
    
    const outPlayer = availableOut[Math.floor(rnd() * availableOut.length)];
    used.add(outPlayer);
    
    // In player must be different
    const inCandidates = availableIn.filter(p => p !== outPlayer && !used.has(p));
    if (inCandidates.length === 0) break;
    
    const inPlayer = inCandidates[Math.floor(rnd() * inCandidates.length)];
    used.add(inPlayer);
    
    const minute = Math.min(90, sampleMinute(rnd, 'sub'));
    subs.push({
      type: 'SUB',
      minute,
      teamId: team.id,
      team: team.name,
      out: outPlayer,
      in: inPlayer,
    });
  }
  
  return subs;
}

// ============================================
// Compose Events with Constraints
// ============================================

function composeEvents(
  goalsHome: GoalEvent[],
  goalsAway: GoalEvent[],
  cards: { yellows: YellowCardEvent[]; reds: RedCardEvent[] },
  subsHome: SubstitutionEvent[],
  subsAway: SubstitutionEvent[]
): MatchEvent[] {
  const events: MatchEvent[] = [];
  const subbedOut = new Set<string>();
  
  // Add all events
  events.push(...goalsHome, ...goalsAway, ...cards.yellows, ...cards.reds, ...subsHome, ...subsAway);
  
  // Track substitutions to filter events
  [...subsHome, ...subsAway].forEach(sub => {
    if (sub.out) {
      subbedOut.add(sub.out);
    }
  });
  
  // Filter: no goals/cards for subbed out players after substitution minute
  const filteredEvents: MatchEvent[] = events.filter(event => {
    if (event.type === 'SUB') return true;
    
    const playerName = event.playerName;
    if (!playerName) return true;
    
    // Check if player was subbed out before this event
    const subOut = [...subsHome, ...subsAway].find(s => s.out === playerName);
    if (subOut && event.minute > subOut.minute) {
      return false;
    }
    
    return true;
  });
  
  // Sort by minute
  filteredEvents.sort((a, b) => a.minute - b.minute);
  
  return filteredEvents;
}

// ============================================
// Match Simulation
// ============================================

function simulateMatch(
  homeTeam: SimulateLeagueRequest['teams'][0],
  awayTeam: SimulateLeagueRequest['teams'][0],
  homeRatings: TeamRatings,
  awayRatings: TeamRatings,
  matchSeed: string,
  rnd: () => number
): {
  homeScore: number;
  awayScore: number;
  xgHome: number;
  xgAway: number;
  events: MatchEvent[];
} {
  // Compute xG with home advantage
  const { xgHome, xgAway } = computeExpectedGoals(homeRatings, awayRatings);
  
  // Generate scores
  const lambdaHome = xgHome;
  const lambdaAway = xgAway;
  const homeScore = poisson(lambdaHome, rnd);
  const awayScore = poisson(lambdaAway, rnd);
  
  // Own goal probability: 4-6% of total goals
  const totalGoals = homeScore + awayScore;
  const ogChance = Math.min(0.06, Math.max(0.04, totalGoals * 0.05));
  let ownGoals = 0;
  let homeOG = 0;
  let awayOG = 0;
  
  if (totalGoals > 0 && rnd() < ogChance && ownGoals < 1) {
    ownGoals = 1;
    if (rnd() < 0.5) {
      homeOG = 1;
      // Home scores OG (counts as away goal)
    } else {
      awayOG = 1;
      // Away scores OG (counts as home goal)
    }
  }
  
  // Adjust scores for own goals
  const finalHomeScore = homeScore - homeOG + awayOG;
  const finalAwayScore = awayScore - awayOG + homeOG;
  
  // Assign goals
  const normalHomeGoals = homeScore - homeOG;
  const normalAwayGoals = awayScore - awayOG;
  
  const goalsHome: GoalEvent[] = [];
  const goalsAway: GoalEvent[] = [];
  
  // Normal home goals
  if (normalHomeGoals > 0) {
    goalsHome.push(...assignScorers(homeTeam, normalHomeGoals, rnd));
  }
  
  // Normal away goals
  if (normalAwayGoals > 0) {
    goalsAway.push(...assignScorers(awayTeam, normalAwayGoals, rnd));
  }
  
  // Own goals
  if (homeOG > 0) {
    // Home scores OG -> counts as away goal, scored by home defender
    for (let i = 0; i < homeOG; i++) {
      const defenders = homeTeam.players.filter(p => {
        const pos = getPositionGroup(p.position);
        return pos === 'CB' || pos === 'LB' || pos === 'RB' || pos === 'WB';
      });
      if (defenders.length > 0) {
        const defender = defenders[Math.floor(rnd() * defenders.length)];
        goalsAway.push({
          type: 'GOAL',
          minute: sampleMinute(rnd, 'goal'),
          teamId: awayTeam.id, // Away team benefits
          team: awayTeam.name,
          playerName: defender.name, // Home defender scored OG
          detail: 'OwnGoal',
        });
      }
    }
  }
  if (awayOG > 0) {
    // Away scores OG -> counts as home goal, scored by away defender
    for (let i = 0; i < awayOG; i++) {
      const defenders = awayTeam.players.filter(p => {
        const pos = getPositionGroup(p.position);
        return pos === 'CB' || pos === 'LB' || pos === 'RB' || pos === 'WB';
      });
      if (defenders.length > 0) {
        const defender = defenders[Math.floor(rnd() * defenders.length)];
        goalsHome.push({
          type: 'GOAL',
          minute: sampleMinute(rnd, 'goal'),
          teamId: homeTeam.id, // Home team benefits
          team: homeTeam.name,
          playerName: defender.name, // Away defender scored OG
          detail: 'OwnGoal',
        });
      }
    }
  }
  
  // Cards
  const scoreDiff = finalHomeScore - finalAwayScore;
  const cards = assignCards(homeTeam, awayTeam, rnd, homeRatings.powerRating, awayRatings.powerRating, scoreDiff);
  
  // Substitutions
  const subsHome = assignSubs(homeTeam, rnd);
  const subsAway = assignSubs(awayTeam, rnd);
  
  // Compose all events
  const events = composeEvents(goalsHome, goalsAway, cards, subsHome, subsAway);
  
  return {
    homeScore: finalHomeScore,
    awayScore: finalAwayScore,
    xgHome,
    xgAway,
    events,
  };
}

// ============================================
// Fixture Generation
// ============================================

function buildFixtures(
  teams: SimulateLeagueRequest['teams'],
  providedFixtures?: SimulateLeagueRequest['fixtures']
): MatchFixture[] {
  if (providedFixtures && providedFixtures.length > 0) {
    return providedFixtures.map((fix, idx) => ({
      homeTeamId: fix.homeTeamId,
      awayTeamId: fix.awayTeamId,
      round: Math.floor(idx / Math.ceil(teams.length / 2)) + 1,
    }));
  }

  const fixtures: MatchFixture[] = [];
  const teamIds = teams.map(t => t.id);
  const n = teamIds.length;
  
  // Double round-robin (each team plays each other twice: home and away)
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i !== j) {
        // Home match
        fixtures.push({
          homeTeamId: teamIds[i],
          awayTeamId: teamIds[j],
          round: 0,
        });
      }
    }
  }
  
  const matchesPerRound = Math.ceil(n / 2);
  fixtures.forEach((fix, idx) => {
    fix.round = Math.floor(idx / matchesPerRound) + 1;
  });

  return fixtures;
}

// ============================================
// Match ID Generation
// ============================================

function generateMatchId(
  leagueId: string,
  season: string | undefined,
  round: number,
  homeTeamId: string,
  awayTeamId: string
): string {
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
// Standings Calculation
// ============================================

function computeStandings(
  results: LeagueSimulationResponse['results'],
  teamPowers: LeagueSimulationResponse['teamPowers']
): LeagueSimulationResponse['standings'] {
  const statsMap = new Map<string, TeamStats>();
  
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

  statsMap.forEach(stats => {
    stats.goalDiff = stats.goalsFor - stats.goalsAgainst;
  });

  const standings = Array.from(statsMap.values()).sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.goalDiff !== a.goalDiff) return b.goalDiff - a.goalDiff;
    if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
    
    // Head-to-head
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
    
    if (b.powerRating !== a.powerRating) return b.powerRating - a.powerRating;
    return a.team.localeCompare(b.team);
  });

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
  let seed = req.seed;
  if (!seed) {
    const teamIds = req.teams.map(t => t.id).sort();
    seed = `${req.leagueId}-${req.season || 'default'}-${teamIds.join(',')}`;
  }
  
  // Create per-match RNG seeds
  const baseRng = seededRng(seed);

  // Calculate league median market value
  const allMarketValues = req.teams
    .flatMap(t => t.players)
    .map(p => p.marketValue)
    .filter((mv): mv is number => mv !== undefined && mv > 0);
  
  const leagueMedianMV = allMarketValues.length > 0
    ? allMarketValues.sort((a, b) => a - b)[Math.floor(allMarketValues.length / 2)]
    : 5000000;

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
  
  const teamMap = new Map(req.teams.map(t => [t.id, t]));

  // Simulate matches
  const results: LeagueSimulationResponse['results'] = fixtures.map((fixture, idx) => {
    const homeTeam = teamMap.get(fixture.homeTeamId)!;
    const awayTeam = teamMap.get(fixture.awayTeamId)!;
    const homeRatings = teamRatingsMap.get(fixture.homeTeamId)!;
    const awayRatings = teamRatingsMap.get(fixture.awayTeamId)!;

    // Per-match seed
    const matchSeed = `${seed}-match-${idx}`;
    const matchRng = seededRng(matchSeed);

    const { homeScore, awayScore, xgHome, xgAway, events } = simulateMatch(
      homeTeam,
      awayTeam,
      homeRatings,
      awayRatings,
      matchSeed,
      matchRng
    );

    const winner: 'HOME' | 'AWAY' | 'DRAW' = 
      homeScore > awayScore ? 'HOME' :
      awayScore > homeScore ? 'AWAY' : 'DRAW';

    const matchId = generateMatchId(req.leagueId, req.season, fixture.round, fixture.homeTeamId, fixture.awayTeamId);

    const baseDate = new Date();
    baseDate.setDate(baseDate.getDate() + (fixture.round - 1) * 7);
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
