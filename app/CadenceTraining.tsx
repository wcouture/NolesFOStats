import { useAudioPlayer } from "expo-audio";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { detailsStyle } from "./styling";

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms * 1000));
}

const downAudioSource = require("../assets/audio/DOWN.mp3");
const setAudioSource = require("../assets/audio/SET.mp3");
const whistleAudioSource = require("../assets/audio/Whistle.mp3");

export default function CadenceTraining() {
  const query = useLocalSearchParams();

  const [statusText, setStatusText] = useState("");

  const [minToSet, setMinToSet] = useState(0);
  const [maxToSet, setMaxToSet] = useState(0);

  const [minToWhistle, setMinToWhistle] = useState(0);
  const [maxToWhistle, setMaxToWhistle] = useState(0);

  const [timeBetween, setTimeBetween] = useState(0);
  const [repCount, setRepCount] = useState(0);

  const [repsDone, setRepsDone] = useState(-1);

  const downAudioPlayer = useAudioPlayer(downAudioSource);
  const setAudioPlayer = useAudioPlayer(setAudioSource);
  const whistleAudioPlayer = useAudioPlayer(whistleAudioSource);

  const startCadenceTraining = () => {
    if (repsDone == -1) {
      return;
    }

    if (repsDone + 1 >= repCount) {
      router.back();
    }

    setStatusText("Down");
  };

  const runDownCall = () => {
    downAudioPlayer.seekTo(0);
    downAudioPlayer.play();

    let setRange = maxToSet - minToSet;
    let randVal = Math.random();

    let setTime = (randVal * setRange + minToSet) * 1000;

    setTimeout(() => {
      setStatusText("Set");
    }, setTime);
  };

  const runSetCall = () => {
    setAudioPlayer.seekTo(0);
    setAudioPlayer.play();

    let whistleTime =
      (Math.random() * (maxToWhistle - minToWhistle) + minToWhistle) * 1000;

    setTimeout(() => {
      setStatusText("Go");
    }, whistleTime);
  };

  const runWhistle = () => {
    whistleAudioPlayer.seekTo(0);
    whistleAudioPlayer.play();

    setTimeout(() => {
      setRepsDone((repsDone) => repsDone + 1);
      startCadenceTraining();
    }, timeBetween * 1000);
  };

  useEffect(() => {
    setMinToSet(parseFloat(query.minSet as string));
    setMaxToSet(parseFloat(query.maxSet as string));

    setMinToWhistle(parseFloat(query.maxWhistle as string));
    setMaxToWhistle(parseFloat(query.maxWhistle as string));
    setTimeBetween(parseFloat(query.between as string));
    setRepCount(parseInt(query.count as string));

    setRepsDone(0);
  }, []);

  useEffect(() => {
    startCadenceTraining();
  }, [repCount]);

  useEffect(() => {
    switch (statusText) {
      case "Down":
        runDownCall();
        break;
      case "Set":
        runSetCall();
        break;
      case "Go":
        runWhistle();
        break;
    }
  }, [statusText]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={detailsStyle.safeArea}>
        <Text
          onPress={() => {
            router.back();
          }}
          style={detailsStyle.backButtonText}
        >
          {"<"}
        </Text>
        <Text style={styleSheet.repTrackerLabel}>
          {repsDone} / {repCount}
        </Text>
        <View style={styleSheet.trainerTextContainer}>
          <Text style={styleSheet.trainerStatusLabel}>{statusText}</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styleSheet = StyleSheet.create({
  repTrackerLabel: {
    margin: "auto",
  },

  trainerTextContainer: {
    width: "100%",
    display: "flex",
    height: "90%",

    justifyContent: "center",
    alignItems: "center",
  },

  trainerStatusLabel: {
    fontSize: 50,
    fontWeight: 600,
  },
});
