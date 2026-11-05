import { Stack } from 'expo-router';

export default function ReportLayout() {
  return (
    <Stack>
      <Stack.Screen name="step-1" options={{ headerShown: false }} />
      <Stack.Screen name="step-2" options={{ headerShown: false }} />
      <Stack.Screen name="step-3" options={{ headerShown: false }} />
      <Stack.Screen name="step-4" options={{ headerShown: false }} />
      <Stack.Screen name="published" options={{ headerShown: false }} />
      <Stack.Screen name="matches" options={{ headerShown: false }} />
    </Stack>
  );
}
