// ============================================
// League Simulation Types
// ============================================

export interface SimulateLeagueRequest {
  leagueId: string;
  leagueName?: string;
  season?: string;
  seed?: string;
  fixtures?: Array<{
    homeTeamId: string;
    awayTeamId: string;
  }>;
  teams: Array<{
    id: string;
    name: string;
    formation?: string;
    players: Array<{
      id: string;
      name: string;
      position: string; // GK, CB, LB, RB, DM, CM, AM, LW, RW, ST ...
      marketValue?: number; // in euros
      age?: number;
      nationality?: string[];
      overall?: number; // optional precomputed strength [0..100]
    }>;
  }>;
}

export interface LeagueSimulationResponse {
  simulationDate: string; // ISO string
  leagueId: string;
  leagueName: string;
  season?: string;
  totalMatches: number;
  seed?: string;

  // Diagnostics per team (power ratings & sub-ratings used for xG)
  teamPowers: Array<{
    teamId: string;
    teamName: string;
    powerRating: number; // 0..100
    attackRating: number; // 0..100
    midfieldRating: number; // 0..100
    defenseRating: number; // 0..100
    keeperRating: number; // 0..100
  }>;

  // Matches with results + minute events
  results: Array<{
    matchId: string; // deterministic stable id
    round: number; // 1-based
    date: string; // ISO
    venue: 'home' | 'away' | 'neutral';
    homeTeamId: string;
    homeTeam: string;
    awayTeamId: string;
    awayTeam: string;
    homeScore: number;
    awayScore: number;
    xgHome: number; // expected goals (rounded to 2 decimals)
    xgAway: number;
    winner: 'HOME' | 'AWAY' | 'DRAW';
    events: Array<MatchEvent>;
  }>;

  // Final table
  standings: Array<{
    rank: number; // 1 is champion
    teamId: string;
    team: string;
    played: number;
    won: number;
    drawn: number;
    lost: number;
    goalsFor: number;
    goalsAgainst: number;
    goalDiff: number;
    points: number;
    powerRating: number; // echo from diagnostics
  }>;
}

// Timeline events
export type MatchEvent =
  | GoalEvent
  | YellowCardEvent
  | RedCardEvent
  | SubstitutionEvent;

export interface BaseEvent {
  minute: number; // 1..90 (+stoppage: cap at 90 for now)
  teamId: string;
  team: string;
  playerName?: string;
}

export interface GoalEvent extends BaseEvent {
  type: 'GOAL';
  assistBy?: string;
  detail?: 'OpenPlay' | 'SetPiece' | 'Penalty' | 'OwnGoal' | 'Counter';
}

export interface YellowCardEvent extends BaseEvent {
  type: 'YELLOW';
  reason?: 'Foul' | 'Dissent' | 'TimeWasting' | 'Other';
}

export interface RedCardEvent extends BaseEvent {
  type: 'RED';
  reason?: 'SecondYellow' | 'SeriousFoul' | 'ProfessionalFoul' | 'Other';
}

export interface SubstitutionEvent extends BaseEvent {
  type: 'SUB';
  out?: string;
  in?: string;
  reason?: 'Tactical' | 'Injury' | 'Fatigue';
}

// Internal types for calculation
export interface TeamRatings {
  keeperRating: number;
  defenseRating: number;
  midfieldRating: number;
  attackRating: number;
  powerRating: number;
}

export interface MatchFixture {
  homeTeamId: string;
  awayTeamId: string;
  round: number;
}

export interface TeamStats {
  teamId: string;
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDiff: number;
  points: number;
  powerRating: number;
}


