import { StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/components/button";
import { Brand as brand } from "@/constants/theme";

function Disc({
  size,
  color,
  opacity = 1,
  children,
}: {
  size: number;
  color: string;
  opacity?: number;
  children?: React.ReactNode;
}) {
  return (
    <View style={[StyleSheet.absoluteFill, styles.center]}>
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          opacity,
        }}
      />
      {children}
    </View>
  );
}

function Pin() {
  return (
    <View style={styles.pin}>
      <View style={styles.pinShape} />
      <View style={styles.pinHole} />
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
    <View
      style={[
        styles.screen,
        {
          paddingTop: insets.top + 16,
          paddingBottom: Math.max(insets.bottom, 20) + 16,
        },
      ]}
    >
      <StatusBar style="dark" />

      <View style={styles.hero}>
        <View style={styles.rings} accessibilityElementsHidden>
          <Disc size={200} color={brand.yellow} opacity={0.3} />
          <Disc size={120} color={brand.yellow} />
          <Disc size={60} color={brand.ink} />
          <View style={[StyleSheet.absoluteFill, styles.center]}>
            <Pin />
          </View>
        </View>

        <Text accessibilityRole="header" style={styles.title}>
          Find items near you
        </Text>
        <Text style={styles.subtitle}>
          We use your area to show nearby lost and found items. Approximate
          location is enough.
        </Text>
      </View>

      <View style={styles.actions}>
        <Button label="Allow while using the app" onPress={allow} />
        <Button label="Not now" tone="white" onPress={skip} />
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
  center: { alignItems: "center", justifyContent: "center" },

  hero: { alignItems: "center", marginTop: 72 },
  rings: { width: 200, height: 200 },

  pin: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  pinShape: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderBottomRightRadius: 0,
    borderWidth: 2.4,
    borderColor: brand.yellow,
    transform: [{ rotate: "45deg" }, { translateY: -1 }],
  },
  pinHole: {
    position: "absolute",
    width: 7,
    height: 7,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: brand.yellow,
    transform: [{ translateY: -2 }],
  },

  title: {
    marginTop: 36,
    textAlign: "center",
    fontSize: 33,
    lineHeight: 38,
    fontWeight: "800",
    letterSpacing: -1.2,
    color: brand.ink,
  },
  subtitle: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 16.5,
    lineHeight: 24,
    color: brand.muted,
    paddingHorizontal: 18,
  },

  actions: { gap: 12 },
});
