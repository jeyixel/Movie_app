import { Stack } from "expo-router";
import './global.css';

export default function RootLayout() {
  return <Stack>

    {/* These will remove the header on top of the screen, next step is to go to _layout.tsx on tabs folder */}

    <Stack.Screen
      name="(tabs)"
      options={{headerShown: false}}
    />

    <Stack.Screen
      name="movie/[id]"
      options={{headerShown: false}}
    />
  </Stack>;
}
