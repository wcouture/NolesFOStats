import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function CadenceTraining() {
  const query = useLocalSearchParams();

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View>
          <Text>Cadence Training</Text>
          <Text>Min to Set: {query.minSet}</Text>
          <Text>Max to Set: {query.maxSet}</Text>
          <Text>Min to Whistle: {query.minWhistle}</Text>
          <Text>Max to Whistle: {query.maxWhistle}</Text>
          <Text>Time between: {query.between}</Text>
        </View>
        <View></View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
