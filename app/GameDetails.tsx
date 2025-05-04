import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import PlayerBox from "./components/PlayerBox";
import StatsBox from "./components/StatsBox";
import {
  GameData,
  GameStatLine,
  GetGameData,
  GetGameStats,
  GetPerformanceData,
  GetPlayerData,
  GetPlayerList,
  PerformanceData,
} from "./Data/DataStore";
import { detailsStyle } from "./styling";

export default function GameDetails() {
  const query = useLocalSearchParams();
  const [gameData, setGameData] = useState({} as GameData);
  const [gameStats, setGameStats] = useState({} as GameStatLine);
  const [performances, setPerformances] = useState([] as PerformanceData[]);

  useEffect(() => {
    const gameId = Number(query.id);
    console.log("Game ID: ", gameId);
    const gameData = GetGameData(gameId);
    console.log(JSON.stringify(gameData));
    setGameData(gameData);

    const stats = GetGameStats(gameId);
    console.log(JSON.stringify(stats));
    setGameStats(stats);

    const players = GetPlayerList();
    console.log(JSON.stringify(players));
    const performanceList: PerformanceData[] = [];
    for (let i = 0; i < players.length; i++) {
      const performance = GetPerformanceData(gameId, i);
      console.log(JSON.stringify(performance));
      performanceList.push(performance);
    }
    setPerformances(performanceList);
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={detailsStyle.safeArea}>
        <Pressable
          onPress={() => {
            router.back();
          }}
          style={detailsStyle.backButton}
        >
          <Text style={detailsStyle.backButtonText}>{"<"}</Text>
        </Pressable>
        <Text style={detailsStyle.pageTitle}>
          {gameData.home ? "vs" : "at"} {gameData.opponent}
        </Text>
        <StatsBox
          wins={gameStats.wins}
          losses={gameStats.losses}
          gbs={gameStats.gbs}
        />

        <Text style={detailsStyle.listHeader}>Player Performances</Text>
        <ScrollView
          style={detailsStyle.scrollView}
          contentContainerStyle={detailsStyle.listContainer}
        >
          {performances.map((performance, index) => {
            const player = GetPlayerData(performance.playerId);
            return (
              <PlayerBox
                key={index}
                horizontal
                id={performance.playerId}
                wins={performance.wins}
                losses={performance.losses}
                jersey={player.num}
                gbs={performance.gbs}
              />
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
