import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import GameBox from "./components/GameBox";
import StatsBox from "./components/StatsBox";
import {
  GetGameData,
  GetGameList,
  GetPerformanceData,
  GetPlayerData,
  GetPlayerStats,
  PerformanceData,
  PlayerData,
} from "./Data/DataStore";
import { detailsStyle } from "./styling";

export default function GameDetails() {
  const query = useLocalSearchParams();
  const [playerData, setPlayerData] = useState({} as PlayerData);
  const [playerStats, setPlayerStats] = useState({});
  const [performances, setPerformances] = useState([] as PerformanceData[]);

  useEffect(() => {
    const playerId: number = Number(query.id);
    const player = GetPlayerData(playerId);
    setPlayerData(player);

    const stats = GetPlayerStats(playerId);
    setPlayerStats(stats);

    const games = GetGameList();
    const performanceList: PerformanceData[] = [];
    for (let i = 0; i < games.length; i++) {
      const performance = GetPerformanceData(games[i].id, playerId);
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
        <Text style={detailsStyle.pageTitle}>#33 - Danny Ferber</Text>
        <StatsBox wins={0} losses={0} gbs={0} />

        <Text style={detailsStyle.listHeader}>Game Performances</Text>
        <ScrollView
          style={detailsStyle.scrollView}
          contentContainerStyle={detailsStyle.listContainer}
        >
          {performances.map((performance, index) => {
            const gameData = GetGameData(performance.gameId);
            return (
              <GameBox
                horizontal
                wins={performance.wins}
                losses={performance.losses}
                home={gameData.home}
                opponent={gameData.opponent}
                id={gameData.id}
                key={index}
              />
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
