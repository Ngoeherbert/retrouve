import { View, Text, StyleSheet } from 'react-native';
import { colors, radius } from '../../constants/theme';

const variants = {
  lost: { backgroundColor: colors.dangerSoft, color: colors.danger },
  found: { backgroundColor: colors.successSoft, color: colors.success },
  pending: { backgroundColor: colors.warningSoft, color: colors.warning },
  resolved: { backgroundColor: colors.successSoft, color: colors.success },
  default: {
    backgroundColor: colors.surfaceSecondary,
    color: colors.textSecondary,
  },
};

type StatusVariant = keyof typeof variants;

interface StatusBadgeProps {
  status?: string;
  label?: string;
}

export default function StatusBadge({
  status = 'default',
  label,
}: StatusBadgeProps) {
  const normalizedStatus = status.toLowerCase();
  const variantKey: StatusVariant =
    normalizedStatus in variants
      ? (normalizedStatus as StatusVariant)
      : 'default';

  const variant = variants[variantKey];
  const text =
    label ?? (status === 'default'
      ? 'Default'
      : status.charAt(0).toUpperCase() + status.slice(1));

  return (
    <View style={[styles.badge, { backgroundColor: variant.backgroundColor }]}>
      <Text style={[styles.text, { color: variant.color }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radius.full,
  },
  text: { fontSize: 12, fontWeight: '700' },
});
