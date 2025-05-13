import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import PlayerBox from "./components/PlayerBox";
import StatsBox from "./components/StatsBox";
import {
  GameData,
  GetGameData,
  GetPlayer,
  PerformanceData,
} from "./Data/DataStore";
import { detailsStyle } from "./styling";

export default function GameDetails() {
  const query = useLocalSearchParams();
  const [gameData, setGameData] = useState({} as GameData);
  const [performances, setPerformanceData] = useState([] as PerformanceData[]);

  useEffect(() => {
    const gameId = Number(query.id);
    GetGameData(gameId, setGameData, setPerformanceData);
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
          wins={gameData.wins}
          losses={gameData.losses}
          gbs={gameData.gbs}
        />

        <Text style={detailsStyle.listHeader}>Player Performances</Text>
        <ScrollView
          style={detailsStyle.scrollView}
          contentContainerStyle={detailsStyle.listContainer}
        >
          {performances?.map((performance, index) => {
            const player_id = parseInt(
              performance.player_id as unknown as string
            );
            const player = GetPlayer(player_id);
            return (
              <PlayerBox
                key={index}
                horizontal
                id={performance.player_id}
                wins={performance.wins}
                losses={performance.losses}
                jersey={player.number}
                gbs={performance.gbs}
              />
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
