import { useMemo, useState } from "react";
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

// Swap these for your own icon names (bell, search, calendar, clock, pin) if you have them.
const ICONS = {
  bell: "notifications",
  search: "explore",
  pin: "explore",
  calendar: "package", // TODO: replace with a calendar icon
  clock: "check", // TODO: replace with a clock icon
  empty: "package",
} satisfies Record<string, AppIconName>;

const filters = [
  "All items",
  "Claimed",
  "Bags",
  "Wallets",
  "Electronics",
  "Keys",
  "Accessories",
  "Documents",
  "Other",
];

type FoundItem = {
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
  claimed?: boolean;
};

const items: FoundItem[] = [
  {
    id: "1",
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
  },
  {
    id: "2",
    finderId: "finder-alam",
    category: "Electronics",
    title: "Airpods",
    description:
      "Found apple airpods at the last desk of LHC 9 in the Main Building.",
    date: "04 Spt",
    time: "11:21 AM",
    location: "Main Building",
    finderName: "Alam Khan",
    finderInfo: "Btech C.S 3rd year",
  },
  {
    id: "3",
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
    claimed: true,
  },
  {
    id: "4",
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

function ItemCard({ item, onChat }: { item: FoundItem; onChat: () => void }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardBody}>
        <View style={styles.cardTop}>
          {/* Replace with <Image source={{ uri: item.imageUrl }} style={styles.cardImage} /> */}
          <View style={styles.cardImage}>
            <AppIcon name="package" size={32} color={colors.textMuted} />
          </View>
          <View style={styles.cardInfo}>
            <View style={styles.cardTitleRow}>
              <Text style={styles.cardTitle} numberOfLines={1}>
                {item.title}
              </Text>
              {item.claimed && (
                <View style={styles.claimedBadge}>
                  <Text style={styles.claimedText}>Claimed</Text>
                </View>
              )}
            </View>
            <Text style={styles.cardDescription} numberOfLines={3}>
              {item.description}
            </Text>
          </View>
        </View>

        <View style={styles.metaRow}>
          <View style={styles.meta}>
            <AppIcon name={ICONS.calendar} size={13} color={colors.textMuted} />
            <Text style={styles.metaText}>{item.date}</Text>
          </View>
          <View style={styles.meta}>
            <AppIcon name={ICONS.clock} size={13} color={colors.textMuted} />
            <Text style={styles.metaText}>{item.time}</Text>
          </View>
          <View style={[styles.meta, styles.metaLocation]}>
            <AppIcon name={ICONS.pin} size={13} color={colors.textMuted} />
            <Text style={styles.metaText} numberOfLines={1}>
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

export default function ExploreScreen() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All items");

  const visibleItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesFilter =
        filter === "All items"
          ? true
          : filter === "Claimed"
            ? item.claimed
            : item.category === filter;
      const matchesQuery =
        q.length === 0 ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q);
      return matchesFilter && matchesQuery;
    });
  }, [query, filter]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Explore</Text>
          <View style={styles.headerActions}>
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
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
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
          </View>

          {/* Filters */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chipsRow}
            style={styles.chipsScroll}
          >
            {filters.map((f) => {
              const active = f === filter;
              return (
                <Pressable
                  key={f}
                  style={[styles.chip, active && styles.chipActive]}
                  onPress={() => setFilter(f)}
                  accessibilityRole="button"
                  accessibilityState={{ selected: active }}
                >
                  <Text
                    style={[styles.chipText, active && styles.chipTextActive]}
                  >
                    {f}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          {/* Feed */}
          {visibleItems.length > 0 ? (
            <View style={styles.feed}>
              {visibleItems.map((item) => (
                <ItemCard
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
              <AppIcon name={ICONS.empty} size={40} color={colors.textMuted} />
              <Text style={styles.emptyTitle}>No items found</Text>
              <Text style={styles.emptyText}>
                Try a different search or filter.
              </Text>
            </View>
          )}
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  title: {
    fontSize: typography.xxl,
    fontWeight: "800",
    color: colors.text,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: 120,
    gap: spacing.md,
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
  chipsScroll: {
    flexGrow: 0,
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
  feed: {
    gap: spacing.md,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    overflow: "hidden",
    ...shadows.card,
  },
  cardBody: {
    padding: spacing.sm,
    gap: spacing.sm,
  },
  cardTop: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  cardImage: {
    width: 112,
    height: 96,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceSecondary,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  cardInfo: {
    flex: 1,
    gap: 4,
  },
  cardTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  cardTitle: {
    flexShrink: 1,
    fontSize: typography.md,
    fontWeight: "700",
    color: colors.text,
  },
  claimedBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.full,
    backgroundColor: colors.primarySoft,
  },
  claimedText: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.text,
  },
  cardDescription: {
    fontSize: 12,
    lineHeight: 17,
    color: colors.textSecondary,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  meta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaLocation: {
    flexShrink: 1,
  },
  metaText: {
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
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
  },
  emptyTitle: {
    fontSize: typography.md,
    fontWeight: "700",
    color: colors.text,
    marginTop: spacing.sm,
  },
  emptyText: {
    fontSize: typography.sm,
    color: colors.textSecondary,
    textAlign: "center",
  },
});
