import { Pressable, StyleSheet, Text } from "react-native";

import { Brand as brand } from "@/constants/theme";

type Props = {
  label: string;
  selected?: boolean;
  onPress: () => void;
};

export function Chip({ label, selected = false, onPress }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={[styles.chip, selected && styles.chipOn]}
    >
      <Text style={[styles.label, selected && styles.labelOn]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    height: 38,
    paddingHorizontal: 17,
    borderRadius: 19,
    justifyContent: "center",
    backgroundColor: brand.white,
  },
  chipOn: { backgroundColor: brand.ink },
  label: { fontSize: 15, fontWeight: "700", color: brand.ink },
  labelOn: { color: brand.white },
});