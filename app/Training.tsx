import { useAudioPlayer } from "expo-audio";
import { router } from "expo-router";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { toolsStyle } from "./styling";

const whistleAudioSource = require("../assets/audio/Whistle.mp3");

export default function Training() {
  const [whisltePlaying, setWhistlePlaying] = useState(false);
  const whistlePlayer = useAudioPlayer(whistleAudioSource);

  const [minToSet, setMinToSet] = useState(1);
  const [maxToSet, setMaxToSet] = useState(1);

  const [minToWhistle, setMinToWhistle] = useState(1);
  const [maxToWhistle, setMaxToWhistle] = useState(1);

  const [timeBetween, setTimeBetween] = useState(1);

  const [whistleCount, setWhistleCount] = useState(10);

  const PlayWhistle = () => {
    if (whistlePlayer.currentStatus.playing) return;

    whistlePlayer.seekTo(0);
    whistlePlayer.play();
  };

  const BeginCadence = () => {
    router.push(
      `/CadenceTraining?minSet=${minToSet}&maxSet=${maxToSet}&minWhistle=${minToWhistle}&maxWhistle=${maxToWhistle}&between=${timeBetween}`
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={toolsStyle.safeAreaView}>
        <View style={toolsStyle.titleContainer}>
          <Text style={toolsStyle.titleText}>Face Off Training</Text>
        </View>
        <View style={toolsStyle.toolButtonsContainer}>
          <View style={toolsStyle.buttonRow}>
            <Text style={toolsStyle.toolButton} onPress={PlayWhistle}>
              Whistle
            </Text>
          </View>
          <View style={toolsStyle.buttonRow}>
            <Text style={toolsStyle.inputHeader}>Time to set:</Text>
            <View style={toolsStyle.inputRow}>
              <Text>Min: </Text>
              <TextInput
                keyboardType="numeric"
                defaultValue={minToSet.toString()}
                onChangeText={(val) => {
                  setMinToSet(parseFloat(val));
                }}
                style={toolsStyle.input}
              />
              <Text>Max: </Text>
              <TextInput
                keyboardType="numeric"
                defaultValue={maxToSet.toString()}
                onChangeText={(val) => {
                  setMaxToSet(parseFloat(val));
                }}
                style={toolsStyle.input}
              />
            </View>

            <Text style={toolsStyle.inputHeader}>Time to whistle:</Text>
            <View style={toolsStyle.inputRow}>
              <Text>Min: </Text>
              <TextInput
                keyboardType="numeric"
                defaultValue={minToWhistle.toString()}
                onChangeText={(val) => {
                  setMinToWhistle(parseFloat(val));
                }}
                style={toolsStyle.input}
              />
              <Text>Max: </Text>
              <TextInput
                keyboardType="numeric"
                defaultValue={maxToWhistle.toString()}
                onChangeText={(val) => {
                  setMaxToWhistle(parseFloat(val));
                }}
                style={toolsStyle.input}
              />
            </View>

            <Text style={toolsStyle.inputHeader}>Time between:</Text>
            <View style={toolsStyle.inputRow}>
              <TextInput
                keyboardType="numeric"
                defaultValue={timeBetween.toString()}
                onChangeText={(val) => {
                  setTimeBetween(parseFloat(val));
                }}
                style={toolsStyle.input}
              />
            </View>

            <Text style={toolsStyle.inputHeader}>Whistle Count:</Text>
            <View style={toolsStyle.inputRow}>
              <TextInput
                keyboardType="numeric"
                defaultValue={whistleCount.toString()}
                onChangeText={(val) => {
                  setWhistleCount(parseFloat(val));
                }}
                style={toolsStyle.input}
              />
            </View>

            <Text style={toolsStyle.toolButton} onPress={BeginCadence}>
              Start Cadence Trainig
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
