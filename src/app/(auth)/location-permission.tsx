import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/components/button";
import { Brand as brand } from "@/constants/theme";

function Pin() {
  return (
    <View style={styles.pinWrap}>
      <View style={styles.pinCircle}>
        <View style={styles.pinDot} />
      </View>
      <View style={styles.pinShadow} />
    </View>
  );
}

export default function LocationPermission() {
  const insets = useSafeAreaInsets();

  const allow = async () => {
    router.replace("/(tabs)");
  };

  const skip = () => {
    router.replace("/(tabs)");
  };

  return (
    <View style={[styles.screen, { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 20 }]}>
      <StatusBar style="dark" />
      <View style={styles.hero}>
        <Pin />
        <Text style={styles.title}>Help others find items near you</Text>
        <Text style={styles.subtitle}>
          We use your location to show lost and found posts around you. You can turn this off later.
        </Text>
      </View>

      <View style={styles.actions}>
        <Button label="Allow location" onPress={allow} />
        <Pressable accessibilityRole="button" onPress={skip} style={styles.skip}>
          <Text style={styles.skipLabel}>Maybe later</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: brand.bg,
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  hero: { alignItems: "center", marginTop: 40 },
  pinWrap: { alignItems: "center" },
  pinCircle: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: brand.yellow,
    alignItems: "center",
    justifyContent: "center",
  },
  pinDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: brand.ink,
  },
  pinShadow: {
    width: 26,
    height: 10,
    borderRadius: 13,
    backgroundColor: brand.ink,
    opacity: 0.08,
    marginTop: 10,
  },
  title: {
    marginTop: 28,
    textAlign: "center",
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "800",
    letterSpacing: -1,
    color: brand.ink,
    paddingHorizontal: 6,
  },
  subtitle: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 16.5,
    lineHeight: 23,
    color: brand.muted,
    paddingHorizontal: 10,
  },
  actions: { gap: 14 },
  skip: { alignSelf: "center", paddingVertical: 8 },
  skipLabel: { fontSize: 16, fontWeight: "700", color: brand.ink },
});
