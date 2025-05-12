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
  playerId: number;
  gameId: number;
  wins: number;
  losses: number;
  gbs: number;
};

export type PlayerData = {
  player_id: number;
  num: number;
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
};

export type GameStatLine = {
  id: number;
  wins: number;
  losses: number;
  gbs: number;
};

const TESTING_CONFIG = { enabled: false };
const TESTING_games: GameData[] = [];
const TESTING_players: PlayerData[] = [];
const TESTING_performances: PerformanceData[][] = [];

export async function GetGameList(setGameList: Function) {
  const response = await axios.get(
    "https://fo-stats.willc-dev.net/games?API=1"
  );
  const data = response.data;
  setGameList(data);
}

export async function GetPlayerList(setPlayerList: Function) {
  const response = await axios.get(
    "https://fo-stats.willc-dev.net/players?API=1"
  );
  const data = response.data;

  setPlayerList(data);
}

export function GetGameData(id: number): GameData {
  if (TESTING_CONFIG.enabled) {
    return TESTING_games[id];
  }
  const game: GameData = {
    game_id: 0,
    opponent: "",
    home: false,
    date: new Date(),
    wins: 0,
    losses: 0,
  };

  return game;
}

export function GetPlayerData(id: number): PlayerData {
  if (TESTING_CONFIG.enabled) {
    return TESTING_players[id];
  }

  const player: PlayerData = {
    player_id: -1,
    num: -1,
    name: "",
    wins: 0,
    losses: 0,
    gbs: 0,
  };

  return player;
}

export function GetPerformanceData(
  gameId: number,
  playerId: number
): PerformanceData {
  if (TESTING_CONFIG.enabled) {
    return TESTING_performances[gameId][playerId];
  }

  const performance: PerformanceData = {
    playerId: 0,
    gameId: 0,
    wins: 0,
    losses: 0,
    gbs: 0,
  };

  return performance;
}

export function GetGameStats(id: number) {
  const gameStats = {
    id: id,
    wins: 0,
    losses: 0,
    gbs: 0,
  };

  return gameStats;
}

export function GetPlayerStats(id: number) {
  const playerStats = {
    wins: 0,
    losses: 0,
    gbs: 0,
  };

  for (let i = 0; i < TESTING_performances.length; i++) {
    for (let j = 0; j < TESTING_performances[i].length; j++) {
      const performance = TESTING_performances[i][j];
      if (performance.playerId == id) {
        playerStats.wins += performance.wins;
        playerStats.losses += performance.losses;
        playerStats.gbs += performance.gbs;
      }
    }
  }

  return playerStats;
}

// export function InitTestingData() {
//   // Add players
//   const player1: PlayerData = { id: 0, num: 33, name: "Danny Ferber" };
//   const player2: PlayerData = { id: 1, num: 19, name: "JD Castillo" };
//   const player3: PlayerData = { id: 2, num: 15, name: "Pete Ancona" };
//   const player4: PlayerData = { id: 3, num: 77, name: "Scott Chapman" };

//   TESTING_players.push(player1);
//   TESTING_players.push(player2);
//   TESTING_players.push(player3);
//   TESTING_players.push(player4);

//   // Add games
//   const game1: GameData = {
//     id: 0,
//     opponent: "Georgia Tech",
//     date: new Date(),
//     home: false,
//   };
//   const game2: GameData = {
//     id: 1,
//     opponent: "West Virginia",
//     date: new Date(),
//     home: true,
//   };
//   const game3: GameData = {
//     id: 2,
//     opponent: "Virginia Tech",
//     date: new Date(),
//     home: true,
//   };
//   const game4: GameData = {
//     id: 3,
//     opponent: "Utah Valley",
//     date: new Date(),
//     home: true,
//   };
//   const game5: GameData = {
//     id: 4,
//     opponent: "Texas",
//     date: new Date(),
//     home: false,
//   };

