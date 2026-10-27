import {
  ActivityIndicator,
  Pressable,
  Text,
  StyleSheet,
} from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import { colors, radius, spacing } from '../../constants/theme';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

interface AppButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

export default function AppButton({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
}: AppButtonProps) {
  const secondary = variant === 'secondary';
  const ghost = variant === 'ghost';
  const danger = variant === 'danger';

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        secondary && styles.secondary,
        ghost && styles.ghost,
        danger && styles.danger,
        (disabled || loading) && styles.disabled,
        pressed && !disabled && styles.pressed,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={secondary || ghost ? colors.primary : '#FFFFFF'}
        />
      ) : (
        <Text
          style={[
            styles.label,
            (secondary || ghost) && styles.secondaryLabel,
          ]}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 52,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondary: { backgroundColor: colors.primarySoft },
  ghost: { backgroundColor: 'transparent' },
  danger: { backgroundColor: colors.danger },
  disabled: { opacity: 0.5 },
  pressed: { opacity: 0.82, transform: [{ scale: 0.99 }] },
  label: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
  secondaryLabel: { color: colors.primary },
});
