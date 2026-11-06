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
  /** Number shown on the button: "Show 12 results" */
  resultCount?: number;
};

export function FiltersSheet({
  visible,
  onClose,
  value = DEFAULT_FILTERS,
  onApply,
  resultCount,
}: Props) {
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const [category, setCategory] = useState<Filters["category"]>(value.category);
  const [distance, setDistance] = useState(value.distance);
  const [posted, setPosted] = useState<Filters["posted"]>(value.posted);
  const [translateY] = useState(() => new Animated.Value(height));
  const prevVisible = useRef(visible);

  useEffect(() => {
    const opened = visible && !prevVisible.current;
    prevVisible.current = visible;
    if (opened) {
      setCategory(value.category);  
      setDistance(value.distance);
      setPosted(value.posted);
      Animated.timing(translateY, {
        toValue: 0,
        duration: 280,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    } else if (!visible) {
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

  const applyLabel =
    resultCount === undefined
      ? "Show results"
      : `Show ${resultCount} ${resultCount === 1 ? "result" : "results"}`;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose} />

      <Animated.View
        style={[
          styles.sheet,
          {
            height: Math.round(height * 0.76),
            paddingBottom: Math.max(insets.bottom, 16) + 10,
            transform: [{ translateY }],
          },
        ]}
      >
        <View style={styles.handle} />

        {/* Title + Reset */}
        <View style={styles.header}>
          <Text style={styles.title}>Filters</Text>
          <Pressable accessibilityRole="button" onPress={reset} hitSlop={10}>
            <Text style={styles.reset}>Reset</Text>
          </Pressable>
        </View>

        <View style={styles.body}>
          <Text style={styles.section}>Category</Text>
          <View style={styles.chips}>
            {CATEGORIES.map((c) => (
              <Chip
                key={c}
                label={c}
                selected={category === c}
                onPress={() => setCategory(c)}
              />
            ))}
          </View>

          <Text style={[styles.section, styles.sectionGap]}>Distance</Text>
          <View style={styles.row}>
            <Text style={styles.within}>Within</Text>
            <Text style={styles.value}>{distance} km</Text>
          </View>
          <RangeSlider
            value={distance}
            min={1}
            max={20}
            onChange={setDistance}
          />

          <Text style={[styles.section, styles.sectionGap]}>Posted</Text>
          <View style={styles.chips}>
            {POSTED.map((p) => (
              <Chip
                key={p}
                label={p}
                selected={posted === p}
                onPress={() => setPosted(p)}
              />
            ))}
          </View>
        </View>

        {/* Pinned primary action */}
        <Pressable
          accessibilityRole="button"
          onPress={apply}
          className="h-[54px] rounded-[27px] items-center justify-center bg-[#FFD23F]"
          style={({ pressed }) => pressed && { opacity: 0.9 }}
        >
          <Text className="text-[17px] font-extrabold" style={{ color: brand.ink }}>
            {applyLabel}
          </Text>
        </Pressable>
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
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: brand.ink,
    opacity: 0.16,
  },

  header: {
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: { fontSize: 28, fontWeight: "800", color: brand.ink },
  reset: { fontSize: 15, fontWeight: "700", color: brand.ink },

  body: { flex: 1, marginTop: 18 },
  section: { fontSize: 13, fontWeight: "700", color: brand.ink },
  sectionGap: { marginTop: 22 },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginTop: 12 },

  row: {
    marginTop: 8,
    marginBottom: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  within: { fontSize: 17, fontWeight: "600", color: brand.ink },
  value: { fontSize: 17, fontWeight: "800", color: brand.ink },
});
