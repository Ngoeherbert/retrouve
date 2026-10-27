import { View, Text, StyleSheet } from 'react-native';
import type { ReactNode } from 'react';
import { colors, spacing } from '../../constants/theme';

interface AppHeaderProps {
  title: string;
  subtitle?: string;
  right?: ReactNode;
}

export default function AppHeader({ title, subtitle, right }: AppHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {right}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    paddingVertical: spacing.md,
  },
  textContainer: { flex: 1, gap: 4 },
  title: {
    fontSize: 25,
    fontWeight: '800',
    letterSpacing: -0.7,
    color: colors.text,
  },
  subtitle: { fontSize: 14, color: colors.textSecondary, lineHeight: 20 },
});
