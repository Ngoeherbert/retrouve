import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Pressable,
  TextInput,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { colors, spacing, typography } from "../../../constants/theme";
import { AppIcon, type AppIconName } from "../../../components/ui/AppIcons";

// Swap these for your own icon names (bell, search, camera, qr, sparkles, gift, pin, sliders) if you have them.
const ICONS = {
  bell: "notifications",
  search: "explore",
  filter: "settingsAlt",
  gift: "trophy",
  pin: "explore",
} satisfies Record<string, AppIconName>;

const quickActions: {
  id: string;
  label: string;
  icon: AppIconName;
  dark?: boolean;
}[] = [
  { id: "lost", label: "Report Lost", icon: "explore", dark: true },
  { id: "found", label: "Report Found", icon: "checkSolid" },
  { id: "qr", label: "QR Tags", icon: "searchAdd" },
  { id: "status", label: "Status Update", icon: "check" },
  { id: "ai", label: "AI Match", icon: "heart" },
];

const nearbyItems = [
  { id: "1", name: "AirPods Pro", place: "Central Park", distance: "0.4 Mi" },
  { id: "2", name: "Silver Ring", place: "5th Ave", distance: "0.8 Mi" },
  {
    id: "3",
    name: "Black Wallet",
    place: "Brooklyn Bridge Park",
    distance: "2.1 Mi",
  },
];

const categories = ["Popular", "Electronics", "Wallets", "Keys", "Bags"];

