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
  const [playerList, setPlayerList] = useState([] as PlayerData[]);
  const [gameList, setGameList] = useState([] as GameData[]);

  useEffect(() => {
    GetGameList(setGameList);
    GetPlayerList(setPlayerList);
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
                jersey={(player as any)["number"]}
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
