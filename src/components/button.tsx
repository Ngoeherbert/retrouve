import type { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Brand as brand } from "@/constants/theme";

type Props = {
  label: string;
  onPress: () => void;
  tone?: "yellow" | "white";
  disabled?: boolean;
  leading?: ReactNode;
};

export function Button({
  label,
  onPress,
  tone = "yellow",
  disabled,
  leading,
}: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: tone === "yellow" ? brand.yellow : brand.white },
        pressed && styles.pressed,
      ]}
    >
      {leading ? <View style={styles.leading}>{leading}</View> : null}
      <Text style={styles.label}>{label}</Text>
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
  pressed: { transform: [{ scale: 0.98 }], opacity: 0.92 },
  leading: { marginRight: 10 },
  label: {
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: -0.2,
    color: brand.ink,
  },
});
