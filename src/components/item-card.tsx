import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
} from "react-native";

import { Brand as brand } from "@/constants/theme";

export type ItemStatus = "Found" | "Lost";

export type Item = {
  id: string;
  title: string;
  location: string;
  time: string;
  status: ItemStatus;
  tint: string;
  circle: string;
};

type Props = {
  item: Item;
  /** Defaults to navigating to /item/[id] */
  onPress?: (item: Item) => void;
  /** Override layout, e.g. width when used outside a 2-column grid */
  style?: ViewStyle;
};

export function ItemCard({ item, onPress, style }: Props) {
  const handlePress = () => {
    if (onPress) onPress(item);
    else router.push({ pathname: "/item/[id]", params: { id: item.id } });
  };

  return (
    <Pressable
      accessibilityRole="button"
      onPress={handlePress}
      style={({ pressed }) => [styles.card, style, pressed && styles.pressed]}
    >
      <View style={[styles.tile, { backgroundColor: item.tint }]}>
        <View style={[styles.circle, { backgroundColor: item.circle }]}>
          <Ionicons name="card-outline" size={28} color={brand.muted} />
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.status}</Text>
        </View>
      </View>
      <Text style={styles.title} numberOfLines={1}>
        {item.title}
      </Text>
      <Text style={styles.meta} numberOfLines={1}>
        {item.location}, {item.time}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { width: "100%", flexGrow: 0, flexShrink: 1, marginBottom: 14 },
  pressed: { opacity: 0.9 },
  tile: {
    width: "100%",
    aspectRatio: 1.06,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    width: 84,
    height: 84,
    borderRadius: 42,
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    position: "absolute",
    top: 10,
    left: 14,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    backgroundColor: brand.white,
  },
  badgeText: { fontSize: 12, fontWeight: "700", color: brand.ink },
  title: {
    marginTop: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    fontWeight: "800",
    color: brand.ink,
  },
  meta: {
    paddingHorizontal: 10,
    marginTop: 2,
    fontSize: 13,
    color: brand.muted,
  },
});
