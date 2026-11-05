import { useMemo, useState } from "react";
import { FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Icon } from "@/components/icon";
import { SearchBar } from "@/components/search-bar";
import { FiltersSheet } from "@/components/filters-sheet";
import { Brand as brand } from "@/constants/theme";

type Item = {
  id: string;
  title: string;
  category: string;
  location: string;
  time: string;
  image: string;
};

const DATA: Item[] = [
  {
    id: "1",
    title: "Black leather wallet",
    category: "Wallets",
    location: "Douala, Akwa",
    time: "2h ago",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "2",
    title: "Red backpack",
    category: "Bags",
    location: "Yaounde, Bastos",
    time: "5h ago",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
  },
];

export default function SearchResults() {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const results = useMemo(() => {
    if (!query.trim()) return DATA;
    const q = query.toLowerCase();
    return DATA.filter((item) => item.title.toLowerCase().includes(q));
  }, [query]);

  return (
    <View style={[styles.screen, { paddingTop: insets.top + 12 }]}>
      <View style={styles.header}>
        <SearchBar value={query} onChangeText={setQuery} onFilter={() => setOpen(true)} />
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push("/(tabs)/search/map")}
          style={({ pressed }) => [styles.mapBtn, pressed && styles.pressed]}
        >
          <Icon name="pin" size={22} color={brand.white} />
        </Pressable>
      </View>

      <Text style={styles.count}>{results.length} results</Text>

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
        renderItem={({ item }) => (
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push({ pathname: "/item/[id]", params: { id: item.id } })}
            style={({ pressed }) => [styles.card, pressed && styles.pressed]}
          >
            <Image source={{ uri: item.image }} style={styles.thumb} />
            <View style={styles.body}>
              <Text style={styles.title} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={styles.meta} numberOfLines={1}>
                {item.location} • {item.time}
              </Text>
            </View>
            <Icon name="next" size={20} color={brand.muted} />
          </Pressable>
        )}
      />

      <FiltersSheet visible={open} onClose={() => setOpen(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: brand.bg },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 20,
  },
  mapBtn: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: brand.ink,
  },
  pressed: { opacity: 0.9 },
  count: {
    marginTop: 16,
    marginBottom: 10,
    paddingHorizontal: 20,
    fontSize: 14,
    color: brand.muted,
  },
  list: { paddingHorizontal: 20, paddingBottom: 120 },
  sep: { height: 12 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: brand.white,
    borderRadius: 18,
    padding: 12,
  },
  thumb: { width: 64, height: 64, borderRadius: 12 },
  body: { flex: 1, marginLeft: 14 },
  title: { fontSize: 16, fontWeight: "700", color: brand.ink },
  meta: { marginTop: 4, fontSize: 14, color: brand.muted },
});
