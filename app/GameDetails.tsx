import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import PlayerBox from "./components/PlayerBox";
import StatsBox from "./components/StatsBox";
import { detailsStyle } from "./styling";

export default function GameDetails() {
  const query = useLocalSearchParams();
  const [gameId, setGameId] = useState(-1);

  useEffect(() => {
    setGameId(query.id as unknown as number);
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={detailsStyle.safeArea}>
        <Text style={detailsStyle.pageTitle}>at ASU - {gameId}</Text>
        <StatsBox wins={0} losses={0} gbs={0} />

        <Text style={detailsStyle.listHeader}>Player Performances</Text>
        <ScrollView
          style={detailsStyle.scrollView}
          contentContainerStyle={detailsStyle.listContainer}
        >
          <PlayerBox horizontal id={0} wins={0} losses={0} jersey={0} />
        </ScrollView>

        <Pressable
          onPress={() => {
            router.back();
          }}
          style={detailsStyle.backButton}
        >
          <Text style={detailsStyle.backButtonText}>back</Text>
        </Pressable>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
