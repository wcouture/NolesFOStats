import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { GameCardData } from "../Data/DataStore";
import { boxCardStyle } from "../styling";

function CalculateWinPercent(props: GameCardData) {
  const wins = parseInt(props.wins as unknown as string);
  const losses = parseInt(props.losses as unknown as string);

  const totalReps = wins + losses;
  if (totalReps <= 0) {
    return 0;
  }

  const percent = (wins / totalReps) * 100;
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
  const [titleStyle, setTitleStyle] = useState({});

  useEffect(() => {
    console.log(props.wins);
    setWins(props.wins);
    setLosses(props.losses);

    const percent = CalculateWinPercent(props);
    setWinPercent(percent);

    setOpponent(props.opponent);

    const boxStyle = [];
    boxStyle.push(boxCardStyle.boxBody);

    const titleStyle = [];
    titleStyle.push(boxCardStyle.cardTitle);

    const isHome = (props.home as unknown as string) == "1";
    if (isHome) {
      boxStyle.push(boxCardStyle.goldBackground);
    } else {
      boxStyle.push(boxCardStyle.garnetBackground);
    }

    if (props.horizontal) {
      boxStyle.push(boxCardStyle.horizontalBox);
      titleStyle.push(boxCardStyle.horizontalTitle);
    }

    setBoxStyle(boxStyle);
    setTitleStyle(titleStyle);
  }, []);

  return (
    <Pressable onPress={() => OpenGameDetails(props.id)}>
      <View style={boxStyle}>
        <Text style={titleStyle}>{opponent}</Text>
        <View style={[boxCardStyle.statBox]}>
          <Text style={[boxCardStyle.statLabel]}>Wins: {wins}</Text>
          <Text style={[boxCardStyle.statLabel]}>Losses: {losses}</Text>
          <Text style={[boxCardStyle.statLabel]}>{winPercent.toFixed(2)}%</Text>
        </View>
      </View>
    </Pressable>
  );
}
