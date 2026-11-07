import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/components/button";
import { Icon } from "@/components/icon";
import { Brand as brand } from "@/constants/theme";

const STEP = 4;
const TOTAL_STEPS = 4;

// Mock report summary, replace with the collected report state later.
const REPORT = {
  title: "Grey backpack",
  mode: "Lost" as "Lost" | "Found",
  area: "Molyko area",
  when: "today",
  tint: "#D6DEE8",
  rows: [
    { label: "Category", value: "Bags" },
    { label: "Details", value: "Zip tear, blue keyring" },
    { label: "Contact", value: "In app only" },
  ],
};

// Pill switch: ink track, yellow knob (right when on).
function Switch({
  value,
  onChange,
  label,
}: {
  value: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityLabel={label}
      accessibilityState={{ checked: value }}
      onPress={() => onChange(!value)}
      hitSlop={8}
      style={[
        styles.switch,
        {
          justifyContent: "center",
          alignItems: value ? "flex-end" : "flex-start",
        },
        !value && styles.switchOff,
      ]}
    >
      <View style={[styles.knob, !value && styles.knobOff]} />
    </Pressable>
  );
}

export default function LooksGood() {
  const insets = useSafeAreaInsets();
  const [alerts, setAlerts] = useState(true);

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: insets.top + 12,
          paddingBottom: Math.max(insets.bottom, 20) + 4,
        }}
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

        <Text style={styles.title}>Looks good?</Text>

        <View style={styles.content}>
          {/* Summary */}
          <View style={styles.card}>
            <View style={styles.summary}>
              <View style={[styles.thumb, { backgroundColor: REPORT.tint }]}>
                <Icon name="wallet" size={26} color={brand.muted} />
              </View>
              <View style={styles.summaryBody}>
                <Text style={styles.summaryTitle} numberOfLines={1}>
                  {REPORT.title}
                </Text>
                <Text style={styles.summaryMeta} numberOfLines={1}>
                  {REPORT.mode}, {REPORT.area}, {REPORT.when}
                </Text>
              </View>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{REPORT.mode}</Text>
              </View>
            </View>
          </View>

          {/* Details */}
          <View style={[styles.card, styles.details]}>
            {REPORT.rows.map((r, i) => (
              <View
                key={r.label}
                style={[styles.row, i > 0 && styles.rowDivider]}
              >
                <Text style={styles.rowLabel}>{r.label}</Text>
                <Text style={styles.rowValue} numberOfLines={1}>
                  {r.value}
                </Text>
              </View>
            ))}
          </View>

          {/* Alerts */}
          <View style={[styles.card, styles.alertRow]}>
            <View style={{ flex: 1 }}>
              <Text style={styles.alertTitle}>Alert me about matches</Text>
              <Text style={styles.alertSub}>Push and email</Text>
            </View>
            <Switch
              label="Alert me about matches"
              value={alerts}
              onChange={setAlerts}
            />
          </View>
        </View>

        <View style={styles.spacer} />

        <View style={styles.footer}>
          <Button
            label="Publish report"
            tone="yellow"
            onPress={() => {
              // TODO: submit the report, then show the success screen
              router.replace("/report/published");
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

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

  content: { paddingHorizontal: 20, marginTop: 14, gap: 14 },

  card: { backgroundColor: brand.white, borderRadius: 24 },

  summary: { flexDirection: "row", alignItems: "center", padding: 14 },
  thumb: {
    width: 60,
    height: 60,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  summaryBody: { flex: 1, marginLeft: 14, minWidth: 0 },
  summaryTitle: { fontSize: 16, fontWeight: "800", color: brand.ink },
  summaryMeta: { marginTop: 4, fontSize: 13, color: brand.muted },
  badge: {
    backgroundColor: brand.ink,
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginLeft: 8,
  },
  badgeText: { fontSize: 12, fontWeight: "700", color: brand.white },

  details: { paddingHorizontal: 18 },
  row: {
    height: 47,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowDivider: { borderTopWidth: 1, borderTopColor: "#E6E8EE" },
  rowLabel: { fontSize: 15, color: brand.muted },
  rowValue: {
    flexShrink: 1,
    marginLeft: 16,
    fontSize: 15,
    fontWeight: "800",
    color: brand.ink,
  },

  alertRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  alertTitle: { fontSize: 16, fontWeight: "800", color: brand.ink },
  alertSub: { marginTop: 3, fontSize: 13, color: brand.muted },

  switch: {
    width: 52,
    height: 32,
    borderRadius: 16,
    backgroundColor: brand.ink,
    paddingHorizontal: 4,
    marginLeft: 12,
  },
  switchOff: { backgroundColor: "#D3D6DE" },
  knob: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: brand.yellow,
  },
  knobOff: { backgroundColor: brand.white },

  spacer: { flex: 1, minHeight: 24 },
  footer: { paddingHorizontal: 20 },
});
