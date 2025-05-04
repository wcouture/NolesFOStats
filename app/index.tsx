import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import GameBox from "./components/GameBox";
import PlayerBox from "./components/PlayerBox";
import StatsBox from "./components/StatsBox";
import {
  GameData,
  GetGameList,
  GetGameStats,
  GetPlayerList,
  GetPlayerStats,
  InitTestingData,
  PlayerData,
} from "./Data/DataStore";

export default function Index() {
  const [playerList, setPlayerList] = useState([] as PlayerData[]);
  const [gameList, setGameList] = useState([] as GameData[]);

  useEffect(() => {
    InitTestingData();

    const games = GetGameList();
    setGameList(games);

    const players = GetPlayerList();
    setPlayerList(players);
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={stylesheet.safeArea}>
        <View style={{ marginBottom: 40, marginTop: 30 }}>
          <Text style={stylesheet.titleBar}>Noles FO Stats</Text>
          <StatsBox wins={174} losses={262} gbs={114}></StatsBox>
        </View>

        <Text style={stylesheet.sectionHeader}>Games</Text>
        <ScrollView horizontal style={stylesheet.cardContainer}>
          {gameList.map((game, index) => {
            const gameDetails = GetGameStats(game.id);
            return (
              <GameBox
                key={index}
                id={game.id}
                opponent={game.opponent}
                home={game.home}
                wins={gameDetails.wins}
                losses={gameDetails.losses}
              />
            );
          })}
        </ScrollView>

        <Text style={stylesheet.sectionHeader}>Players</Text>
        <ScrollView horizontal style={stylesheet.cardContainer}>
          {playerList.map((player, index) => {
            const playerDetails = GetPlayerStats(player.id);

            return (
              <PlayerBox
                key={index}
                jersey={player.num}
                id={player.id}
                wins={playerDetails.wins}
                losses={playerDetails.losses}
                gbs={playerDetails.gbs}
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
