import { useState } from "react";
import type { ReactNode } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import type {
  TextInputProps,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { colors, radius, spacing } from "../../constants/theme";

interface AppInputProps extends TextInputProps {
  label?: string;
  error?: string;
  left?: ReactNode;
  right?: ReactNode;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
}

export default function AppInput({
  label,
  error,
  left,
  right,
  style,
  inputStyle,
  onFocus,
  onBlur,
  ...props
}: AppInputProps) {
  const [focused, setFocused] = useState(false);

  const handleFocus: NonNullable<TextInputProps["onFocus"]> = (event) => {
    setFocused(true);
    onFocus?.(event);
  };

  const handleBlur: NonNullable<TextInputProps["onBlur"]> = (event) => {
    setFocused(false);
    onBlur?.(event);
  };

  return (
    <View style={[styles.wrapper, style]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <View
        style={[
          styles.inputContainer,
          focused && styles.focused,
          error && styles.invalid,
        ]}
      >
        {left}
        <TextInput
          {...props}
          placeholderTextColor={colors.textMuted}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={[styles.input, inputStyle]}
        />
        {right}
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: spacing.sm },
  label: { fontSize: 14, fontWeight: "600", color: colors.text },
  inputContainer: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
  },
  focused: { borderColor: colors.primary },
  invalid: { borderColor: colors.danger },
  input: {
    flex: 1,
    minWidth: 0,
    paddingVertical: 13,
    color: colors.text,
    fontSize: 15,
  },
  error: { color: colors.danger, fontSize: 12 },
});
