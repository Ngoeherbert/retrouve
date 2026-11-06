import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/components/button";
import { Icon } from "@/components/icon";
import { SearchBar } from "@/components/search-bar";
import { FiltersSheet } from "@/components/filters-sheet";
import { Brand as brand } from "@/constants/theme";

type Chip = "found" | "lost";

type Props = {
  query?: string;
  onQueryChange?: (value: string) => void;
  onFilter?: () => void;
  area?: string;
  filtersOpen?: boolean;
  onFiltersClose?: () => void;
  embedded?: boolean;
};

export default function NoResultsScreen({
  query: queryProp,
  onQueryChange,
  onFilter,
  area = "Molyko",
  filtersOpen,
  onFiltersClose,
  embedded = false,
}: Props) {
  const insets = useSafeAreaInsets();
  const [queryState, setQueryState] = useState("grey backpack");
  const [chip, setChip] = useState<Chip>("found");
  const [openState, setOpenState] = useState(false);

  const query = queryProp ?? queryState;
  const setQuery = onQueryChange ?? setQueryState;
  const open = filtersOpen ?? openState;
  const setOpen = onFiltersClose ? (v: boolean) => !v && onFiltersClose() : setOpenState;
  const openFilters = onFilter ?? (() => setOpen(true));

  const onNotify = () => {
    // TODO: subscribe the user to alerts for this query + area
  };
  const onPostLost = () => {
    // TODO: open the "post as lost" flow, prefilled with the query
  };

  return (
    <View style={embedded ? styles.embedded : styles.screen}>
      {!embedded ? (
        <View style={{ paddingTop: insets.top + 12 }}>
          <View style={styles.searchRow}>
            <SearchBar
              value={query}
              onChangeText={setQuery}
              onFilter={openFilters}
            />
          </View>

          <View style={styles.chips}>
            {(["found", "lost"] as Chip[]).map((c) => {
              const active = c === chip;
              return (
                <Pressable
                  key={c}
                  accessibilityRole="button"
                  accessibilityState={{ selected: active }}
                  onPress={() => setChip(c)}
                  style={[
                    styles.chip,
                    active ? styles.chipActive : styles.chipIdle,
                  ]}
                >
                  <Text
                    style={[
                      styles.chipText,
                      { color: active ? brand.white : brand.ink },
                    ]}
                  >
                    {c === "found" ? "Found" : "Lost"}
                  </Text>
                </Pressable>
              );
            })}
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Area: ${area}`}
              style={[styles.chip, styles.chipArea]}
            >
              <Text style={[styles.chipText, { color: brand.ink }]}>{area}</Text>
            </Pressable>
          </View>
        </View>
      ) : null}

      <View style={styles.center}>
        <View style={styles.ringOuter}>
          <View style={styles.ringInner}>
            <View style={styles.iconCircle}>
              <Icon name="wallet" size={30} color={brand.muted} />
            </View>
          </View>
        </View>

        <Text style={styles.title}>Nothing matches yet</Text>
        <Text style={styles.body}>
          New items are posted every day. We will tell you when a{" "}
          {query.trim() || "matching item"} shows up near {area}.
        </Text>
      </View>

      <View style={[styles.actions, { paddingBottom: embedded ? 20 : insets.bottom + 110 }]}>
        <Button label="Notify me" tone="yellow" onPress={onNotify} />
        <Button label="Post it as lost" tone="white" onPress={onPostLost} />
      </View>

      {!embedded ? (
        <FiltersSheet
          visible={open}
          onClose={() => (onFiltersClose ? onFiltersClose() : setOpen(false))}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: brand.bg },
  embedded: { flexGrow: 1, minHeight: 520, backgroundColor: brand.bg },
  pressed: { opacity: 0.85 },

  searchRow: { paddingHorizontal: 20 },
  chips: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 20,
    marginTop: 12,
  },
  chip: {
    height: 38,
    paddingHorizontal: 16,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
  },
  chipActive: { backgroundColor: brand.ink },
  chipIdle: { backgroundColor: brand.white },
  chipArea: { backgroundColor: brand.yellow },
  chipText: { fontSize: 14, fontWeight: "700" },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 36,
  },
  ringOuter: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#E6DCEE",
    alignItems: "center",
    justifyContent: "center",
  },
  ringInner: {
    width: 134,
    height: 134,
    borderRadius: 67,
    backgroundColor: "#D3DEEC",
    alignItems: "center",
    justifyContent: "center",
  },
  iconCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: brand.white,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginTop: 32,
    fontSize: 28,
    fontWeight: "800",
    color: brand.ink,
    textAlign: "center",
    letterSpacing: -0.5,
  },
  body: {
    marginTop: 12,
    fontSize: 16,
    lineHeight: 24,
    color: brand.muted,
    textAlign: "center",
  },

  actions: { paddingHorizontal: 20, gap: 12 },
});
