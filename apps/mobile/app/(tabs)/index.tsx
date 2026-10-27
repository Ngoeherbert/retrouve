import { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useItemsStore } from '../../stores/itemsStore';
import { useSavedStore } from '../../stores/savedStore';
import { colors, spacing, radius, shadows } from '../../constants/theme';
import ItemCard from '../../components/ui/ItemCard';

const filters = ['All items', 'Lost', 'Found'];

export default function DiscoverScreen() {
  const items = useItemsStore((state) => state.items);
  const savedIds = useSavedStore((state) => state.savedIds);
  const toggleSaved = useSavedStore((state) => state.toggleSaved);

  const [activeFilter, setActiveFilter] = useState('All items');
  const [search, setSearch] = useState('');

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesFilter =
        activeFilter === 'All items' ||
        item.status === activeFilter.toLowerCase();

      const query = search.trim().toLowerCase();
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [items, activeFilter, search]);

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>WELCOME TO</Text>
            <Text style={styles.logo}>
              retrouv<Text style={styles.logoAccent}>e</Text>
            </Text>
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Notifications"
            style={styles.notificationButton}
            onPress={() => {}}
          >
            <Text style={styles.notificationIcon}>♧</Text>
            <View style={styles.notificationDot} />
          </Pressable>
        </View>

        <View style={styles.intro}>
          <Text style={styles.heading}>Lost something?</Text>
          <Text style={styles.subheading}>
            Let’s help you find what matters.
          </Text>
        </View>

        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>⌕</Text>
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search items, places, categories..."
            placeholderTextColor={colors.textMuted}
            style={styles.searchInput}
            returnKeyType="search"
            accessibilityLabel="Search lost and found items"
          />
          {search.length > 0 && (
            <Pressable onPress={() => setSearch('')} hitSlop={10}>
              <Text style={styles.clearSearch}>×</Text>
            </Pressable>
          )}
        </View>

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Explore items</Text>
            <Text style={styles.sectionSubtitle}>
              Discover recently lost and found belongings
            </Text>
          </View>
          <Text style={styles.count}>{filteredItems.length}</Text>
        </View>

        <View style={styles.filters}>
          {filters.map((filter) => {
            const active = activeFilter === filter;

            return (
              <Pressable
                key={filter}
                onPress={() => setActiveFilter(filter)}
                style={[styles.filter, active && styles.activeFilter]}
              >
                <Text
                  style={[
                    styles.filterText,
                    active && styles.activeFilterText,
                  ]}
                >
                  {filter}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {filteredItems.length > 0 ? (
          <View style={styles.itemList}>
            {filteredItems.map((item) => (
              <View key={item.id} style={styles.itemWrapper}>
                <ItemCard
                  item={item}
                  onPress={() => {
                    // Item details screen will be connected next.
                  }}
                />
                <Pressable
                  onPress={() => toggleSaved(item.id)}
                  style={styles.saveButton}
                  accessibilityRole="button"
                  accessibilityLabel={
                    savedIds.includes(item.id)
                      ? `Unsave ${item.title}`
                      : `Save ${item.title}`
                  }
                  hitSlop={8}
                >
                  <Text
                    style={[
                      styles.saveIcon,
                      savedIds.includes(item.id) && styles.savedIcon,
                    ]}
                  >
                    {savedIds.includes(item.id) ? '♥' : '♡'}
                  </Text>
                </Pressable>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>⌕</Text>
            <Text style={styles.emptyTitle}>No items found</Text>
            <Text style={styles.emptyDescription}>
              Try another search or choose a different filter.
            </Text>
            <Pressable
              onPress={() => {
                setSearch('');
                setActiveFilter('All items');
              }}
              style={styles.resetButton}
            >
              <Text style={styles.resetButtonText}>Clear filters</Text>
            </Pressable>
          </View>
        )}

        <View style={styles.bottomNote}>
          <Text style={styles.bottomNoteText}>
            Every item has a story. Let’s reunite it with its owner.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.md,
    paddingTop: 16,
    paddingBottom: 36,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 28,
  },
  eyebrow: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 2,
    color: colors.textSecondary,
  },
  logo: {
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: -1.2,
    color: colors.text,
  },
  logoAccent: {
    color: colors.primary,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    alignItems: "center",
    justifyContent: "center",
    ...shadows.card,
  },
  notificationIcon: {
    color: colors.text,
    fontSize: 25,
  },
  notificationDot: {
    position: "absolute",
    top: 9,
    right: 10,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  intro: {
    marginBottom: 20,
  },
  heading: {
    color: colors.text,
    fontSize: 29,
    fontWeight: "800",
    letterSpacing: -0.8,
  },
  subheading: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 7,
  },
  searchBox: {
    height: 54,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 30,
  },
  searchIcon: {
    fontSize: 26,
    color: colors.textSecondary,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: colors.text,
    fontSize: 14,
    paddingVertical: 0,
  },
  clearSearch: {
    fontSize: 23,
    color: colors.textSecondary,
    paddingLeft: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 19,
    fontWeight: "700",
  },
  sectionSubtitle: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 5,
  },
  count: {
    overflow: "hidden",
    color: colors.primary,
    backgroundColor: colors.primarySoft,
    fontWeight: "700",
    fontSize: 13,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: radius.full,
  },
  filters: {
    flexDirection: "row",
    gap: 9,
    marginBottom: 20,
  },
  filter: {
    paddingHorizontal: 17,
    paddingVertical: 10,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  activeFilter: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: "600",
  },
  activeFilterText: {
    color: "#FFFFFF",
  },
  itemList: {
    gap: 16,
  },
  itemWrapper: {
    position: "relative",
  },
  saveButton: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.94)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  saveIcon: {
    color: colors.textSecondary,
    fontSize: 21,
  },
  savedIcon: {
    color: colors.danger,
  },
  emptyState: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    paddingHorizontal: 24,
    paddingVertical: 38,
    borderWidth: 1,
    borderColor: colors.border,
  },
  emptyIcon: {
    fontSize: 34,
    color: colors.textMuted,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    marginTop: 12,
  },
  emptyDescription: {
    fontSize: 13,
    lineHeight: 20,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: 8,
  },
  resetButton: {
    marginTop: 18,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: radius.full,
    backgroundColor: colors.primarySoft,
  },
  resetButtonText: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: "700",
  },
  bottomNote: {
    marginTop: 30,
    paddingHorizontal: 16,
    paddingVertical: 18,
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceSecondary,
  },
  bottomNoteText: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 19,
  },
});
