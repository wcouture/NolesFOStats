import { View, Text, StyleSheet } from "react-native";

type StatLine = {
  wins: number;
  losses: number;
  gbs: number;
};

export default function StatsBox(props: StatLine) {
  let total = props.wins + props.losses;
  var percent = 0;
  if (total > 0) percent = (props.wins / total) * 100;

  return (
    <View>
      <View style={styleSheet.statsContainer}>
        <Text style={styleSheet.statLabel}>Wins: {props.wins}</Text>
        <Text style={styleSheet.statLabel}>Losses: {props.losses}</Text>
        <Text style={styleSheet.statLabel}>GBs: {props.gbs}</Text>
      </View>
      <Text style={styleSheet.statLabel}>{percent.toFixed(2)}%</Text>
    </View>
  );
}

const styleSheet = StyleSheet.create({
  statsContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 20,
  },
  statLabel: {
    fontFamily: "courier new",
    textAlign: "center",
  },
});
