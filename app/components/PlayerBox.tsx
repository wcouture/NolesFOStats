import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { PlayerCardData } from "../Data/DataStore";
import { boxCardStyle } from "../styling";

function CalculateWinPercent(props: PlayerCardData) {
  const totalReps = props.wins + props.losses;
  const percent = (props.wins / totalReps) * 100;
  return percent;
}

function OpenPlayerDetails(id: number) {
  router.push(`/PlayerDetails?id=${id}`);
}

export default function PlayerBox(props: PlayerCardData) {
  const [playerId, setPlayerId] = useState(-1);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [gbs, setGbs] = useState(0);
  const [winPercent, setWinPercent] = useState(0);
  const [jersey, setJersey] = useState(0);

  const [boxStyle, setBoxStyle] = useState({});

  useEffect(() => {
    setPlayerId(props.id);
    setJersey(props.jersey);

    setWins(props.wins);
    setLosses(props.losses);
    setGbs(props.gbs);

    const percent = CalculateWinPercent(props);
    setWinPercent(percent);

    if (props.horizontal) {
      setBoxStyle([
        boxCardStyle.boxBody,
        boxCardStyle.horizontalBox,
        boxCardStyle.garnetBackground,
      ]);
    } else {
      setBoxStyle([boxCardStyle.boxBody, boxCardStyle.garnetBackground]);
    }
  }, []);

  return (
    <Pressable
      onPress={() => {
        OpenPlayerDetails(playerId);
      }}
    >
      <View style={boxStyle}>
        <Text style={boxCardStyle.cardTitle}>#{jersey}</Text>
        <View style={boxCardStyle.statBox}>
          <Text style={boxCardStyle.statLabel}>Wins: {wins}</Text>
          <Text style={boxCardStyle.statLabel}>Losses: {losses}</Text>
          <Text style={boxCardStyle.statLabel}>GBs: {gbs}</Text>
          <Text style={boxCardStyle.statLabel}>{winPercent.toFixed(2)}%</Text>
        </View>
      </View>
    </Pressable>
  );
}
