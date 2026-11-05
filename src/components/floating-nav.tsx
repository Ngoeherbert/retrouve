import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Brand as brand } from "@/constants/theme";
import { Icon } from "@/components/icon";

export const NAV_HEIGHT = 68;

const ITEMS = [
  { key: "home", label: "Home", icon: "home" as const },
  { key: "search", label: "Search", icon: "search" as const },
  { key: "report", label: "New report", icon: "add" as const },
  { key: "messages", label: "Messages", icon: "chat" as const },
  { key: "profile", label: "Profile", icon: "profile" as const },
] as const;

export type NavKey = (typeof ITEMS)[number]["key"];

export function FloatingNav({
  active,
  onSelect,
}: {
  active: NavKey;
  onSelect: (key: NavKey) => void;
}) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.bar, { bottom: Math.max(insets.bottom, 16) }]}>
      {ITEMS.map((item) => {
        const selected = item.key === active;
        return (
          <Pressable
            key={item.key}
            accessibilityRole="tab"
            accessibilityLabel={item.label}
            accessibilityState={{ selected }}
            onPress={() => onSelect(item.key)}
            style={[styles.item, selected && styles.itemSelected]}
          >
            <Icon 
              name={item.icon}
              size={item.key === "report" ? 28 : 22} 
              color={selected ? brand.ink : brand.white} 
            />
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: "absolute",
    left: 20,
    right: 20,
    height: NAV_HEIGHT,
    borderRadius: NAV_HEIGHT / 2,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: brand.ink,
  },
  item: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  itemSelected: { backgroundColor: brand.yellow },
});
