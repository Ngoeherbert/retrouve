import { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { colors, radius, spacing } from '../../constants/theme';

export default function AppInput({
  label,
  error,
  left,
  right,
  style,
  ...props
}) {
  const [focused, setFocused] = useState(false);

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
          onFocus={(event) => {
            setFocused(true);
            props.onFocus?.(event);
          }}
          onBlur={(event) => {
            setFocused(false);
            props.onBlur?.(event);
          }}
          style={[styles.input, props.inputStyle]}
        />
        {right}
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: spacing.sm },
  label: { fontSize: 14, fontWeight: '600', color: colors.text },
  inputContainer: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
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
