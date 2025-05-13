import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import GameBox from "./components/GameBox";
import PlayerBox from "./components/PlayerBox";
import StatsBox from "./components/StatsBox";
import {
  GameData,
  GetGameList,
  GetPlayerList,
  PlayerData,
} from "./Data/DataStore";

export default function Index() {
  const [seasonWins, setSeasonWins] = useState(0);
  const [seasonGBs, setSeasonGBs] = useState(0);
  const [seasonLosses, setSeasonLosses] = useState(0);

  const [playerList, setPlayerList] = useState([] as PlayerData[]);
  const [gameList, setGameList] = useState([] as GameData[]);

  useEffect(() => {
    GetGameList(setGameList);
    GetPlayerList(setPlayerList);
  }, []);

  useEffect(() => {
    const seasonStats = {
      total_wins: 0,
      total_losses: 0,
      total_gbs: 0,
    };

    for (const i in playerList) {
      const player = playerList[i];
      const playerData: PlayerData = player as unknown as PlayerData;

      const wins = parseInt(playerData.wins as unknown as string);
      const losses = parseInt(playerData.losses as unknown as string);
      const gbs = parseInt(playerData.gbs as unknown as string);

      seasonStats.total_wins += wins;
      seasonStats.total_losses += losses;
      seasonStats.total_gbs += gbs;
    }

    setSeasonGBs(seasonStats.total_gbs);
    setSeasonWins(seasonStats.total_wins);
    setSeasonLosses(seasonStats.total_losses);
  }, [playerList]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={stylesheet.safeArea}>
        <View style={{ marginBottom: 40, marginTop: 30 }}>
          <Text style={stylesheet.titleBar}>Noles FO Stats</Text>
          <StatsBox
            wins={seasonWins}
            losses={seasonLosses}
            gbs={seasonGBs}
          ></StatsBox>
        </View>

        <Text style={stylesheet.sectionHeader}>Games</Text>
        <ScrollView horizontal style={stylesheet.cardContainer}>
          {gameList.map((game, index) => {
            return (
              <GameBox
                key={index}
                id={game.game_id}
                opponent={game.opponent}
                home={game.home}
                wins={game.wins}
                losses={game.losses}
              />
            );
          })}
        </ScrollView>

        <Text style={stylesheet.sectionHeader}>Players</Text>
        <ScrollView horizontal style={stylesheet.cardContainer}>
          {playerList.map((player, index) => {
            return (
              <PlayerBox
                key={index}
                jersey={player.number}
                id={player.player_id}
                wins={player.wins}
                losses={player.losses}
                gbs={player.gbs}
              />
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const stylesheet = StyleSheet.create({
  safeArea: {
    margin: 50,
  },
  titleBar: {
    fontSize: 40,
    fontWeight: 700,
    marginBottom: 10,
    fontFamily: "monospace",
    textAlign: "center",
    color: "#782f40",
    textShadowColor: "#CEB888",
    textShadowOffset: { width: 2, height: 2 },
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: 600,
    textDecorationLine: "underline",
  },

  cardContainer: {
    marginBottom: 20,
  },
});
