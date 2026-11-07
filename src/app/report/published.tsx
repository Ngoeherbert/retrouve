import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/components/button";
import { Icon } from "@/components/icon";
import { Brand as brand } from "@/constants/theme";

type Match = {
  id: string;
  title: string;
  location: string;
  time: string;
  tint: string;
};

// Name of the item the user reported (comes from the report later).
const REPORTED_ITEM = "grey backpack";

// Mock, same shape as the Matches screen. Replace with real results.
const MATCHES: Match[] = [
  {
    id: "m1",
    title: "Grey bag, zip tear",
    location: "Molyko",
    time: "3h",
    tint: "#D6E6DA",
  },
  {
    id: "m2",
    title: "Backpack, dark",
    location: "Great Soppo",
    time: "1d",
    tint: "#EBDDCB",
  },
];

function MatchRow({ item }: { item: Match }) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={() =>
        router.push({ pathname: "/item/[id]", params: { id: item.id } })
      }
      className="flex-row items-center rounded-[24px] bg-white p-3.5"
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View
        className="w-[60px] h-[60px] rounded-[18px] items-center justify-center"
        style={{ backgroundColor: item.tint }}
      >
        <Icon name="wallet" size={24} color={brand.muted} />
      </View>

      <View className="flex-1 ml-3.5 min-w-0">
        <Text className="text-base font-extrabold" style={{ color: brand.ink }} numberOfLines={1}>
          {item.title}
        </Text>
        <Text className="mt-1 text-[13px]" style={{ color: brand.muted }} numberOfLines={1}>
          Found, {item.location}, {item.time}
        </Text>
      </View>

      <View className="rounded-[14px] px-2.5 py-1.5 ml-2" style={{ backgroundColor: brand.ink }}>
        <Text className="text-xs font-bold text-white">Found</Text>
      </View>
    </Pressable>
  );
}

export default function ReportPublished() {
  const insets = useSafeAreaInsets();
  const count = MATCHES.length;

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: insets.top + 80,
          paddingBottom: Math.max(insets.bottom, 20) + 4,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <View style={styles.check}>
            <Icon name="check" size={44} color={brand.ink} strokeWidth={3} />
          </View>
          <Text style={styles.title}>Report published</Text>
          <Text style={styles.subtitle}>
            We will alert you the moment something looks like your{" "}
            {REPORTED_ITEM}.
          </Text>
        </View>

        {count > 0 && (
          <View style={styles.matches}>
            <Text style={styles.sectionTitle}>
              {count} possible {count === 1 ? "match" : "matches"} already
            </Text>
            <View style={styles.list}>
              {MATCHES.map((m) => (
                <MatchRow key={m.id} item={m} />
              ))}
            </View>
          </View>
        )}

        <View style={styles.spacer} />

        <View style={styles.footer}>
          {count > 0 && (
            <Button
              label="See possible matches"
              tone="yellow"
              onPress={() => router.replace("/report/matches")}
            />
          )}
          <View style={{ height: 12 }} />
          <Button label="Done" tone="white" onPress={() => router.replace("/(tabs)")} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: brand.bg },
  pressed: { opacity: 0.85 },

  hero: { alignItems: "center", paddingHorizontal: 36 },
  check: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: brand.yellow,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginTop: 22,
    fontSize: 32,
    fontWeight: "800",
    color: brand.ink,
    letterSpacing: -0.5,
    textAlign: "center",
  },
  subtitle: {
    marginTop: 10,
    fontSize: 16,
    lineHeight: 24,
    color: brand.muted,
    textAlign: "center",
  },

  matches: { paddingHorizontal: 20, marginTop: 56 },
  sectionTitle: { fontSize: 16, fontWeight: "800", color: brand.ink },
  list: { marginTop: 12, gap: 10 },

  spacer: { flex: 1, minHeight: 32 },
  footer: { paddingHorizontal: 20 },
});
