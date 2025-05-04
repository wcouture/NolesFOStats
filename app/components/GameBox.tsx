import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { GameCardData } from "../Data/DataStore";
import { boxCardStyle } from "../styling";

function CalculateWinPercent(props: GameCardData) {
  const totalReps = props.wins + props.losses;
  if (totalReps <= 0) {
    return 0;
  }

  const percent = (props.wins / totalReps) * 100;
  return percent;
}

function OpenGameDetails(id: number) {
  router.push(`/GameDetails?id=${id}`);
}

export default function GameBox(props: GameCardData) {
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [winPercent, setWinPercent] = useState(0);
  const [opponent, setOpponent] = useState("");

  const [boxStyle, setBoxStyle] = useState({});

  useEffect(() => {
    setWins(props.wins);
    setLosses(props.losses);

    const percent = CalculateWinPercent(props);
    setWinPercent(percent);

    setOpponent(props.opponent);
    const boxStyle = [];
    boxStyle.push(boxCardStyle.boxBody);

    if (props.home) {
      boxStyle.push(boxCardStyle.goldBackground);
    } else {
      boxStyle.push(boxCardStyle.garnetBackground);
    }

    if (props.horizontal) {
      boxStyle.push(boxCardStyle.horizontalBox);
    }

    setBoxStyle(boxStyle);
  }, []);

  return (
    <Pressable onPress={() => OpenGameDetails(props.id)}>
      <View style={boxStyle}>
        <Text style={[boxCardStyle.cardTitle]}>{opponent}</Text>
        <View style={[boxCardStyle.statBox]}>
          <Text style={[boxCardStyle.statLabel]}>Wins: {wins}</Text>
          <Text style={[boxCardStyle.statLabel]}>Losses: {losses}</Text>
          <Text style={[boxCardStyle.statLabel]}>{winPercent.toFixed(2)}%</Text>
        </View>
      </View>
    </Pressable>
  );
}
