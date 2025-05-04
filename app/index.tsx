import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import PlayerBox from "./components/PlayerBox";
import StatsBox from "./components/StatsBox";
import {
  GameData,
  GetGameData,
  GetGameList,
  GetPlayerList,
  PlayerData,
} from "./Data/DataStore";

export default function Index() {
  const [playerList, setPlayerList] = useState([] as PlayerData[]);
  const [gameList, setGameList] = useState([] as GameData[]);

  useEffect(() => {
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
            const gameDetails = GetGameData(game.id);
            return (
              // <GameCardData
              //   id={game.id}
              //   opponent={game.opponent}
              //   home={game.home}

              //   wins={gameDetails.wins}
              // />
            );
          })}
        </ScrollView>

        <Text style={stylesheet.sectionHeader}>Players</Text>
        <ScrollView horizontal style={stylesheet.cardContainer}>
          <PlayerBox id={0} wins={55} losses={68} jersey={33} />
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
