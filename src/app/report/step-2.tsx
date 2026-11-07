import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/components/button";
import { Icon } from "@/components/icon";
import { Brand as brand } from "@/constants/theme";

const STEP = 2;
const TOTAL_STEPS = 4;

type Precision = "approximate" | "exact";

const PRECISION_OPTIONS: { value: Precision; label: string }[] = [
  { value: "approximate", label: "Approximate area" },
  { value: "exact", label: "Exact spot" },
];

const PRECISION_HINT: Record<Precision, string> = {
  approximate: "Others see an area of about 300 m, not your exact spot.",
  exact: "Others will see the exact spot on the map.",
};

// Static stand-in for a real map (swap for react-native-maps / Mapbox later).
function MapPreview({ precision }: { precision: Precision }) {
  const approximate = precision === "approximate";

  return (
    <View style={styles.map}>
      {/* park */}
      <View style={styles.park} />

      {/* roads */}
      <View
        style={[styles.roadH, { top: "37%", transform: [{ rotate: "-2deg" }] }]}
      />
      <View
        style={[styles.roadH, { top: "76%", transform: [{ rotate: "2deg" }] }]}
      />
      <View
        style={[
          styles.roadV,
          { left: "29%", transform: [{ rotate: "-3deg" }] },
        ]}
      />

      {/* location marker */}
      <View style={styles.markerWrap} pointerEvents="none">
        {approximate && <View style={styles.area} />}
        <View style={styles.dot} />
      </View>
    </View>
  );
}

export default function WhereWasIt() {
  const insets = useSafeAreaInsets();

  const [place, setPlace] = useState("Molyko Market, Buea");
  const [precision, setPrecision] = useState<Precision>("approximate");

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: insets.top + 12,
          paddingBottom: Math.max(insets.bottom, 20) + 4,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Go back"
            onPress={() =>
              router.canGoBack() ? router.back() : router.replace("/(tabs)")
            }
            hitSlop={8}
            className="w-12 h-12 rounded-full bg-white items-center justify-center"
            style={({ pressed }) => pressed && styles.pressed}
          >
            <Icon name="back" size={22} color={brand.ink} strokeWidth={2} />
          </Pressable>
          <Text style={styles.headerTitle} pointerEvents="none">
            Step {STEP} of {TOTAL_STEPS}
          </Text>
        </View>

        <View style={styles.progress}>
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <View
              key={i}
              style={[styles.progressSeg, i < STEP && styles.progressSegActive]}
            />
          ))}
        </View>

        <Text style={styles.title}>Where was it?</Text>

        <View style={styles.content}>
          <MapPreview precision={precision} />

          <View style={styles.field}>
            <Text style={styles.label}>Place</Text>
            <TextInput
              value={place}
              onChangeText={setPlace}
              placeholder="Search a place"
              placeholderTextColor={brand.muted}
              style={styles.input}
            />
          </View>

          <View>
            <View style={styles.chips}>
              {PRECISION_OPTIONS.map((opt) => {
                const active = opt.value === precision;
                return (
                  <Pressable
                    key={opt.value}
                    accessibilityRole="button"
                    accessibilityState={{ selected: active }}
                    onPress={() => setPrecision(opt.value)}
                    style={[styles.chip, active && styles.chipActive]}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        { color: active ? brand.white : brand.ink },
                      ]}
                    >
                      {opt.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
            <Text style={styles.hint}>{PRECISION_HINT[precision]}</Text>
          </View>
        </View>

        <View style={styles.spacer} />

        <View style={styles.footer}>
          <Button
            label="Continue"
            tone="yellow"
            onPress={() => router.push("/report/step-3")}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const AREA = 150;
const DOT = 24;

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: brand.bg },
  pressed: { opacity: 0.85 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    height: 48,
  },
  headerTitle: {
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 17,
    fontWeight: "700",
    color: brand.ink,
  },

  progress: {
    flexDirection: "row",
    gap: 6,
    paddingHorizontal: 20,
    marginTop: 14,
  },
  progressSeg: {
    flex: 1,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#DDE0E8",
  },
  progressSegActive: { backgroundColor: brand.ink },

  title: {
    paddingHorizontal: 20,
    marginTop: 14,
    fontSize: 30,
    fontWeight: "800",
    color: brand.ink,
    letterSpacing: -0.5,
  },

  content: { paddingHorizontal: 20, marginTop: 16, gap: 14 },

  // map
  map: {
    height: 330,
    borderRadius: 28,
    backgroundColor: "#E9ECF1",
    overflow: "hidden",
  },
  park: {
    position: "absolute",
    top: 30,
    right: 40,
    width: 110,
    height: 90,
    borderRadius: 20,
    backgroundColor: "#D8E7D9",
  },
  roadH: {
    position: "absolute",
    left: -10,
    right: -10,
    height: 18,
    backgroundColor: brand.white,
  },
  roadV: {
    position: "absolute",
    top: -10,
    bottom: -10,
    width: 18,
    backgroundColor: brand.white,
  },
  markerWrap: {
    ...StyleSheet.absoluteFill,
    alignItems: "center",
    justifyContent: "center",
  },
  area: {
    position: "absolute",
    width: AREA,
    height: AREA,
    borderRadius: AREA / 2,
    backgroundColor: "rgba(255, 210, 63, 0.28)",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: brand.ink,
  },
  dot: {
    width: DOT,
    height: DOT,
    borderRadius: DOT / 2,
    backgroundColor: brand.yellow,
    borderWidth: 3,
    borderColor: brand.ink,
  },

  // form
  field: { gap: 8 },
  label: { fontSize: 13, fontWeight: "800", color: brand.ink },
  input: {
    height: 56,
    borderRadius: 20,
    backgroundColor: brand.white,
    paddingHorizontal: 18,
    fontSize: 16,
    color: brand.ink,
  },

  chips: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: {
    height: 38,
    paddingHorizontal: 16,
    borderRadius: 19,
    backgroundColor: brand.white,
    alignItems: "center",
    justifyContent: "center",
  },
  chipActive: { backgroundColor: brand.ink },
  chipText: { fontSize: 13, fontWeight: "800" },
  hint: { marginTop: 10, fontSize: 13, color: brand.muted },

  spacer: { flex: 1, minHeight: 24 },
  footer: { paddingHorizontal: 20 },
});
