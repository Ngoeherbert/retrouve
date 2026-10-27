import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { colors, spacing, radius } from '../constants/theme';

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logo}>retrouve</Text>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>LOST. FOUND. REUNITED.</Text>
        </View>

        <Text style={styles.title}>
          Every lost item{'\n'}has a way home.
        </Text>

        <Text style={styles.subtitle}>
          A simpler way to report lost items, discover found belongings,
          and reconnect people with what matters.
        </Text>

        <Pressable
          style={styles.primaryButton}
          onPress={() => router.push('/(auth)/login')}
        >
          <Text style={styles.primaryButtonText}>Get started</Text>
        </Pressable>

        <Pressable
          style={styles.secondaryButton}
          onPress={() => router.push('/(tabs)')}
        >
          <Text style={styles.secondaryButtonText}>Explore Retrouve</Text>
        </Pressable>

        <Text style={styles.footer}>
          Helping belongings find their way home.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    padding: spacing.lg,
  },
  content: {
    width: "100%",
    maxWidth: 460,
    alignSelf: "center",
  },
  logo: {
    fontSize: 34,
    fontWeight: "800",
    letterSpacing: -1.5,
    color: colors.primary,
    marginBottom: spacing.xl,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#DBEAFE",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radius.full,
    marginBottom: spacing.lg,
  },
  badgeText: {
    color: colors.primaryPressed,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
  },
  title: {
    color: colors.text,
    fontSize: 38,
    fontWeight: "800",
    letterSpacing: -1.5,
    lineHeight: 45,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 16,
    lineHeight: 25,
    marginTop: spacing.md,
    marginBottom: spacing.xl,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: 17,
    borderRadius: radius.md,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  secondaryButton: {
    paddingVertical: 16,
    alignItems: "center",
    marginTop: spacing.sm,
  },
  secondaryButtonText: {
    color: colors.text,
    fontWeight: "700",
    fontSize: 15,
  },
  footer: {
    color: colors.textSecondary,
    fontSize: 12,
    textAlign: "center",
    marginTop: spacing.xl,
  },
});
