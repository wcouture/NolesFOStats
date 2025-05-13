import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import GameBox from "./components/GameBox";
import StatsBox from "./components/StatsBox";
import {
  GetGame,
  GetPlayerData,
  PerformanceData,
  PlayerData,
} from "./Data/DataStore";
import { detailsStyle } from "./styling";

export default function GameDetails() {
  const query = useLocalSearchParams();
  const [playerData, setPlayerData] = useState({} as PlayerData);
  const [performances, setPerformances] = useState([] as PerformanceData[]);

  useEffect(() => {
    const playerId: number = Number(query.id);
    GetPlayerData(playerId, setPlayerData, setPerformances);
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
          #{playerData.number} - {playerData.name}
        </Text>
        <StatsBox
          wins={playerData.wins}
          losses={playerData.losses}
          gbs={playerData.gbs}
        />

        <Text style={detailsStyle.listHeader}>Game Performances</Text>
        <ScrollView
          style={detailsStyle.scrollView}
          contentContainerStyle={detailsStyle.listContainer}
        >
          {performances.map((performance, index) => {
            const game_id = parseInt(performance.game_id as unknown as string);
            const game = GetGame(game_id);
            return (
              <GameBox
                horizontal
                wins={performance.wins}
                losses={performance.losses}
                home={game.home}
                opponent={game.opponent}
                id={performance.game_id}
                key={index}
              />
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
