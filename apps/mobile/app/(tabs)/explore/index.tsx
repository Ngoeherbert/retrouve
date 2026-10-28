import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '../../../constants/theme';
import { AppIcon, type AppIconName } from '../../../components/ui/AppIcons';

const categories = [
  'All',
  'Electronics',
  'Wallets',
  'Keys',
  'Accessories',
  'Bags',
  'Documents',
  'Other',
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

const locations: { name: string; icon: AppIconName }[] = [
  { name: 'Central Park', icon: 'location' },
  { name: 'Downtown', icon: 'location' },
  { name: 'University', icon: 'location' },
  { name: 'Shopping Mall', icon: 'location' },
  { name: 'Airport', icon: 'location' },
  { name: 'Library', icon: 'location' },
];

export default function ExploreScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Explore</Text>
            <Text style={styles.subtitle}>Discover items near you</Text>
          </View>

          <View style={styles.searchBar}>
            <AppIcon name="explore" size={22} color={colors.textMuted} />
            <Text style={styles.searchPlaceholder}>Search items, brands, or locations...</Text>
          </View>

          <View style={styles.categoryScroll}>
            {categories.map((category, index) => (
              <View
                key={category}
                style={[
                  styles.categoryChip,
                  index === 0 && styles.categoryChipActive,
                ]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    index === 0 && styles.categoryTextActive,
                  ]}
                >
                  {category}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Items Nearby</Text>
            <View style={styles.placeholderCard}>
              <AppIcon name="explore" size={48} color={colors.primary} />
              <Text style={styles.placeholderTitle}>Explore Screen</Text>
              <Text style={styles.placeholderText}>
                This is the explore screen placeholder. Replace with actual item listings.
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Popular Locations</Text>
            <View style={styles.locationGrid}>
              {locations.map((location) => (
                <View key={location.name} style={styles.locationItem}>
                  <AppIcon name={location.icon} size={20} color={colors.primary} />
                  <Text style={styles.locationName}>{location.name}</Text>
                </View>
              ))}
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
    paddingTop: spacing.lg,
    paddingBottom: 100,
    gap: spacing.lg,
  },
  header: {
    gap: spacing.xs,
  },
  title: {
    fontSize: typography.xxl,
    fontWeight: '800',
    color: colors.text,
  },
  subtitle: {
    fontSize: typography.md,
    color: colors.textSecondary,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    gap: spacing.sm,
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: typography.md,
    color: colors.textMuted,
  },
  categoryScroll: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  categoryChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.full,
    ...shadows.card,
  },
  categoryChipActive: {
    backgroundColor: colors.primary,
  },
  categoryText: {
    fontSize: typography.sm,
    fontWeight: '600',
    color: colors.text,
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  section: {
    gap: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.lg,
    fontWeight: '700',
    color: colors.text,
  },
  placeholderCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.xl,
    alignItems: 'center',
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
  locationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  locationItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    ...shadows.card,
  },
  locationName: {
    fontSize: typography.sm,
    fontWeight: '600',
    color: colors.text,
  },
});