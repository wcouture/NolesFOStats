// Data objects for react card objects
export type GameCardData = {
  id: number;
  wins: number;
  losses: number;
  opponent: string;
  home: boolean;
  horizontal?: boolean;
};

export type PlayerCardData = {
  id: number;
  wins: number;
  losses: number;
  jersey: number;
  horizontal?: boolean;
};

// DB data analogs
export type PerformanceData = {
  playerId: number;
  gameId: number;
  wins: number;
  losses: number;
  gbs: number;
};

export type PlayerData = {
  id: number;
  num: number;
  name: string;
};

export type GameData = {
  id: number;
  opponent: string;
  home: boolean;
};

const dataCache = {
  games: [],
  players: [],
  playerPerformances: [],
};

export function GetGameList(): GameData[] {
  const games: GameData[] = [];
  return games;
}

export function GetPlayerList() {
  const players: PlayerData[] = [];
  return players;
}

export function GetGameData(id: number): GameData {
  const game = {
    id: -1,
    opponent: "",
    home: false,
  };

  return game;
}

export function GetPlayerData(id: number): PlayerData {
  const player = {
    id: -1,
    num: -1,
    name: "",
  };

  return player;
}
