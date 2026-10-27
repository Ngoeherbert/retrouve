
import { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, spacing, radius } from '../../constants/theme';

type ItemStatus = 'Lost' | 'Found';

interface HomeItem {
  id: string;
  title: string;
  location: string;
  distance: string;
  status: ItemStatus;
  image: string;
  category: string;
}

const items: HomeItem[] = [
  {
    id: '1',
    title: 'AirPods Pro',
    location: 'Central Park',
    distance: '0.4 Mi',
    status: 'Lost',
    category: 'Electronics',
    image:
      'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: '2',
    title: 'Silver Ring',
    location: '5th Ave',
    distance: '0.8 Mi',
    status: 'Found',
    category: 'Accessories',
    image:
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: '3',
    title: 'Black Backpack',
    location: 'City Library',
    distance: '1.2 Mi',
    status: 'Found',
    category: 'Accessories',
    image:
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80',
  },
];

const quickActions = [
  { id: 'lost', label: 'Report Lost', icon: '⌕' },
  { id: 'found', label: 'Report Found', icon: '▣' },
  { id: 'qr', label: 'QR Tags', icon: '▦' },
  { id: 'status', label: 'Status Update', icon: '◇' },
  { id: 'match', label: 'AI Match', icon: '✧' },
];

const categories = [
  'Popular',
  'Electronics',
  'Wallets',
  'Keys',
  'Accessories',
];

