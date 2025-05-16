import { Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { toolsStyle } from "./styling";

export default function Training() {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View style={toolsStyle.titleContainer}>
          <Text style={toolsStyle.titleText}>Face Off Training</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
