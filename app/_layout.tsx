import { GluestackUIProvider } from "@components/ui/gluestack-ui-provider";
import { Stack } from "expo-router";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import "../global.css";

export default function RootLayout() {
  return <GluestackUIProvider>
    <SafeAreaProvider>
    <Stack 
     screenOptions={{
      headerShown: false,
     }}
     initialRouteName="(tabs)"
    >
      {/* <Stack.Screen name="index" options={{ headerShown: false }} /> */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
    </SafeAreaProvider>
    </GluestackUIProvider>;
}
