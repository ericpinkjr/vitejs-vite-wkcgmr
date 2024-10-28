interface GameResult {
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
}

export const simulateRegularSeason = (
  targetWins: number,
  gamesRemaining: number,
  currentGameNumber: number,
  playerRating: number
): GameResult[] => {
  const games: GameResult[] = [];
  const remainingWinsNeeded = Math.max(0, targetWins - currentGameNumber);
  const winProbability = Math.min(0.95, (playerRating / 99) * 0.8);

  for (let i = 0; i < gamesRemaining; i++) {
    const gameNumber = currentGameNumber + i + 1;
    const result = Math.random() < winProbability ? 'W' : 'L';
    
    games.push({
      gameNumber,
      result,
      score: generateScore(result),
      ...generatePlayerStats(playerRating),
      isPlayoff: false
    });
  }

  return games;
};

export const simulatePlayoffGame = (
  round: number,
  gameNumber: number,
  playerRating: number
): GameResult => {
  const winProbability = Math.min(0.9, (playerRating / 99) * 0.7);
  const result = Math.random() < winProbability ? 'W' : 'L';

  return {
    gameNumber,
    result,
    score: generateScore(result),
    ...generatePlayerStats(playerRating),
    isPlayoff: true,
    playoffRound: round,
    playoffGame: gameNumber
  };
};

const generateScore = (result: 'W' | 'L'): string => {
  const baseScore = Math.floor(Math.random() * 20) + 90;
  const opponentScore = result === 'W' 
    ? baseScore - (Math.floor(Math.random() * 15) + 1)
    : baseScore + (Math.floor(Math.random() * 15) + 1);
  
  return result === 'W' 
    ? `${baseScore}-${opponentScore}`
    : `${opponentScore}-${baseScore}`;
};

const generatePlayerStats = (playerRating: number) => {
  const ratingFactor = playerRating / 99;
  
  return {
    points: Math.floor(Math.random() * 20 * ratingFactor) + 10,
    rebounds: Math.floor(Math.random() * 10 * ratingFactor) + 2,
    assists: Math.floor(Math.random() * 8 * ratingFactor) + 2,
    steals: Math.floor(Math.random() * 3 * ratingFactor),
    blocks: Math.floor(Math.random() * 3 * ratingFactor)
  };
};