const shadows = {
  card: {
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
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

export default function HomeScreen() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Popular");

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Greeting */}
          <View style={styles.topRow}>
            <View style={styles.userRow}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>AM</Text>
              </View>
              <View>
                <Text style={styles.greeting}>Good Morning</Text>
                <Text style={styles.userName}>Alex Morgan</Text>
              </View>
            </View>
            <Pressable
              style={styles.bellButton}
              onPress={() => router.push("/notifications" as any)}
              accessibilityRole="button"
              accessibilityLabel="Notifications"
            >
              <AppIcon name={ICONS.bell} size={20} color={colors.text} />
              <View style={styles.bellDot} />
            </Pressable>
          </View>

          {/* Search */}
          <View style={styles.searchBar}>
            <AppIcon name={ICONS.search} size={18} color={colors.textMuted} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search items, brands, or locations..."
              placeholderTextColor={colors.textMuted}
              style={styles.searchInput}
              returnKeyType="search"
            />
            <Pressable
              style={styles.filterButton}
              onPress={() => {}}
              accessibilityRole="button"
              accessibilityLabel="Filters"
            >
              <AppIcon name={ICONS.filter} size={20} color={colors.text} />
            </Pressable>
          </View>

          {/* Quick actions */}
          <View style={styles.actionRow}>
            {quickActions.map((action) => (
              <Pressable
                key={action.id}
                style={styles.actionItem}
                onPress={() => {}}
                accessibilityRole="button"
                accessibilityLabel={action.label}
              >
                <View
                  style={[
                    styles.actionTile,
                    action.dark && styles.actionTileDark,
                  ]}
                >
                  <AppIcon
                    name={action.icon}
                    size={22}
                    color={action.dark ? colors.primary : colors.text}
                  />
                </View>
                <Text style={styles.actionLabel} numberOfLines={1}>
                  {action.label}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Rewards banner */}
          <View style={styles.banner}>
            <View style={styles.bannerText}>
              <View style={styles.bannerPill}>
                <Text style={styles.bannerPillText}>Rewards</Text>
              </View>
              <Text style={styles.bannerTitle}>
                Earn Rewards For{"\n"}Finding Items
              </Text>
              <Text style={styles.bannerSub}>
                Get up to $500 for every successful recovery.
              </Text>
            </View>
            <View style={styles.bannerGift}>
              <AppIcon name={ICONS.gift} size={26} color={colors.text} />
            </View>
          </View>

          {/* Nearby lost items */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Nearby Lost Items</Text>
              <Pressable
                onPress={() => {}}
                accessibilityRole="button"
                accessibilityLabel="See all nearby items"
              >
                <Text style={styles.seeAll}>See All</Text>
              </Pressable>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.itemsRow}
            >
              {nearbyItems.map((item) => (
                <Pressable
                  key={item.id}
                  style={styles.itemCard}
                  onPress={() => {}}
                  accessibilityRole="button"
                  accessibilityLabel={item.name}
                >
                  {/* Replace with <Image source={{ uri: item.imageUrl }} style={styles.itemImage} /> */}
                  <View style={styles.itemImage}>
                    <AppIcon
                      name="package"
                      size={32}
                      color={colors.textMuted}
                    />
                  </View>
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName} numberOfLines={1}>
                      {item.name}
                    </Text>
                    <View style={styles.itemMeta}>
                      <AppIcon
                        name={ICONS.pin}
                        size={12}
                        color={colors.textMuted}
                      />
                      <Text style={styles.itemMetaText} numberOfLines={1}>
                        {item.place}
                      </Text>
                      <Text style={styles.itemMetaText}>•</Text>
                      <Text style={styles.itemMetaText}>{item.distance}</Text>
                    </View>
                  </View>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          {/* Trending categories */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Trending Categories</Text>
              <Pressable
                onPress={() => {}}
                accessibilityRole="button"
                accessibilityLabel="See all categories"
              >
                <Text style={styles.seeAll}>See All</Text>
              </Pressable>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.chipsRow}
            >
              {categories.map((cat) => {
                const active = cat === category;
                return (
                  <Pressable
                    key={cat}
                    style={[styles.chip, active && styles.chipActive]}
                    onPress={() => setCategory(cat)}
                    accessibilityRole="button"
                    accessibilityState={{ selected: active }}
                  >
                    <Text
                      style={[styles.chipText, active && styles.chipTextActive]}
                    >
                      {cat}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
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
    paddingBottom: 120,
    gap: spacing.lg,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: radius.full,
    backgroundColor: colors.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: typography.md,
    fontWeight: "700",
    color: colors.primary,
  },
  greeting: {
    fontSize: typography.xs,
    color: colors.textMuted,
  },
  userName: {
    fontSize: typography.lg,
    fontWeight: "700",
    color: colors.text,
  },
  bellButton: {
    width: 44,
    height: 44,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    ...shadows.card,
  },
  bellDot: {
    position: "absolute",
    top: 10,
    right: 11,
    width: 8,
    height: 8,
    borderRadius: radius.full,
    backgroundColor: colors.danger,
    borderWidth: 1.5,
    borderColor: colors.surface,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    height: 56,
    paddingLeft: spacing.md,
    paddingRight: spacing.xs,
    backgroundColor: colors.surface,
    borderRadius: radius.full,
    ...shadows.card,
  },
  searchInput: {
    flex: 1,
    fontSize: typography.sm,
    color: colors.text,
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionItem: {
    flex: 1,
    alignItems: "center",
    gap: spacing.xs,
  },
  actionTile: {
    width: 54,
    height: 54,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    ...shadows.card,
  },
  actionTileDark: {
    backgroundColor: "#14161F",
  },
  actionLabel: {
    fontSize: 10,
    color: colors.textSecondary,
    textAlign: "center",
  },
  banner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: "#2A2410",
    overflow: "hidden",
  },
  bannerText: {
    flex: 1,
    gap: spacing.xs,
  },
  bannerPill: {
    alignSelf: "flex-start",
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.full,
    backgroundColor: "rgba(255,255,255,0.12)",
  },
  bannerPillText: {
    fontSize: 10,
    fontWeight: "600",
    color: colors.primary,
  },
  bannerTitle: {
    fontSize: typography.md,
    fontWeight: "700",
    color: "#FFFFFF",
    lineHeight: 20,
  },
  bannerSub: {
    fontSize: 11,
    color: "rgba(255,255,255,0.6)",
  },
  bannerGift: {
    width: 52,
    height: 52,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  section: {
    gap: spacing.md,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontSize: typography.md,
    fontWeight: "700",
    color: colors.text,
  },
  seeAll: {
    fontSize: typography.xs,
    color: colors.textMuted,
  },
  itemsRow: {
    gap: spacing.md,
  },
  itemCard: {
    width: 170,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    overflow: "hidden",
    ...shadows.card,
  },
  itemImage: {
    height: 100,
    backgroundColor: colors.surfaceSecondary,
    alignItems: "center",
    justifyContent: "center",
  },
  itemInfo: {
    padding: spacing.sm,
    gap: 4,
  },
  itemName: {
    fontSize: typography.sm,
    fontWeight: "700",
    color: colors.text,
  },
  itemMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  itemMetaText: {
    fontSize: 11,
    color: colors.textMuted,
    flexShrink: 1,
  },
  chipsRow: {
    gap: spacing.sm,
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    ...shadows.card,
  },
  chipActive: {
    backgroundColor: colors.primary,
  },
  chipText: {
    fontSize: typography.sm,
    fontWeight: "500",
    color: colors.text,
  },
  chipTextActive: {
    fontWeight: "700",
  },
});
