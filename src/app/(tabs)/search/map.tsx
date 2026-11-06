import { useMemo, useState } from "react";
import { Keyboard, Pressable, StyleSheet, Text, View } from "react-native";
import MapView, {
  Circle,
  Marker,
  PROVIDER_DEFAULT,
  UrlTile,
} from "react-native-maps";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Icon } from "@/components/icon";
import { SearchBar } from "@/components/search-bar";
import { FiltersSheet } from "@/components/filters-sheet";
import { Brand as brand } from "@/constants/theme";

// CARTO now requires a free API key (https://carto.com/basemaps/apikey).
// Put it in .env as EXPO_PUBLIC_CARTO_KEY=your_key and restart Expo.
// Without a key we fall back to plain OpenStreetMap tiles at full color
// (fine for dev, not for heavy production use).
const CARTO_KEY = process.env.EXPO_PUBLIC_CARTO_KEY;

// Minimal look: light, muted Positron basemap with no names or labels.
// Use "light_all" if you ever want street and area names back.
const EXPLORE_STYLE: "light_all" | "light_nolabels" = "light_nolabels";
const MAP_TILE_URL = CARTO_KEY
  ? `https://basemaps.cartocdn.com/rastertiles/${EXPLORE_STYLE}/{z}/{x}/{y}.png?key=${CARTO_KEY}`
  : "https://tile.openstreetmap.org/{z}/{x}/{y}.png";

type Kind = "found" | "lost";
type Filter = "found" | "lost" | "all";

type Item = {
  id: string;
  title: string;
  kind: Kind;
  category: "Wallets" | "Bags";
  distance: string;
  ago: string;
  tint: string;
  coordinate: { latitude: number; longitude: number };
};

const ITEMS: Item[] = [
  {
    id: "1",
    title: "Black leather wallet",
    kind: "found",
    category: "Wallets",
    distance: "300 m",
    ago: "2h ago",
    tint: brand.yellow,
    coordinate: { latitude: 3.8667, longitude: 11.5167 },
  },
  {
    id: "2",
    title: "Grey card holder",
    kind: "lost",
    category: "Wallets",
    distance: "650 m",
    ago: "5h ago",
    tint: "#DCE6F5",
    coordinate: { latitude: 3.8705, longitude: 11.5105 },
  },
  {
    id: "3",
    title: "Beige purse",
    kind: "found",
    category: "Bags",
    distance: "900 m",
    ago: "1d ago",
    tint: "#EFE0D2",
    coordinate: { latitude: 3.8745, longitude: 11.5215 },
  },
];

const CLUSTER = {
  count: 3,
  coordinate: { latitude: 3.8585, longitude: 11.5085 },
};

const RADIUS_M = 300;

const CHIPS: { key: Filter; label: string }[] = [
  { key: "found", label: "Found" },
  { key: "lost", label: "Lost" },
  { key: "all", label: "All" },
];

