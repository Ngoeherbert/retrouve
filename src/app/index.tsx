import { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { Button } from "@/components/button";
import { Brand as colors } from "@/constants/theme";

// Fades and lifts a view in once, after `delay` ms.
function useEntrance(delay: number) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 480,
      delay,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [progress, delay]);

  return {
    opacity: progress,
    translateY: progress.interpolate({
      inputRange: [0, 1],
      outputRange: [18, 0],
    }),
  };
}

function SearchGlyph() {
  return (
    <View style={styles.glyph}>
      <View style={styles.glyphLens} />
      <View style={styles.glyphHandle} />
    </View>
  );
}

export default function Welcome() {
  const insets = useSafeAreaInsets();
  const found = useEntrance(120);
  const lost = useEntrance(260);

  return (
    <View
      style={[
        styles.screen,
        {
          paddingTop: insets.top + 12,
          paddingBottom: Math.max(insets.bottom, 20) + 16,
        },
      ]}
    >
      <StatusBar style="dark" />

      <View style={styles.brand}>
        <View style={styles.logo}>
          <SearchGlyph />
        </View>
        <Text style={styles.wordmark}>retrouve</Text>
      </View>

      <View style={styles.hero}>
        <View style={styles.disc} />

        <Animated.View
          style={[
            styles.card,
            styles.cardFound,
            {
              opacity: found.opacity,
              transform: [
                { rotate: "-5deg" },
                { translateY: found.translateY },
              ],
            },
          ]}
        >
          <View style={[styles.tag, { backgroundColor: colors.ink }]}>
            <Text style={[styles.tagLabel, { color: colors.white }]}>
              Found
            </Text>
          </View>
          <Text style={[styles.cardTitle, { color: colors.ink }]}>
            Black wallet
          </Text>
          <Text style={[styles.cardMeta, { color: colors.muted }]}>
            Molyko, 2h ago
          </Text>
        </Animated.View>

        <Animated.View
          style={[
            styles.card,
            styles.cardLost,
            {
              opacity: lost.opacity,
              transform: [{ rotate: "5deg" }, { translateY: lost.translateY }],
            },
          ]}
        >
          <View style={[styles.tag, { backgroundColor: colors.yellow }]}>
            <Text style={[styles.tagLabel, { color: colors.ink }]}>Lost</Text>
          </View>
          <Text style={[styles.cardTitle, { color: colors.white }]}>
            Car keys, red tag
          </Text>
          <Text style={[styles.cardMeta, { color: colors.mutedOnDark }]}>
            Mile 17, 1d ago
          </Text>
        </Animated.View>
      </View>

      <Text style={styles.headline}>{"Lost it?\nRetrouve it."}</Text>
      <Text style={styles.body}>
        Report what you lost, share what you found, and get things back to their
        owners.
      </Text>

      <View style={styles.spacer} />

      <Button
        label="Create account"
        tone="yellow"
        onPress={() => router.push("/sign-up" as never)}
      />
      <View style={{ height: 12 }} />
      <Button
        label="I already have an account"
        tone="white"
        onPress={() => router.push("/sign-in" as never)}
      />
    </View>
  );
}

const CARD_W = 174;
const CARD_H = 104;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingHorizontal: 20,
  },

  brand: { flexDirection: "row", alignItems: "center" },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 13,
    backgroundColor: colors.yellow,
    alignItems: "center",
    justifyContent: "center",
  },
  wordmark: {
    marginLeft: 10,
    fontSize: 23,
    fontWeight: "800",
    letterSpacing: -0.8,
    color: colors.ink,
  },

  glyph: { width: 22, height: 22 },
  glyphLens: {
    position: "absolute",
    left: 2,
    top: 2,
    width: 13,
    height: 13,
    borderRadius: 7,
    borderWidth: 2.2,
    borderColor: colors.ink,
  },
  glyphHandle: {
    position: "absolute",
    left: 14.5,
    top: 13,
    width: 2.4,
    height: 7,
    borderRadius: 2,
    backgroundColor: colors.ink,
    transform: [{ rotate: "-45deg" }],
  },

  hero: { height: 290, marginTop: 26 },
  disc: {
    position: "absolute",
    left: 50,
    top: 20,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: colors.yellow,
  },
  card: {
    position: "absolute",
    width: CARD_W,
    height: CARD_H,
    borderRadius: 20,
    padding: 14,
    shadowColor: colors.ink,
    shadowOpacity: 0.14,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  cardFound: { left: 6, top: 80, backgroundColor: colors.white },
  cardLost: { left: 170, top: 180, backgroundColor: colors.ink },
  tag: {
    alignSelf: "flex-start",
    height: 26,
    paddingHorizontal: 11,
    borderRadius: 13,
    justifyContent: "center",
  },
  tagLabel: { fontSize: 12, fontWeight: "800", letterSpacing: 0.1 },
  cardTitle: {
    marginTop: 10,
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: -0.3,
  },
  cardMeta: { marginTop: 3, fontSize: 13.5 },

  headline: {
    marginTop: 48,
    fontSize: 43,
    lineHeight: 44,
    fontWeight: "800",
    letterSpacing: -1.7,
    color: colors.ink,
  },
  body: {
    marginTop: 14,
    fontSize: 16,
    lineHeight: 24,
    color: colors.muted,
  },

  spacer: { flex: 1, minHeight: 24 },
});
