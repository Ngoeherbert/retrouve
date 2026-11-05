import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Icon } from "@/components/icon";
import { SearchBar } from "@/components/search-bar";
import { FiltersSheet } from "@/components/filters-sheet";
import { Brand as brand } from "@/constants/theme";

const MARKERS = [
  {
    id: "1",
    title: "Black leather wallet",
    category: "Wallets",
    coordinate: { latitude: 4.0511, longitude: 9.7679 },
  },
  {
    id: "2",
    title: "Red backpack",
    category: "Bags",
    coordinate: { latitude: 3.8667, longitude: 11.5167 },
  },
];

export default function MapViewScreen() {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(MARKERS[0]);

  const region = useMemo(
    () => ({
      latitude: 3.95,
      longitude: 9.7,
      latitudeDelta: 2.2,
      longitudeDelta: 2.2,
    }),
    []
  );

  return (
    <View style={styles.screen}>
      <MapView
        provider={PROVIDER_DEFAULT}
        style={StyleSheet.absoluteFill}
        initialRegion={region}
      >
        {MARKERS.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            onPress={() => setSelected(marker)}
          />
        ))}
      </MapView>

      <View style={[styles.top, { paddingTop: insets.top + 12 }]}>
        <View style={styles.header}>
          <SearchBar value={query} onChangeText={setQuery} onFilter={() => setOpen(true)} />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Go back"
            onPress={() => router.back()}
            style={({ pressed }) => [styles.listBtn, pressed && styles.pressed]}
          >
            <View style={styles.chevron} />
          </Pressable>
        </View>
      </View>

      <Pressable
        accessibilityRole="button"
        style={[styles.locate, { bottom: 190 + insets.bottom }]}
        hitSlop={8}
      >
        <Icon name="locate" size={22} color={brand.ink} />
      </Pressable>

      {selected ? (
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push({ pathname: "/item/[id]", params: { id: selected.id } })}
          style={[styles.card, { bottom: insets.bottom + 110 }]}
        >
          <View style={styles.iconWrap}>
            <Icon name={selected.category === "Wallets" ? "wallet" : "bag"} size={30} color={brand.ink} />
          </View>
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle} numberOfLines={1}>
              {selected.title}
            </Text>
            <Text style={styles.cardMeta}>Tap to view details</Text>
          </View>
          <Icon name="next" size={22} color={brand.ink} />
        </Pressable>
      ) : null}

      <FiltersSheet visible={open} onClose={() => setOpen(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  top: { position: "absolute", left: 0, right: 0 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 20,
  },
  listBtn: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: brand.ink,
  },
  chevron: {
    width: 10,
    height: 10,
    marginLeft: 3,
    borderLeftWidth: 2.5,
    borderBottomWidth: 2.5,
    borderColor: brand.white,
    borderBottomLeftRadius: 1,
    transform: [{ rotate: "45deg" }],
  },
  pressed: { opacity: 0.9 },
  locate: {
    position: "absolute",
    right: 20,
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: brand.white,
  },
  card: {
    position: "absolute",
    left: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: brand.white,
    borderRadius: 20,
    padding: 14,
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: brand.yellow,
  },
  cardBody: { flex: 1, marginLeft: 14 },
  cardTitle: { fontSize: 16, fontWeight: "700", color: brand.ink },
  cardMeta: { marginTop: 4, fontSize: 14, color: brand.muted },
});