//   TESTING_games.push(game1);
//   TESTING_performances.push([] as PerformanceData[]);
//   TESTING_games.push(game2);
//   TESTING_performances.push([] as PerformanceData[]);
//   TESTING_games.push(game3);
//   TESTING_performances.push([] as PerformanceData[]);
//   TESTING_games.push(game4);
//   TESTING_performances.push([] as PerformanceData[]);
//   TESTING_games.push(game5);
//   TESTING_performances.push([] as PerformanceData[]);

//   // Add performances

//   // Ferber
//   TESTING_performances[0].push({
//     playerId: 0,
//     gameId: 0,
//     wins: 6,
//     losses: 14,
//     gbs: 4,
//   });
//   TESTING_performances[1].push({
//     playerId: 0,
//     gameId: 1,
//     wins: 14,
//     losses: 10,
//     gbs: 0,
//   });
//   TESTING_performances[2].push({
//     playerId: 0,
//     gameId: 2,
//     wins: 11,
//     losses: 9,
//     gbs: 4,
//   });
//   TESTING_performances[3].push({
//     playerId: 0,
//     gameId: 3,
//     wins: 3,
//     losses: 8,
//     gbs: 2,
//   });
//   TESTING_performances[3].push({
//     playerId: 0,
//     gameId: 4,
//     wins: 0,
//     losses: 0,
//     gbs: 0,
//   });

//   // JD
//   TESTING_performances[0].push({
//     playerId: 1,
//     gameId: 0,
//     wins: 0,
//     losses: 0,
//     gbs: 0,
//   });
//   TESTING_performances[1].push({
//     playerId: 1,
//     gameId: 1,
//     wins: 1,
//     losses: 1,
//     gbs: 1,
//   });
//   TESTING_performances[2].push({
//     playerId: 1,
//     gameId: 2,
//     wins: 1,
//     losses: 1,
//     gbs: 1,
//   });
//   TESTING_performances[3].push({
//     playerId: 1,
//     gameId: 3,
//     wins: 0,
//     losses: 2,
//     gbs: 0,
//   });
//   TESTING_performances[4].push({
//     playerId: 1,
//     gameId: 4,
//     wins: 10,
//     losses: 7,
//     gbs: 4,
//   });

//   // Pete
//   TESTING_performances[0].push({
//     playerId: 2,
//     gameId: 0,
//     wins: 0,
//     losses: 0,
//     gbs: 0,
//   });
//   TESTING_performances[1].push({
//     playerId: 2,
//     gameId: 1,
//     wins: 0,
//     losses: 1,
//     gbs: 0,
//   });
//   TESTING_performances[2].push({
//     playerId: 2,
//     gameId: 2,
//     wins: 0,
//     losses: 0,
//     gbs: 0,
//   });
//   TESTING_performances[3].push({
//     playerId: 2,
//     gameId: 3,
//     wins: 0,
//     losses: 0,
//     gbs: 0,
//   });
//   TESTING_performances[4].push({
//     playerId: 2,
//     gameId: 4,
//     wins: 0,
//     losses: 0,
//     gbs: 0,
//   });

//   // Scott
//   TESTING_performances[0].push({
//     playerId: 3,
//     gameId: 0,
//     wins: 0,
//     losses: 0,
//     gbs: 2,
//   });
//   TESTING_performances[1].push({
//     playerId: 3,
//     gameId: 1,
//     wins: 0,
//     losses: 1,
//     gbs: 2,
//   });
//   TESTING_performances[2].push({
//     playerId: 3,
//     gameId: 2,
//     wins: 0,
//     losses: 1,
//     gbs: 3,
//   });
//   TESTING_performances[3].push({
//     playerId: 3,
//     gameId: 3,
//     wins: 1,
//     losses: 8,
//     gbs: 1,
//   });
//   TESTING_performances[4].push({
//     playerId: 3,
//     gameId: 4,
//     wins: 4,
//     losses: 4,
//     gbs: 3,
//   });

//   TESTING_CONFIG.enabled = true;
// }
