import { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { FiltersSheet } from "@/components/filters-sheet";
import { ItemCard, type Item, type ItemStatus } from "@/components/item-card";
import { SearchBar } from "@/components/search-bar";
import { Brand as brand } from "@/constants/theme";

const TINTS = [
  { tint: "#D5DFEC", circle: "#E6EDF6" },
  { tint: "#EADDCB", circle: "#F4EBDF" },
  { tint: "#D6E5D9", circle: "#E5F0E8" },
  { tint: "#E6D9EC", circle: "#F1E8F5" },
];

const H_PADDING = 20;
const COLUMN_GAP = 12;

// Accent used for the highlighted area chip (Molyko)
const ACCENT = "#FFD43B";

// [title, location, time]
const RAW: [string, string, string][] = [
  ["Black leather wallet", "Molyko market", "2h"],
  ["Brown zip wallet", "Great Soppo", "1d"],
  ["Blue card holder", "Mile 17", "2d"],
  ["Wallet, two cards", "University gate", "3d"],
  ["Black card wallet", "Bonduma", "4d"],
  ["Grey wallet", "Buea town", "4d"],
  ["Leather wallet", "Check Point", "5d"],
  ["Small black wallet", "Muea", "5d"],
  ["Red wallet", "Bokwango", "6d"],
  ["Wallet with ID", "Molyko", "6d"],
  ["Tan wallet", "Clerks Quarters", "1w"],
  ["Navy wallet", "Mile 16", "1w"],
];

const DATA: Item[] = RAW.map(([title, location, time], i) => ({
  id: String(i + 1),
  title,
  location,
  time,
  status: i > 4 && i % 4 === 3 ? "Lost" : "Found",
  ...TINTS[i % TINTS.length],
}));

type ChipKey = "Found" | "Lost" | "Molyko" | "This week";
const CHIPS: ChipKey[] = ["Found", "Lost", "Molyko", "This week"];

export default function SearchResults() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const cardWidth = Math.floor((width - H_PADDING * 2 - COLUMN_GAP) / 2);
  const [query, setQuery] = useState("black wallet");
  // Matches the design: "Found" and "Molyko" start selected
  const [active, setActive] = useState<ChipKey[]>(["Found", "Molyko"]);
  const [open, setOpen] = useState(false);

  // Items matching the text query (drives the "N found nearby" heading)
  const matches = useMemo(() => {
    const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
    return DATA.filter(
      (item) =>
        tokens.length === 0 ||
        tokens.some((t) => item.title.toLowerCase().includes(t)),
    );
  }, [query]);

  // Status chips (Found / Lost) narrow the grid; area/time chips are visual
  // toggles until real location and date data is wired in.
  const results = useMemo(() => {
    const statuses = active.filter(
      (c): c is ItemStatus => c === "Found" || c === "Lost",
    );
    if (statuses.length !== 1) return matches;
    return matches.filter((item) => item.status === statuses[0]);
  }, [matches, active]);

  // Pad odd counts with a spacer so the last card keeps half-width
  const gridData = useMemo<(Item | { id: string; spacer: true })[]>(
    () =>
      results.length % 2 === 1
        ? [...results, { id: "spacer", spacer: true }]
        : results,
    [results],
  );

  const toggle = (c: ChipKey) => {
    setActive((prev) => {
      if (prev.includes(c)) return prev.filter((x) => x !== c);
      // Found and Lost are mutually exclusive
      if (c === "Found") return [...prev.filter((x) => x !== "Lost"), c];
      if (c === "Lost") return [...prev.filter((x) => x !== "Found"), c];
      return [...prev, c];
    });
  };

  return (
    <View style={styles.screen}>
      {/* Opaque, clipped header so no blur/glass effect bleeds over the heading */}
      <View style={[styles.top, { paddingTop: insets.top + 12 }]}>
        <Text style={styles.heading}>{matches.length} found nearby</Text>

        <View style={styles.header}>
          <SearchBar
            value={query}
            onChangeText={setQuery}
            onFilter={() => setOpen(true)}
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.chipsScroll}
          contentContainerStyle={styles.chips}
        >
          {CHIPS.map((c) => {
            const isActive = active.includes(c);
            const isArea = c === "Molyko";
            return (
              <Pressable
                key={c}
                accessibilityRole="button"
                accessibilityState={{ selected: isActive }}
                onPress={() => toggle(c)}
                style={[
                  styles.chip,
                  isActive && (isArea ? styles.chipAccent : styles.chipActive),
                ]}
              >
                <Text
                  style={[
                    styles.chipText,
                    isActive && !isArea && styles.chipTextActive,
                  ]}
                >
                  {c}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <Text style={styles.empty}>No items match your search</Text>
        }
        renderItem={({ item }) => (
          <View style={{ width: cardWidth, flexGrow: 0, flexShrink: 0 }}>
            <ItemCard item={item} />
          </View>
        )}
      />

      <FiltersSheet visible={open} onClose={() => setOpen(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: brand.bg },
  top: {
    backgroundColor: brand.bg,
    zIndex: 2,
    overflow: "hidden",
    paddingBottom: 6,
  },
  heading: {
    paddingHorizontal: 20,
    marginTop: 12,
    fontSize: 30,
    fontWeight: "800",
    color: brand.ink,
  },
  header: { marginTop: 16, paddingHorizontal: 20 },
  chipsScroll: { flexGrow: 0, marginTop: 14 },
  chips: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 20,
  },
  chip: {
    height: 38,
    paddingHorizontal: 16,
    borderRadius: 19,
    justifyContent: "center",
    backgroundColor: brand.white,
  },
  chipActive: { backgroundColor: brand.ink },
  chipAccent: { backgroundColor: ACCENT },
  chipText: { fontSize: 14, fontWeight: "600", color: brand.ink },
  chipTextActive: { color: brand.white },

  list: { paddingHorizontal: H_PADDING, paddingTop: 14, paddingBottom: 140 },
  row: { columnGap: COLUMN_GAP, marginBottom: 4 },
  empty: {
    marginTop: 48,
    textAlign: "center",
    fontSize: 16,
    color: brand.muted,
  },
});
