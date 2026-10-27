import type { ReactNode } from "react";
import { Pressable, StyleSheet } from "react-native";
import type { StyleProp, ViewStyle } from "react-native";
import { colors, radius } from "../../constants/theme";

interface IconButtonProps {
  children: ReactNode;
  onPress: () => void;
  glass?: boolean;
  size?: number;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel: string;
}

export default function IconButton({
  children,
  onPress,
  glass = false,
  size = 44,
  style,
  accessibilityLabel,
}: IconButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { width: size, height: size, borderRadius: radius.full },
        glass ? styles.glass : styles.solid,
        pressed && styles.pressed,
        style,
      ]}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  solid: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
  glass: {
    backgroundColor: colors.glass,
    borderColor: colors.glassBorder,
  },
  pressed: { opacity: 0.75 },
});
