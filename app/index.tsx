import { Text, View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import StatsBox from "./components/StatsBox";
import GameBox from "./components/GameBox";

export default function Index() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={stylesheet.safeArea}>
        <View style={{ marginBottom: 40, marginTop: 30 }}>
          <Text style={stylesheet.titleBar}>Noles FO Stats</Text>
          <StatsBox wins={174} losses={262} gbs={114}></StatsBox>
        </View>

        <Text style={stylesheet.sectionHeader}>Games</Text>
        <ScrollView horizontal style={stylesheet.gamesContainer}>
          <GameBox />
        </ScrollView>

        <Text style={stylesheet.sectionHeader}>Players</Text>
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

  gamesContainer: {},
});
