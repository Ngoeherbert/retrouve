import { View, Text, ScrollView, StyleSheet, SafeAreaView, Pressable } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, spacing, typography } from '../../../constants/theme';
import { AppIcon, type AppIconName } from '../../../components/ui/AppIcons';

interface ReportType {
  id: string;
  label: string;
  icon: AppIconName;
  description: string;
}

interface QuickOption {
  id: string;
  label: string;
  icon: AppIconName;
}

const reportTypes: ReportType[] = [
  { id: 'lost', label: 'Report Lost Item', icon: 'explore', description: 'You lost something and want help finding it' },
  { id: 'found', label: 'Report Found Item', icon: 'checkSolid', description: 'You found something and want to return it' },
];

const quickOptions: QuickOption[] = [
  { id: 'scan', label: 'Scan QR Tag', icon: 'searchAdd' },
  { id: 'order', label: 'Order QR Tags', icon: 'package' },
];

const shadows = {
  card: {
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
};

const radius = {
  sm: 8,
  md: 14,
  lg: 20,
  xl: 28,
  full: 999,
};

export default function CreateScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Pressable onPress={() => router.back()} style={styles.closeButton} accessibilityLabel="Close">
              <AppIcon name="cancel" size={20} color={colors.text} strokeWidth={2} />
            </Pressable>
            <Text style={styles.title}>Report an Item</Text>
            <View style={styles.headerSpacer} />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>What would you like to report?</Text>
            <View style={styles.optionsGrid}>
              {reportTypes.map((type) => (
                <Pressable
                  key={type.id}
                  style={styles.optionCard}
                  onPress={() => {
                    // Navigate to specific report form
                  }}
                  accessibilityRole="button"
                  accessibilityLabel={type.label}
                >
                  <View style={styles.optionIcon}>
                    <AppIcon name={type.icon} size={24} color={colors.primary} />
                  </View>
                  <Text style={styles.optionLabel}>{type.label}</Text>
                  <Text style={styles.optionDescription}>{type.description}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Options</Text>
            <View style={styles.quickOptions}>
              {quickOptions.map((option) => (
                <Pressable key={option.id} style={styles.quickOption} onPress={() => {}} accessibilityRole="button" accessibilityLabel={option.label}>
                  <AppIcon name={option.icon} size={22} color={colors.primary} />
                  <Text style={styles.quickOptionLabel}>{option.label}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.placeholderCard}>
              <AppIcon name="edit" size={48} color={colors.primary} />
              <Text style={styles.placeholderTitle}>Create Modal Screen</Text>
              <Text style={styles.placeholderText}>
                This is the create/report screen placeholder. Replace with actual forms.
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: 100,
    gap: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: typography.xl,
    fontWeight: '700',
    color: colors.text,
    flex: 1,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  section: {
    gap: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.md,
    fontWeight: '700',
    color: colors.text,
    paddingHorizontal: spacing.md,
  },
  optionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
    paddingHorizontal: spacing.md,
  },
  optionCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    gap: spacing.sm,
    ...shadows.card,
  },
  optionIcon: {
    width: 56,
    height: 56,
    borderRadius: radius.full,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionLabel: {
    fontSize: typography.md,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
  optionDescription: {
    fontSize: typography.xs,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  quickOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
    paddingHorizontal: spacing.md,
  },
  quickOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    ...shadows.card,
  },
  quickOptionLabel: {
    fontSize: typography.sm,
    fontWeight: '600',
    color: colors.text,
  },
  placeholderCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.xl,
    alignItems: 'center',
    marginTop: spacing.lg,
    ...shadows.card,
  },
  placeholderTitle: {
    fontSize: typography.xl,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  placeholderText: {
    fontSize: typography.md,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});