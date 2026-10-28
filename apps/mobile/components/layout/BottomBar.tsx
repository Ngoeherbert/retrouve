import { Pressable, Text, View, StyleSheet, Animated, Dimensions } from 'react-native';
import { usePathname } from 'expo-router';
import { colors, spacing, radius } from '../../constants/theme';
import { AppIcon, type AppIconName } from '../ui/AppIcons';

type TabConfig = {
  name: string;
  href: string;
  icon: AppIconName;
  label: string;
  isCenter?: boolean;
};

const TABS: TabConfig[] = [
  { name: 'home', href: '/(tabs)/home', icon: 'home', label: 'Home' },
  { name: 'explore', href: '/(tabs)/explore', icon: 'explore', label: 'Explore' },
  { name: 'create', href: '/(tabs)/create', icon: 'create', label: 'Create', isCenter: true },
  { name: 'messages', href: '/(tabs)/messages', icon: 'messages', label: 'Messages' },
  { name: 'profile', href: '/(tabs)/profile', icon: 'profile', label: 'Profile' },
];

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TAB_COUNT = 5;
const CENTER_INDEX = 2;

const shadows = {
  floating: {
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  pill: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
};

export default function BottomBar(props: {
  state: { routes: { name: string }[]; index: number };
  navigation: { dispatch: (action: any) => void };
}) {
  const { navigation } = props;
  const pathname = usePathname();

  const getActiveTabIndex = () => {
    const activeName = TABS.find((tab) => pathname.startsWith(tab.href))?.name ?? 'home';
    return TABS.findIndex((tab) => tab.name === activeName);
  };

  const activeIndex = getActiveTabIndex();
  const pillPosition = new Animated.Value(activeIndex);

  Animated.timing(pillPosition, {
    toValue: activeIndex,
    duration: 300,
    useNativeDriver: true,
  }).start();

  const handleTabPress = (tab: TabConfig, index: number) => {
    pillPosition.setValue(index);
    Animated.timing(pillPosition, {
      toValue: index,
      duration: 300,
      useNativeDriver: true,
    }).start();
    navigation.dispatch({ type: 'JUMP_TO', payload: { name: tab.name } });
  };

  const tabWidth = (SCREEN_WIDTH - spacing.md * 2 - spacing.xl * 4) / 4;

  const pillStyle = {
    position: 'absolute' as const,
    bottom: spacing.xl + 4,
    height: 60,
    width: tabWidth + 8,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    ...shadows.pill,
    transform: [
      {
        translateX: pillPosition.interpolate({
          inputRange: [0, 1, 2, 3, 4],
          outputRange: [
            spacing.md + 4,
            spacing.md + tabWidth + spacing.xl + 4,
            spacing.md + tabWidth * 2 + spacing.xl * 2 + 4 + 28,
            spacing.md + tabWidth * 3 + spacing.xl * 3 + 4,
            spacing.md + tabWidth * 4 + spacing.xl * 4 + 4,
          ],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Animated.View style={pillStyle} />
      <View style={styles.content}>
        {TABS.map((tab, index) => {
          const isActive = activeIndex === index;
          const isCenter = tab.isCenter;

          return (
            <Pressable
              key={tab.name}
              style={[
                styles.tab,
                isCenter && styles.centerTab,
                isCenter && { zIndex: 2 },
              ]}
              onPress={() => handleTabPress(tab, index)}
              accessibilityRole="button"
              accessibilityLabel={tab.label}
              accessibilityState={{ selected: isActive }}
              hitSlop={{ top: 8, bottom: 8, left: 12, right: 12 }}
            >
              {isCenter ? (
                <View style={[
                  styles.centerButton,
                  isActive && styles.centerButtonActive,
                ]}>
                  <AppIcon name={tab.icon} size={28} color={isActive ? '#FFFFFF' : colors.primary} />
                </View>
              ) : (
                <>
                  <AppIcon
                    name={tab.icon}
                    size={24}
                    color={isActive ? '#FFFFFF' : colors.textMuted}
                  />
                  <Text
                    style={[
                      styles.label,
                      isActive && styles.labelActive,
                    ]}
                  >
                    {tab.label}
                  </Text>
                </>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
    height: 100,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingHorizontal: spacing.sm,
  },
  centerTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -20,
  },
  centerButton: {
    width: 56,
    height: 56,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
    ...shadows.floating,
  },
  centerButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  label: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '500',
    position: 'absolute',
    bottom: -18,
  },
  labelActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});