export default function MapViewScreen() {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState("");
  const [, setFocused] = useState(false);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedId, setSelectedId] = useState<string | null>(ITEMS[0].id);

  const region = useMemo(
    () => ({
      latitude: 3.8667,
      longitude: 11.5167,
      latitudeDelta: 0.03,
      longitudeDelta: 0.03,
    }),
    [],
  );

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ITEMS.filter(
      (i) =>
        (filter === "all" || i.kind === filter) &&
        (q === "" || i.title.toLowerCase().includes(q)),
    );
  }, [filter, query]);

  const selected = visible.find((i) => i.id === selectedId) ?? null;

  return (
    <View style={styles.screen}>
      <MapView
        provider={PROVIDER_DEFAULT}
        style={StyleSheet.absoluteFill}
        initialRegion={region}
        mapType="none"
        showsPointsOfInterests={false}
        showsBuildings={false}
        showsTraffic={false}
        showsCompass={false}
        toolbarEnabled={false}
        rotateEnabled={false}
        pitchEnabled={false}
        onPress={Keyboard.dismiss}
        onPanDrag={Keyboard.dismiss}
      >
        <UrlTile
          urlTemplate={MAP_TILE_URL}
          maximumZ={19}
          flipY={false}
          tileSize={256}
        />

        {selected ? (
          <Circle
            center={selected.coordinate}
            radius={RADIUS_M}
            fillColor="rgba(255, 207, 51, 0.22)"
            strokeColor="rgba(255, 207, 51, 0.9)"
            strokeWidth={1}
          />
        ) : null}

        {visible.map((item) => {
          const isSel = item.id === selectedId;
          return (
            <Marker
              key={`${item.id}-${isSel}`}
              coordinate={item.coordinate}
              onPress={() => setSelectedId(item.id)}
              anchor={{ x: 0.5, y: 0.5 }}
              tracksViewChanges={false}
            >
              <View
                style={[
                  styles.pin,
                  { backgroundColor: isSel ? brand.yellow : item.tint },
                  isSel && styles.pinSelected,
                ]}
              >
                <Icon
                  name={item.category === "Wallets" ? "wallet" : "bag"}
                  size={16}
                  color={brand.ink}
                />
              </View>
            </Marker>
          );
        })}

        {filter === "all" ? (
          <Marker
            coordinate={CLUSTER.coordinate}
            anchor={{ x: 0.5, y: 0.5 }}
            tracksViewChanges={false}
          >
            <View style={styles.cluster}>
              <Text style={styles.clusterText}>{CLUSTER.count}</Text>
            </View>
          </Marker>
        ) : null}
      </MapView>

      <View
        style={[styles.top, { paddingTop: insets.top + 12 }]}
        pointerEvents="box-none"
      >
        <View style={styles.header}>
          <View style={styles.searchWrap}>
            <SearchBar
              value={query}
              onChangeText={setQuery}
              onFilter={() => setOpen(true)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
            />
          </View>
        </View>

        <View style={styles.chips}>
          {CHIPS.map((chip) => {
            const active = chip.key === filter;
            return (
              <Pressable
                key={chip.key}
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
                onPress={() => setFilter(chip.key)}
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
                  {chip.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="My location"
        style={[styles.locate, { bottom: 190 + insets.bottom }]}
        hitSlop={8}
      >
        <Icon name="locate" size={22} color={brand.ink} />
      </Pressable>

      {selected ? (
        <Pressable
          accessibilityRole="button"
          onPress={() =>
            router.push({ pathname: "/item/[id]", params: { id: selected.id } })
          }
          style={[styles.card, { bottom: insets.bottom + 110 }]}
        >
          <View style={styles.iconWrap}>
            <Icon
              name={selected.category === "Wallets" ? "wallet" : "bag"}
              size={30}
              color={brand.ink}
            />
          </View>
          <View style={styles.cardBody}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {selected.kind === "found" ? "Found" : "Lost"}
              </Text>
            </View>
            <Text style={styles.cardTitle} numberOfLines={1}>
              {selected.title}
            </Text>
            <Text style={styles.cardMeta} numberOfLines={1}>
              {selected.distance} away, {selected.ago}
            </Text>
          </View>
          <View style={styles.arrow}>
            <Icon name="next" size={20} color={brand.ink} />
          </View>
        </Pressable>
      ) : null}

      <FiltersSheet visible={open} onClose={() => setOpen(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: brand.bg },
  top: { position: "absolute", left: 0, right: 0, zIndex: 10 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 20,
  },
  searchWrap: { flex: 1, minWidth: 0 },

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
  chipText: { fontSize: 14, fontWeight: "700" },

  pin: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: brand.white,
  },
  pinSelected: {
    borderColor: brand.ink,
    borderWidth: 2,
  },
  cluster: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: brand.ink,
    borderWidth: 2,
    borderColor: brand.white,
    alignItems: "center",
    justifyContent: "center",
  },
  clusterText: { color: brand.white, fontSize: 15, fontWeight: "700" },

  locate: {
    position: "absolute",
    right: 20,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: brand.white,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },

  card: {
    position: "absolute",
    left: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: brand.white,
    borderRadius: 24,
    padding: 12,
    zIndex: 10,
  },
  iconWrap: {
    width: 88,
    height: 88,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: brand.yellow,
  },
  cardBody: { flex: 1, marginLeft: 14, minWidth: 0 },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: brand.ink,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 8,
  },
  badgeText: { color: brand.white, fontSize: 12, fontWeight: "700" },
  cardTitle: { fontSize: 16, fontWeight: "800", color: brand.ink },
  cardMeta: { marginTop: 4, fontSize: 13, color: brand.muted },
  arrow: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: brand.yellow,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
});
