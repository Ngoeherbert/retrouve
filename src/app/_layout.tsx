import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import '../global.css';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AnimatedSplashOverlay />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="item/[id]" />
          <Stack.Screen name="report" />
          <Stack.Screen name="claim/[id]/prove" />
          <Stack.Screen name="claim/[id]/status" />
          <Stack.Screen name="claim/[id]/review" />
          <Stack.Screen name="handover/[id]" />
          <Stack.Screen name="messages/[id]" />
          <Stack.Screen name="notifications" />
          <Stack.Screen name="activity" />
          <Stack.Screen name="saved-searches" />
          <Stack.Screen name="user/[id]" />
          <Stack.Screen name="ratings" />
          <Stack.Screen name="settings" />
          <Stack.Screen name="my-report/[id]" />
          <Stack.Screen name="dev-index" />
          <Stack.Screen name="filters" options={{ presentation: 'modal' }} />
          <Stack.Screen name="rate/[id]" options={{ presentation: 'modal' }} />
          <Stack.Screen name="report-post/[id]" options={{ presentation: 'modal' }} />
        </Stack>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
