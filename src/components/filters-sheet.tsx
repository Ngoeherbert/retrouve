import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/components/button";
import { Chip } from "@/components/chip";
import { RangeSlider } from "@/components/range-slider";
import { Brand as brand } from "@/constants/theme";

export const CATEGORIES = [
  "All",
  "Wallets",
  "Bags",
  "Phones",
  "Keys",
  "Documents",
] as const;
export const POSTED = ["Today", "This week", "This month", "Any time"] as const;

export type Filters = {
  category: (typeof CATEGORIES)[number];
  distance: number;
  posted: (typeof POSTED)[number];
};

export const DEFAULT_FILTERS: Filters = {
  category: "All",
  distance: 5,
  posted: "This week",
};

type Props = {
  visible: boolean;
  onClose: () => void;
  value?: Filters;
  onApply?: (filters: Filters) => void;
};

export function FiltersSheet({ visible, onClose, value = DEFAULT_FILTERS, onApply }: Props) {
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const [category, setCategory] = useState<Filters["category"]>(value.category);
  const [distance, setDistance] = useState(value.distance);
  const [posted, setPosted] = useState<Filters["posted"]>(value.posted);
  const translateY = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    if (visible) {
      setCategory(value.category);
      setDistance(value.distance);
      setPosted(value.posted);
      Animated.timing(translateY, {
        toValue: 0,
        duration: 280,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: height,
        duration: 240,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }).start();
    }
  }, [visible, height, translateY, value]);

  const apply = () => {
    onApply?.({ category, distance, posted });
    onClose();
  };

  const reset = () => {
    setCategory(DEFAULT_FILTERS.category);
    setDistance(DEFAULT_FILTERS.distance);
    setPosted(DEFAULT_FILTERS.posted);
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <Animated.View
        style={[
          styles.sheet,
          {
            paddingBottom: Math.max(insets.bottom, 16) + 10,
            transform: [{ translateY }],
          },
        ]}
      >
        <View style={styles.handle} />
        <Text style={styles.title}>Filters</Text>

        <Text style={styles.section}>Category</Text>
        <View style={styles.chips}>
          {CATEGORIES.map((c) => (
            <Chip key={c} label={c} selected={category === c} onPress={() => setCategory(c)} />
          ))}
        </View>

        <View style={styles.row}>
          <Text style={styles.sectionInline}>Distance</Text>
          <Text style={styles.value}>{distance} km</Text>
        </View>
        <RangeSlider value={distance} min={1} max={20} onChange={setDistance} />

        <Text style={styles.section}>Posted</Text>
        <View style={styles.chips}>
          {POSTED.map((p) => (
            <Chip key={p} label={p} selected={posted === p} onPress={() => setPosted(p)} />
          ))}
        </View>

        <View style={styles.actions}>
          <View style={styles.actionHalf}>
            <Button label="Reset" tone="white" onPress={reset} />
          </View>
          <View style={styles.actionHalf}>
            <Button label="Apply filters" onPress={apply} />
          </View>
        </View>
      </Animated.View>
    </Modal>
  );
}

export default FiltersSheet;

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: "rgba(11,15,20,0.4)" },
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: brand.bg,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  handle: {
    alignSelf: "center",
    width: 48,
    height: 5,
    borderRadius: 3,
    backgroundColor: brand.ink,
    opacity: 0.16,
  },
  title: {
    marginTop: 14,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "800",
    color: brand.ink,
  },
  section: {
    marginTop: 22,
    marginBottom: 12,
    fontSize: 16,
    fontWeight: "800",
    color: brand.ink,
  },
  sectionInline: { fontSize: 16, fontWeight: "800", color: brand.ink },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 22,
  },
  value: { fontSize: 15, fontWeight: "700", color: brand.ink },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  actions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 28,
  },
  actionHalf: { flex: 1 },
});
