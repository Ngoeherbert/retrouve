import { useMemo, useState } from "react";
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
  confidence: number;
  tags: string[];
  tint: string;
};

// Name of the item the user reported (comes from the report / route params later).
const REPORTED_ITEM = "grey backpack";

const MOCK_MATCHES: Match[] = [
  {
    id: "m1",
    title: "Grey bag, zip tear",
    location: "Molyko",
    time: "3h ago",
    confidence: 94,
    tags: ["Same category", "Within 400 m", "Zip tear in both"],
    tint: "#D6E6DA",
  },
  {
    id: "m2",
    title: "Backpack, dark grey",
    location: "Great Soppo",
    time: "1d ago",
    confidence: 68,
    tags: ["Same category", "Within 3 km"],
    tint: "#EBDDCB",
  },
];

const STRONG_AT = 85;

function MatchCard({
  item,
  onDismiss,
}: {
  item: Match;
  onDismiss: () => void;
}) {
  const strong = item.confidence >= STRONG_AT;

  return (
    <View style={styles.card}>
      <Pressable
        accessibilityRole="button"
        onPress={() =>
          router.push({ pathname: "/item/[id]", params: { id: item.id } })
        }
        style={styles.cardTop}
      >
        <View style={[styles.thumb, { backgroundColor: item.tint }]}>
          <Icon name="wallet" size={24} color={brand.muted} />
        </View>

        <View style={styles.cardBody}>
          <Text style={styles.cardTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.cardMeta} numberOfLines={1}>
            Found at {item.location}, {item.time}
          </Text>
        </View>

        <View
          style={[
            styles.badge,
            strong ? styles.badgeStrong : styles.badgePossible,
          ]}
        >
          <Text
            style={[
              styles.badgeText,
              { color: strong ? brand.white : brand.muted },
            ]}
          >
            {strong ? "Strong match" : "Possible"}
          </Text>
        </View>
      </Pressable>

      <View style={styles.tags}>
        {item.tags.map((tag) => (
          <View key={tag} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>

      <View style={styles.actions}>
        <View style={{ flex: 1 }}>
          <Button
            label="This is mine"
            tone="yellow"
            compact
            onPress={() =>
              router.push({
                pathname: "/claim/[id]/prove",
                params: { id: item.id },
              })
            }
          />
        </View>
        <View style={{ flex: 1 }}>
          <Button label="Not mine" tone="grey" compact onPress={onDismiss} />
        </View>
      </View>
    </View>
  );
}

export default function Matches() {
  const insets = useSafeAreaInsets();
  const [dismissed, setDismissed] = useState<string[]>([]);

  const matches = useMemo(
    () => MOCK_MATCHES.filter((m) => !dismissed.includes(m.id)),
    [dismissed],
  );

  const dismiss = (id: string) => setDismissed((prev) => [...prev, id]);

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + 12,
          paddingBottom: Math.max(insets.bottom, 20) + 24,
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
            Matches
          </Text>
          <View style={styles.aiPill}>
            <Text style={styles.aiText}>AI on</Text>
          </View>
        </View>

        <View style={styles.intro}>
          <Text style={styles.title}>For your {REPORTED_ITEM}</Text>
          <Text style={styles.subtitle}>
            We compare photos, descriptions, places and times. You decide.
          </Text>
        </View>

        <View style={styles.list}>
          {matches.length === 0 ? (
            <View style={styles.empty}>
              <Text style={styles.emptyTitle}>No matches left to review</Text>
              <Text style={styles.emptyBody}>
                We will tell you when a new item shows up that looks like your{" "}
                {REPORTED_ITEM}.
              </Text>
              <Pressable
                accessibilityRole="button"
                onPress={() => router.replace("/(tabs)")}
                style={({ pressed }) => [
                  styles.emptyBtn,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.btnPrimaryText}>Back to home</Text>
              </Pressable>
            </View>
          ) : (
            matches.map((item) => (
              <MatchCard
                key={item.id}
                item={item}
                onDismiss={() => dismiss(item.id)}
              />
            ))
          )}
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
    justifyContent: "space-between",
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
  aiPill: {
    backgroundColor: brand.yellow,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  aiText: { fontSize: 12, fontWeight: "800", color: brand.ink },

  intro: { paddingHorizontal: 20, marginTop: 20 },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: brand.ink,
    letterSpacing: -0.5,
  },
  subtitle: { marginTop: 6, fontSize: 16, lineHeight: 22, color: brand.muted },

  list: { paddingHorizontal: 20, marginTop: 14, gap: 12 },

  card: { backgroundColor: brand.white, borderRadius: 24, padding: 14 },
  cardTop: { flexDirection: "row", alignItems: "center" },
  thumb: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  cardBody: { flex: 1, marginLeft: 12, minWidth: 0 },
  cardTitle: { fontSize: 16, fontWeight: "800", color: brand.ink },
  cardMeta: { marginTop: 3, fontSize: 13, color: brand.muted },

  badge: {
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginLeft: 8,
  },
  badgeStrong: { backgroundColor: brand.ink },
  badgePossible: { backgroundColor: "#E6E8EE" },
  badgeText: { fontSize: 12, fontWeight: "700" },

  tags: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 14 },
  tag: {
    backgroundColor: brand.bg,
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  tagText: { fontSize: 12, color: brand.ink },

  actions: { flexDirection: "row", gap: 10, marginTop: 14 },
  btn: {
    flex: 1,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
  },
  btnPrimary: { backgroundColor: brand.yellow },
  btnPrimaryText: { fontSize: 14, fontWeight: "800", color: brand.ink },
  btnSecondary: { backgroundColor: brand.bg },
  btnSecondaryText: { fontSize: 14, fontWeight: "700", color: brand.ink },

  empty: {
    backgroundColor: brand.white,
    borderRadius: 24,
    padding: 20,
    alignItems: "center",
  },
  emptyTitle: { fontSize: 17, fontWeight: "800", color: brand.ink },
  emptyBody: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
    color: brand.muted,
  },
  emptyBtn: {
    marginTop: 16,
    height: 42,
    paddingHorizontal: 22,
    borderRadius: 21,
    backgroundColor: brand.yellow,
    alignItems: "center",
    justifyContent: "center",
  },
});
