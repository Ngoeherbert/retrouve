import { View, Text, StyleSheet } from 'react-native';
import { colors, radius } from '../../constants/theme';

const variants = {
  lost: { backgroundColor: colors.dangerSoft, color: colors.danger },
  found: { backgroundColor: colors.successSoft, color: colors.success },
  pending: { backgroundColor: colors.warningSoft, color: colors.warning },
  resolved: { backgroundColor: colors.successSoft, color: colors.success },
  default: { backgroundColor: colors.surfaceSecondary, color: colors.textSecondary },
};

export default function StatusBadge({ status = 'default', label }) {
  const variant = variants[status.toLowerCase()] || variants.default;
  const text = label || status.charAt(0).toUpperCase() + status.slice(1);

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
