import { View, Text, StyleSheet } from "react-native";

export default function GameBox() {
  return (
    <View style={styleSheet.boxBody}>
      <Text style={styleSheet.gameTitle}>At GT</Text>
      <Text>38.86%</Text>
    </View>
  );
}

const styleSheet = StyleSheet.create({
  boxBody: {
    backgroundColor: "#782f40",
    height: 150,
    width: 200,

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  gameTitle: {
    fontSize: 26,
    color: "white",
    fontWeight: 600,
  },
});
