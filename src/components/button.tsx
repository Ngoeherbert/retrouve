import { useState, type ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Brand as brand } from "@/constants/theme";

const BACKGROUNDS = {
  yellow: brand.yellow,
  white: brand.white,
  grey: brand.bg,
} as const;

type Props = {
  label: string;
  onPress: () => void;
  tone?: "yellow" | "white" | "grey";
  compact?: boolean;
  disabled?: boolean;
  leading?: ReactNode;
};

export function Button({
  label,
  onPress,
  tone = "yellow",
  compact = false,
  disabled,
  leading,
}: Props) {
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={[
        styles.button,
        { backgroundColor: BACKGROUNDS[tone] },
        compact && styles.compact,
        pressed && styles.pressed,
      ]}
    >
      {leading ? <View style={styles.leading}>{leading}</View> : null}
      <Text style={[styles.label, compact && styles.labelCompact]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  compact: { height: 42, borderRadius: 21 },
  pressed: { transform: [{ scale: 0.97 }], opacity: 0.8 },
  leading: { marginRight: 10 },
  label: {
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: -0.2,
    color: brand.ink,
  },
  labelCompact: { fontSize: 15 },
});
