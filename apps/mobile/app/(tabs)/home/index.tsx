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

// Swap these for your own icon names (bell, search, camera, qr, sparkles, gift, pin, sliders, calendar, clock) if you have them.
const ICONS = {
  bell: "notifications",
  search: "explore",
  filter: "settingsAlt",
  gift: "trophy",
  pin: "explore",
  calendar: "package", // TODO: replace with a calendar icon
  clock: "check", // TODO: replace with a clock icon
} satisfies Record<string, AppIconName>;

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

type TrendingItem = {
  id: string;
  finderId: string;
  category: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  finderName: string;
  finderInfo: string;
  popular?: boolean;
};

const trendingItems: TrendingItem[] = [
  {
    id: "t1",
    finderId: "finder-meenal",
    category: "Bags",
    title: "Duffle Bag",
    description:
      "Brown colored duffle bag found at the ground. Message me if you are the owner.",
    date: "05 Spt",
    time: "07:55 PM",
    location: "College ground",
    finderName: "Meenal Parekh",
    finderInfo: "Btech I.T 2nd year",
    popular: true,
  },
  {
    id: "t2",
    finderId: "finder-daniel",
    category: "Electronics",
    title: "AirPods Pro",
    description:
      "White AirPods Pro case found near the fountain. Describe the engraving to claim it.",
    date: "12 Oct",
    time: "10:20 AM",
    location: "Central Park",
    finderName: "Daniel Reyes",
    finderInfo: "Visitor",
    popular: true,
  },
  {
    id: "t3",
    finderId: "finder-priya",
    category: "Wallets",
    title: "Black Wallet",
    description:
      "Black leather wallet with a few cards inside. Please verify the name on the cards.",
    date: "20 Oct",
    time: "04:10 PM",
    location: "Brooklyn Bridge Park",
    finderName: "Priya Nair",
    finderInfo: "Local resident",
  },
  {
    id: "t4",
    finderId: "finder-tom",
    category: "Keys",
    title: "Car Keys",
    description:
      "Set of three keys on a blue keychain, found on a bench by the entrance.",
    date: "24 Oct",
    time: "08:45 AM",
    location: "Union Square",
    finderName: "Tom Becker",
    finderInfo: "Security staff",
  },
];

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

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function TrendingCard({
  item,
  onChat,
}: {
  item: TrendingItem;
  onChat: () => void;
}) {
  return (
    <View style={styles.trendCard}>
      <View style={styles.trendBody}>
        <View style={styles.trendTop}>
          {/* Replace with <Image source={{ uri: item.imageUrl }} style={styles.trendImage} /> */}
          <View style={styles.trendImage}>
            <AppIcon name="package" size={32} color={colors.textMuted} />
          </View>
          <View style={styles.trendInfo}>
            <Text style={styles.trendTitle} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.trendDescription} numberOfLines={3}>
              {item.description}
            </Text>
          </View>
        </View>

        <View style={styles.trendMetaRow}>
          <View style={styles.trendMeta}>
            <AppIcon name={ICONS.calendar} size={13} color={colors.textMuted} />
            <Text style={styles.trendMetaText}>{item.date}</Text>
          </View>
          <View style={styles.trendMeta}>
            <AppIcon name={ICONS.clock} size={13} color={colors.textMuted} />
            <Text style={styles.trendMetaText}>{item.time}</Text>
          </View>
          <View style={[styles.trendMeta, styles.trendMetaLocation]}>
            <AppIcon name={ICONS.pin} size={13} color={colors.textMuted} />
            <Text style={styles.trendMetaText} numberOfLines={1}>
              {item.location}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.finderRow}>
        <View style={styles.finderAvatar}>
          <Text style={styles.finderAvatarText}>
            {initials(item.finderName)}
          </Text>
        </View>
        <View style={styles.finderText}>
          <Text style={styles.finderName} numberOfLines={1}>
            {item.finderName}
          </Text>
          <Text style={styles.finderInfo} numberOfLines={1}>
            {item.finderInfo}
          </Text>
        </View>
        <Pressable
          style={styles.chatButton}
          onPress={onChat}
          accessibilityRole="button"
          accessibilityLabel={`Chat with ${item.finderName}`}
        >
          <Text style={styles.chatButtonText}>Chat</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Popular");

  const visibleTrending = trendingItems.filter((item) =>
    category === "Popular" ? item.popular : item.category === category,
  );

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

          {/* Rewards banner */}
          <View style={styles.banner}>
            <View style={styles.bannerGlowLarge} pointerEvents="none" />
            <View style={styles.bannerGlowSmall} pointerEvents="none" />
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
              <AppIcon name={ICONS.gift} size={30} color={colors.text} />
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

            {visibleTrending.length > 0 ? (
              <View style={styles.trendList}>
                {visibleTrending.map((item) => (
                  <TrendingCard
                    key={item.id}
                    item={item}
                    onChat={() =>
                      router.push(
                        `/(tabs)/messages/chat/${item.finderId}?name=${encodeURIComponent(item.finderName)}&itemTitle=${encodeURIComponent(item.title)}` as any,
                      )
                    }
                  />
                ))}
              </View>
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyTitle}>No {category} items yet</Text>
                <Text style={styles.emptyText}>
                  Found something? Report it so the owner can reach you.
                </Text>
              </View>
            )}
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
  banner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
    minHeight: 132,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: "#2A2410",
    overflow: "hidden",
  },
  bannerGlowLarge: {
    position: "absolute",
    right: -40,
    bottom: -60,
    width: 180,
    height: 180,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    opacity: 0.16,
  },
  bannerGlowSmall: {
    position: "absolute",
    right: 40,
    top: -30,
    width: 80,
    height: 80,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    opacity: 0.1,
  },
  bannerText: {
    flex: 1,
    gap: spacing.sm,
  },
  bannerPill: {
    alignSelf: "flex-start",
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    borderRadius: radius.full,
    backgroundColor: "rgba(255,255,255,0.12)",
  },
  bannerPillText: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.primary,
  },
  bannerTitle: {
    fontSize: typography.lg,
    fontWeight: "700",
    color: "#FFFFFF",
    lineHeight: 24,
  },
  bannerSub: {
    fontSize: 12,
    lineHeight: 17,
    color: "rgba(255,255,255,0.65)",
  },
  bannerGift: {
    width: 60,
    height: 60,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
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

  // Trending item cards
  trendList: {
    gap: spacing.md,
  },
  trendCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    overflow: "hidden",
    ...shadows.card,
  },
  trendBody: {
    padding: spacing.sm,
    gap: spacing.sm,
  },
  trendTop: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  trendImage: {
    width: 112,
    height: 96,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceSecondary,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  trendInfo: {
    flex: 1,
    gap: 4,
  },
  trendTitle: {
    fontSize: typography.md,
    fontWeight: "700",
    color: colors.text,
  },
  trendDescription: {
    fontSize: 12,
    lineHeight: 17,
    color: colors.textSecondary,
  },
  trendMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  trendMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  trendMetaLocation: {
    flexShrink: 1,
  },
  trendMetaText: {
    fontSize: 11,
    color: colors.textSecondary,
    flexShrink: 1,
  },
  finderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    backgroundColor: colors.primarySoft,
  },
  finderAvatar: {
    width: 36,
    height: 36,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  finderAvatarText: {
    fontSize: typography.xs,
    fontWeight: "700",
    color: colors.text,
  },
  finderText: {
    flex: 1,
  },
  finderName: {
    fontSize: typography.sm,
    fontWeight: "700",
    color: colors.text,
  },
  finderInfo: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  chatButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
  },
  chatButtonText: {
    fontSize: typography.xs,
    fontWeight: "700",
    color: colors.text,
  },
  emptyState: {
    alignItems: "center",
    gap: 4,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    ...shadows.card,
  },
  emptyTitle: {
    fontSize: typography.sm,
    fontWeight: "700",
    color: colors.text,
  },
  emptyText: {
    fontSize: 12,
    color: colors.textMuted,
    textAlign: "center",
  },
});
