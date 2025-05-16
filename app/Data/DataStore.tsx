import axios from "axios";

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
  gbs: number;
  jersey: number;
  horizontal?: boolean;
};

// DB data analogs
export type PerformanceData = {
  performanceId: number;
  player_id: number;
  game_id: number;
  wins: number;
  losses: number;
  gbs: number;
};

export type PlayerData = {
  player_id: number;
  number: number;
  name: string;
  wins: number;
  losses: number;
  gbs: number;
};

export type GameData = {
  game_id: number;
  opponent: string;
  date: Date;
  home: boolean;
  wins: number;
  losses: number;
  gbs: number;
  performance: PerformanceData[];
};

var CACHED_PLAYERS: PlayerData[] = [];
var CACHED_GAMES: GameData[] = [];

export default function DataStore() {
  throw new Error("Function not implemented");
}

export async function GetGameList(setGameList: Function) {
  const response = await axios.get(
    "https://fo-stats.willc-dev.net/games?API=1"
  );
  const data = response.data;
  setGameList(data);
  CACHED_GAMES = data as GameData[];
}

export async function GetPlayerList(setPlayerList: Function) {
  const response = await axios.get(
    "https://fo-stats.willc-dev.net/players?API=1"
  );
  const data = response.data;

  setPlayerList(data);
  CACHED_PLAYERS = data as PlayerData[];
}

export async function GetGameData(
  id: number,
  setGameData: Function,
  setPerforamnceData: Function
) {
  const response = await axios.get(
    `https://fo-stats.willc-dev.net/games/view-game?id=${id}&API=1`
  );

  setGameData(response.data);
  setPerforamnceData(response.data.performance);
}

export async function GetPlayerData(
  id: number,
  setPlayerData: Function,
  setPerformanceData: Function
) {
  const response = await axios.get(
    `https://fo-stats.willc-dev.net/players/view-player?id=${id}&API=1`
  );

  setPlayerData(response.data);
  setPerformanceData(response.data.performances);
}

export function GetPlayer(id: number): PlayerData {
  for (let i = 0; i < CACHED_PLAYERS.length; i++) {
    const player_id = parseInt(
      CACHED_PLAYERS[i].player_id as unknown as string
    );
    if (player_id == id) {
      return CACHED_PLAYERS[i];
    }
  }

  return {
    player_id: 0,
    number: 0,
    name: "John Smith",
    wins: 0,
    losses: 0,
    gbs: 0,
  };
}

export function GetGame(id: number): GameData {
  const query_id = parseInt(id as unknown as string);
  for (let i = 0; i < CACHED_GAMES.length; i++) {
    const game_id = parseInt(CACHED_GAMES[i].game_id as unknown as string);
    if (game_id === query_id) {
      return CACHED_GAMES[i];
    }
  }

  return {
    game_id: 0,
    opponent: "Game 1",
    date: new Date(),
    home: false,
    wins: 0,
    losses: 0,
    gbs: 0,
    performance: [],
  };
}
