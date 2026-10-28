import { useEffect, useState } from "react";
import {
  Pressable,
  Text,
  View,
  StyleSheet,
  Animated,
  useAnimatedValue,
  type LayoutChangeEvent,
} from "react-native";
import { usePathname } from "expo-router";
import { colors, spacing, radius } from "../../constants/theme";
import { AppIcon, type AppIconName } from "../ui/AppIcons";

type TabConfig = {
  name: string;
  href: string;
  icon: AppIconName;
  label: string;
  isCenter?: boolean;
};

const TABS: TabConfig[] = [
  { name: "home", href: "/(tabs)/home", icon: "home", label: "Home" },
  {
    name: "explore",
    href: "/(tabs)/explore",
    icon: "explore",
    label: "Explore",
  },
  {
    name: "create",
    href: "/(tabs)/create",
    icon: "create",
    label: "Create",
    isCenter: true,
  },
  {
    name: "messages",
    href: "/(tabs)/messages",
    icon: "messages",
    label: "Messages",
  },
  {
    name: "profile",
    href: "/(tabs)/profile",
    icon: "profile",
    label: "Profile",
  },
];

const CENTER_INDEX = TABS.findIndex((t) => t.isCenter);
const BAR_HEIGHT = 64;
const BAR_PADDING = spacing.sm;
const PILL_HEIGHT = 48;
const CENTER_SIZE = 52;

export default function BottomBar(props: {
  state: { routes: { name: string }[]; index: number };
  navigation: { dispatch: (action: any) => void };
}) {
  const { state, navigation } = props;

  // Hide the tab bar on nested Stack screens (e.g. chat threads)
  const pathname = usePathname();

  // Map the navigator's active route to our TABS order (don't assume they match)
  const activeRouteName = state.routes[state.index]?.name;
  const found = TABS.findIndex((t) => t.name === activeRouteName);
  const activeIndex = found === -1 ? 0 : found;

  const [barWidth, setBarWidth] = useState(0);
  const slotWidth =
    barWidth > 0 ? (barWidth - BAR_PADDING * 2) / TABS.length : 0;
  const pillWidth = Math.min(Math.max(slotWidth - 8, 0), 76);

  const pillPosition = useAnimatedValue(activeIndex);

  useEffect(() => {
    Animated.spring(pillPosition, {
      toValue: activeIndex,
      useNativeDriver: true,
      damping: 18,
      stiffness: 220,
      mass: 0.8,
    }).start();
  }, [activeIndex, pillPosition]);

  const cleanPath = pathname.replace("/(tabs)", "");
  const isTabRoot = TABS.some((tab) => cleanPath === `/${tab.name}`);
  if (!isTabRoot) return null;

  const handleTabPress = (tab: TabConfig) => {
    navigation.dispatch({ type: "JUMP_TO", payload: { name: tab.name } });
  };

  const onBarLayout = (e: LayoutChangeEvent) =>
    setBarWidth(e.nativeEvent.layout.width);

  const inputRange = TABS.map((_, i) => i);
  const pillStyle = {
    position: "absolute" as const,
    top: (BAR_HEIGHT - PILL_HEIGHT) / 2,
    left: 0,
    height: PILL_HEIGHT,
    width: pillWidth,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    // Hide the pill while the Create tab is active; it has its own button
    opacity: pillPosition.interpolate({
      inputRange: [CENTER_INDEX - 0.6, CENTER_INDEX, CENTER_INDEX + 0.6],
      outputRange: [1, 0, 1],
      extrapolate: "clamp",
    }),
    transform: [
      {
        translateX: pillPosition.interpolate({
          inputRange,
          outputRange: inputRange.map(
            (i) => BAR_PADDING + i * slotWidth + (slotWidth - pillWidth) / 2,
          ),
        }),
      },
    ],
  };

  const centerTab = TABS[CENTER_INDEX];
  const isCenterActive = activeIndex === CENTER_INDEX;

  return (
    <View style={styles.container} pointerEvents="box-none">
      <View style={styles.bar} onLayout={onBarLayout}>
        {barWidth > 0 && (
          <Animated.View pointerEvents="none" style={pillStyle} />
        )}

        {TABS.map((tab, index) => {
          // Empty slot: the real button is rendered above the bar
          if (tab.isCenter) return <View key={tab.name} style={styles.tab} />;

          const isActive = activeIndex === index;
          return (
            <Pressable
              key={tab.name}
              style={styles.tab}
              onPress={() => handleTabPress(tab)}
              accessibilityRole="button"
              accessibilityLabel={tab.label}
              accessibilityState={{ selected: isActive }}
              hitSlop={{ top: 8, bottom: 8, left: 2, right: 2 }}
            >
              <AppIcon
                name={tab.icon}
                size={22}
                color={isActive ? colors.text : colors.textMuted}
              />
              <Text
                style={[styles.label, isActive && styles.labelActive]}
                numberOfLines={1}
              >
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Raised Create button. Lives inside the container bounds so Android registers touches. */}
      <View style={styles.centerWrap} pointerEvents="box-none">
        <Pressable
          onPress={() => handleTabPress(centerTab)}
          accessibilityRole="button"
          accessibilityLabel={centerTab.label}
          accessibilityState={{ selected: isCenterActive }}
          style={[
            styles.centerButton,
            isCenterActive && styles.centerButtonActive,
          ]}
        >
          <AppIcon name={centerTab.icon} size={26} color={colors.text} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
    paddingTop: CENTER_SIZE / 2,
  },
  bar: {
    height: BAR_HEIGHT,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: radius.full,
    paddingHorizontal: BAR_PADDING,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 10,
  },
  tab: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },
  label: {
    fontSize: 11,
    fontWeight: "500",
    color: colors.textMuted,
  },
  labelActive: {
    color: colors.text,
    fontWeight: "700",
  },
  centerWrap: {
    position: "absolute",
    top: 4,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  centerButton: {
    width: CENTER_SIZE,
    height: CENTER_SIZE,
    borderRadius: CENTER_SIZE / 2,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 12,
  },
  centerButtonActive: {
    borderWidth: 3,
    borderColor: colors.text,
  },
});
