// Player Types
export interface PlayerInfo {
  name: string;
  position: string;
  overallRating: number;
  xp: number;
  fanBase: number;
  bankBalance: number;
  completedGames: GameResult[];
  teamRecord: {
    wins: number;
    losses: number;
  };
  winStreak: number;
  activeEndorsements: ActiveEndorsement[];
  endorsementCooldowns: EndorsementCooldown[];
  attributes: Record<string, Record<string, number>>;
  badges: Record<string, Record<string, BadgeTier>>;
  contract?: Contract;
  completedSeasons?: number;
  playoffStats?: {
    eliminated: boolean;
    wonChampionship: boolean;
  };
  createdAt: string;
}

// Game Types
export interface GameResult {
  gameNumber: number;
  result: 'W' | 'L';
  score: string;
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  isPlayoff?: boolean;
  playoffRound?: number;
  playoffGame?: number;
  date: string;
}

// Badge Types
export type BadgeTier = 'Locked' | 'Bronze' | 'Silver' | 'Gold' | 'Hall of Fame' | 'Legend';

export interface Badge {
  name: string;
  description: string;
}

export interface BadgeCategory {
  name: string;
  badges: Badge[];
}

// Contract Types
export interface Contract {
  years: number;
  total: number;
  average: number;
  pick?: number;
}

// Endorsement Types
export interface Endorsement {
  id: string;
  tier: string;
  name: string;
  description: string;
  rewards: {
    xp: number;
    fans: number;
    money: number;
  };
  requirements: {
    claimInterval: number;
    minFans: number;
  };
}

export interface ActiveEndorsement {
  id: string;
  endorsementId: string;
  gamesUntilClaim: number;
  totalClaims: number;
  lastClaimDate: string;
}

export interface EndorsementCooldown {
  endorsementId: string;
  gamesRemaining: number;
}

// Store Types
export interface PlayerState {
  playerInfo: PlayerInfo | null;
  setPlayerInfo: (info: PlayerInfo) => void;
  updateXP: (amount: number) => void;
  updateFans: (amount: number) => void;
  updateBankBalance: (amount: number) => void;
  addCompletedGame: (game: GameResult) => void;
  updateTeamRecord: (isWin: boolean) => void;
  activateEndorsement: (endorsement: Endorsement) => void;
  claimEndorsement: (endorsement: Endorsement) => void;
  updateEndorsements: () => void;
  updateAttributes: (category: string, attribute: string, value: number, cost: number) => void;
  updateBadges: (category: string, badge: string, newTier: BadgeTier, cost: number) => void;
  reset: () => void;
}

// Performance Types
export interface PerformanceMetrics {
  fcp: number | null;
  lcp: number | null;
  fid: number | null;
  cls: number | null;
}