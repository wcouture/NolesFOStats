import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="GameDetails"
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="index"
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="CadenceTraining"
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="Training"
          options={{ headerShown: false }}
        ></Stack.Screen>

        <Stack.Screen
          name="PlayerDetails"
          options={{ headerShown: false }}
        ></Stack.Screen>
      </Stack>
    </ThemeProvider>
  );
}