type TabName = 'Home' | 'Explore' | 'Report' | 'Messages' | 'Profile';

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Popular');
  const [activeTab, setActiveTab] = useState<TabName>('Home');

  const cardWidth = Math.min((width - 52) / 2, 230);

  const visibleItems = useMemo(() => {
    const query = search.trim().toLowerCase();

    return items.filter((item) => {
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);

      const matchesCategory =
        activeCategory === 'Popular' ||
        item.category === activeCategory ||
        (activeCategory === 'Wallets' && item.title.toLowerCase().includes('wallet')) ||
        (activeCategory === 'Keys' && item.title.toLowerCase().includes('key'));

      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  const handleTabPress = (tab: TabName) => {
    setActiveTab(tab);

    if (tab === 'Home') return;

    if (tab === 'Report') {
      router.push('/(auth)/login');
      return;
    }

    // The remaining destination screens will be added next.
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.screen}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.header}>
            <View style={styles.profileHeader}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>R</Text>
              </View>

              <View style={styles.greeting}>
                <Text style={styles.greetingSmall}>Good morning</Text>
                <Text style={styles.userName}>Welcome to Retrouve</Text>
              </View>
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

          <View style={styles.searchRow}>
            <Text style={styles.searchIcon}>⌕</Text>
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search items, brands, or locations..."
              placeholderTextColor={colors.textMuted}
              style={styles.searchInput}
              returnKeyType="search"
              accessibilityLabel="Search items"
            />
            {search.length > 0 ? (
              <Pressable onPress={() => setSearch('')} hitSlop={10}>
                <Text style={styles.clearButton}>×</Text>
              </Pressable>
            ) : null}
            <Pressable
              style={styles.filterButton}
              accessibilityRole="button"
              accessibilityLabel="Filters"
              onPress={() => setActiveCategory('Popular')}
            >
              <Text style={styles.filterIcon}>☷</Text>
            </Pressable>
          </View>

          <View style={styles.quickActions}>
            {quickActions.map((action, index) => (
              <Pressable
                key={action.id}
                style={styles.quickAction}
                onPress={() => {
                  if (action.id === 'lost' || action.id === 'found') {
                    router.push('/(auth)/login');
                  }
                }}
                accessibilityRole="button"
                accessibilityLabel={action.label}
              >
                <View
                  style={[
                    styles.quickIcon,
                    index === 0 && styles.quickIconActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.quickIconText,
                      index === 0 && styles.quickIconTextActive,
                    ]}
                  >
                    {action.icon}
                  </Text>
                </View>
                <Text style={styles.quickLabel}>{action.label}</Text>
              </Pressable>
            ))}
          </View>

          <Pressable style={styles.rewardBanner} onPress={() => {}}>
            <View style={styles.rewardCopy}>
              <View style={styles.rewardPill}>
                <Text style={styles.rewardPillText}>REWARDS</Text>
              </View>
              <Text style={styles.rewardTitle}>
                Earn rewards for{'\n'}finding items
              </Text>
              <Text style={styles.rewardSubtitle}>
                Help reunite belongings with their owners.
              </Text>
            </View>
            <View style={styles.rewardIconBox}>
              <Text style={styles.rewardIcon}>♔</Text>
            </View>
          </Pressable>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nearby Lost Items</Text>
            <Pressable onPress={() => handleTabPress('Explore')}>
              <Text style={styles.seeAll}>See All</Text>
            </Pressable>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.itemsRow}
          >
            {visibleItems.map((item) => (
              <Pressable
                key={item.id}
                style={[styles.itemCard, { width: cardWidth }]}
                onPress={() => {}}
              >
                <View style={styles.itemImageWrap}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.itemImage}
                    resizeMode="cover"
                  />
                  <View
                    style={[
                      styles.statusBadge,
                      item.status === 'Lost'
                        ? styles.lostBadge
                        : styles.foundBadge,
                    ]}
                  >
                    <Text style={styles.statusText}>{item.status}</Text>
                  </View>
                </View>

                <View style={styles.itemDetails}>
                  <Text numberOfLines={1} style={styles.itemTitle}>
                    {item.title}
                  </Text>
                  <View style={styles.itemLocationRow}>
                    <Text style={styles.locationIcon}>⌖</Text>
                    <Text numberOfLines={1} style={styles.itemLocation}>
                      {item.location} · {item.distance}
                    </Text>
                  </View>
                </View>
              </Pressable>
            ))}

            {visibleItems.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyTitle}>No matching items</Text>
                <Text style={styles.emptyText}>
                  Try another search or category.
                </Text>
              </View>
            ) : null}
          </ScrollView>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Trending Categories</Text>
            <Pressable onPress={() => handleTabPress('Explore')}>
              <Text style={styles.seeAll}>See All</Text>
            </Pressable>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryRow}
          >
            {categories.map((category) => {
              const active = activeCategory === category;

              return (
                <Pressable
                  key={category}
                  onPress={() => setActiveCategory(category)}
                  style={[
                    styles.categoryChip,
                    active && styles.categoryChipActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      active && styles.categoryTextActive,
                    ]}
                  >
                    {category}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          <View style={styles.bottomSpace} />
        </ScrollView>

        <View style={styles.bottomBar}>
          <TabButton
            label="Home"
            icon="⌂"
            active={activeTab === 'Home'}
            onPress={() => handleTabPress('Home')}
          />
          <TabButton
            label="Explore"
            icon="⌕"
            active={activeTab === 'Explore'}
            onPress={() => handleTabPress('Explore')}
          />

          <Pressable
            style={styles.reportTab}
            onPress={() => handleTabPress('Report')}
            accessibilityRole="button"
            accessibilityLabel="Report an item"
          >
            <View style={styles.reportButton}>
              <Text style={styles.reportPlus}>+</Text>
            </View>
            <Text style={styles.tabLabel}>Report</Text>
          </Pressable>

          <TabButton
            label="Messages"
            icon="▱"
            active={activeTab === 'Messages'}
            onPress={() => handleTabPress('Messages')}
          />
          <TabButton
            label="Profile"
            icon="♙"
            active={activeTab === 'Profile'}
            onPress={() => handleTabPress('Profile')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

function TabButton({
  label,
  icon,
  active,
  onPress,
}: {
  label: string;
  icon: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={styles.tabButton}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Text style={[styles.tabIcon, active && styles.tabIconActive]}>
        {icon}
      </Text>
      <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F5F7',
  },
  screen: {
    flex: 1,
    backgroundColor: '#F4F5F7',
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#242424',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  greeting: {
    gap: 3,
  },
  greetingSmall: {
    color: '#777B84',
    fontSize: 11,
  },
  userName: {
    color: '#17181C',
    fontSize: 14,
    fontWeight: '700',
  },
  notificationButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  notificationIcon: {
    color: '#22242A',
    fontSize: 23,
  },
  notificationDot: {
    position: 'absolute',
    right: 10,
    top: 9,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F04444',
  },
  searchRow: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 14,
    paddingRight: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    marginBottom: 18,
    elevation: 2,
  },
  searchIcon: {
    fontSize: 23,
    color: '#777B84',
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    minWidth: 0,
    paddingVertical: 10,
    fontSize: 12,
    color: '#202127',
  },
  clearButton: {
    color: '#777B84',
    fontSize: 22,
    paddingHorizontal: 6,
  },
  filterButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFC400',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterIcon: {
    color: '#222222',
    fontSize: 24,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  quickAction: {
    flex: 1,
    alignItems: 'center',
    gap: 7,
  },
  quickIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
  },
  quickIconActive: {
    backgroundColor: '#171923',
  },
  quickIconText: {
    color: '#24252B',
    fontSize: 25,
  },
  quickIconTextActive: {
    color: '#FFD02F',
  },
  quickLabel: {
    fontSize: 9,
    textAlign: 'center',
    color: '#666A73',
  },
  rewardBanner: {
    minHeight: 128,
    backgroundColor: '#242719',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
    overflow: 'hidden',
  },
  rewardCopy: {
    flex: 1,
    paddingRight: 10,
  },
  rewardPill: {
    alignSelf: 'flex-start',
    backgroundColor: '#3D4028',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 8,
  },
  rewardPillText: {
    fontSize: 9,
    color: '#FFD438',
    fontWeight: '700',
  },
  rewardTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 21,
  },
  rewardSubtitle: {
    color: '#D2D3C8',
    fontSize: 10,
    marginTop: 5,
    lineHeight: 15,
  },
  rewardIconBox: {
    width: 52,
    height: 58,
    borderRadius: 13,
    backgroundColor: '#FFC400',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rewardIcon: {
    fontSize: 30,
    color: '#222222',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 13,
  },
  sectionTitle: {
    color: '#202127',
    fontSize: 16,
    fontWeight: '800',
  },
  seeAll: {
    color: '#686C75',
    fontSize: 10,
  },
  itemsRow: {
    gap: 12,
    paddingBottom: 24,
  },
  itemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 13,
    overflow: 'hidden',
    elevation: 2,
  },
  itemImageWrap: {
    height: 112,
    position: 'relative',
    backgroundColor: '#E8E9ED',
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  statusBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  lostBadge: {
    backgroundColor: '#FFF0C2',
  },
  foundBadge: {
    backgroundColor: '#DDF7E8',
  },
  statusText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#343434',
  },
  itemDetails: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 6,
  },
  itemTitle: {
    color: '#202127',
    fontSize: 12,
    fontWeight: '700',
  },
  itemLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  locationIcon: {
    color: '#777B84',
    fontSize: 13,
  },
  itemLocation: {
    flex: 1,
    color: '#777B84',
    fontSize: 9,
  },
  emptyState: {
    width: 260,
    padding: 18,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    justifyContent: 'center',
  },
  emptyTitle: {
    color: '#202127',
    fontWeight: '700',
  },
  emptyText: {
    color: '#777B84',
    fontSize: 12,
    marginTop: 5,
  },
  categoryRow: {
    gap: 9,
    paddingBottom: 10,
  },
  categoryChip: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 17,
    paddingVertical: 11,
    borderRadius: 24,
  },
  categoryChipActive: {
    backgroundColor: '#FFC400',
  },
  categoryText: {
    color: '#363840',
    fontSize: 11,
    fontWeight: '600',
  },
  categoryTextActive: {
    color: '#242424',
  },
  bottomSpace: {
    height: 24,
  },
  bottomBar: {
    minHeight: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 7,
    paddingTop: 7,
    paddingBottom: 5,
    backgroundColor: 'rgba(255,255,255,0.98)',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E7E7E9',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  tabIcon: {
    color: '#747781',
    fontSize: 23,
    lineHeight: 27,
  },
  tabIconActive: {
    color: '#22242A',
  },
  tabLabel: {
    color: '#747781',
    fontSize: 9,
  },
  tabLabelActive: {
    color: '#22242A',
    fontWeight: '700',
  },
  reportTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -19,
    gap: 3,
  },
  reportButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFC400',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  reportPlus: {
    color: '#242424',
    fontSize: 32,
    lineHeight: 36,
    fontWeight: '400',
  },
});
