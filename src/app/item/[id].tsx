import { useState } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/components/button";
import { Icon } from "@/components/icon";
import { ReportSheet } from "@/components/report-sheet";
import { Brand as brand } from "@/constants/theme";

type Poster = {
  id: string;
  name: string;
  initials: string;
  verified: boolean;
};

type Item = {
  id: string;
  title: string;
  kind: "Found" | "Lost";
  postedBy: Poster;
  postedAgo: string;
  collectFrom: string;
  collectNote: string;
  description: string;
  foundAt: string;
  date: string;
  category: string;
  photos: number;
};

const ITEMS: Item[] = [
  {
    id: "1",
    title: "Black leather wallet",
    kind: "Found",
    postedBy: { id: "u1", name: "Daniel T.", initials: "DT", verified: true },
    postedAgo: "2h ago",
    collectFrom: "Molyko Market security desk",
    collectNote: "Pickup is arranged once your claim is approved.",
    description:
      "Found beside the fruit stalls. Two cards inside. Describe something only the owner would know to claim it.",
    foundAt: "Molyko market",
    date: "Today, 9:40",
    category: "Wallets",
    photos: 3,
  },
];

const HERO_BG = "#D5DFEC";
const HERO_CIRCLE = "#E6EDF6";
const COLLECT_BG = "#FFF0B8";
const DIVIDER = "#E8EAF0";
const LOST_BG = "#E6E8EE";

export default function ItemDetail() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = ITEMS.find((i) => i.id === id) ?? ITEMS[0];
  const poster = item.postedBy;
  const isLost = item.kind === "Lost";

  const [page, setPage] = useState(0);
  const [reportOpen, setReportOpen] = useState(false);
  const pages = Array.from({ length: item.photos }, (_, i) => i);

  const onPhotoScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setPage(Math.round(e.nativeEvent.contentOffset.x / width));
  };

  const openProfile = () =>
    router.push({ pathname: "/user/[id]", params: { id: poster.id } });

  const onMessage = () =>
    router.push({ pathname: "/messages/[id]", params: { id: poster.id } });

  const rows = [
    { label: isLost ? "Last seen" : "Found at", value: item.foundAt },
    { label: "Date", value: item.date },
    { label: "Category", value: item.category },
  ];

  return (
    <View style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}
      >
        <View style={styles.hero}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={onPhotoScroll}
          >
            {pages.map((p) => (
              <View key={p} style={[styles.photo, { width }]}>
                <View style={styles.photoCircle}>
                  <Icon name="wallet" size={64} color={brand.muted} />
                </View>
              </View>
            ))}
          </ScrollView>

          <View style={styles.counter}>
            <Text style={styles.counterText}>
              {page + 1} of {item.photos}
            </Text>
          </View>
        </View>

        <View style={styles.sheet}>
          <View style={styles.titleRow}>
            <Text style={styles.title} numberOfLines={2}>
              {item.title}
            </Text>
            <View style={[styles.badge, isLost && styles.badgeLost]}>
              <Text style={[styles.badgeText, isLost && styles.badgeTextLost]}>
                {item.kind}
              </Text>
            </View>
          </View>

          <Text style={styles.reported}>
            Posted by{" "}
            <Text
              accessibilityRole="link"
              onPress={openProfile}
              style={styles.reportedName}
            >
              {poster.name}
            </Text>
            {" · "}
            {item.postedAgo}
          </Text>

          {!isLost && (
            <View style={styles.collect}>
              <Text style={styles.collectLabel}>Collect from</Text>
              <Text style={styles.collectName}>{item.collectFrom}</Text>
              <Text style={styles.collectNote}>{item.collectNote}</Text>
            </View>
          )}

          <Text style={styles.description}>{item.description}</Text>

          <View style={styles.details}>
            {rows.map((row, index) => (
              <View
                key={row.label}
                style={[styles.row, index > 0 && styles.rowDivider]}
              >
                <Text style={styles.rowLabel}>{row.label}</Text>
                <Text style={styles.rowValue}>{row.value}</Text>
              </View>
            ))}
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`View ${poster.name}'s profile`}
            onPress={openProfile}
            className="mt-4 flex-row items-center rounded-[24px] bg-white px-4 py-3"
            style={({ pressed }) => pressed && styles.pressed}
          >
            <View className="w-11 h-11 rounded-full items-center justify-center bg-[#FFD43F]">
              <Text className="text-[15px] font-extrabold" style={{ color: brand.ink }}>
                {poster.initials}
              </Text>
            </View>
            <View className="flex-1 ml-3">
              <Text className="text-xs" style={{ color: brand.muted }}>
                Posted by
              </Text>
              <Text className="text-base font-extrabold" style={{ color: brand.ink }} numberOfLines={1}>
                {poster.name}
              </Text>
            </View>
            {poster.verified && (
              <View className="rounded-xl px-2.5 py-1 bg-[#FFD43F] mr-2">
                <Text className="text-xs font-bold" style={{ color: brand.ink }}>
                  Verified
                </Text>
              </View>
            )}
            <Text className="text-sm font-bold" style={{ color: brand.ink }}>
              Profile
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      <View
        style={[styles.topButtons, { top: insets.top + 12 }]}
        pointerEvents="box-none"
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={() =>
            router.canGoBack() ? router.back() : router.replace("/(tabs)")
          }
          hitSlop={8}
          className="w-12 h-12 rounded-full bg-white items-center justify-center"
          style={({ pressed }) => pressed && styles.pressed}
        >
          <Icon name="back" size={22} color={brand.ink} strokeWidth={2} />
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="More options"
          onPress={() => setReportOpen(true)}
          hitSlop={8}
          className="w-12 h-12 rounded-full bg-white items-center justify-center"
          style={({ pressed }) => pressed && styles.pressed}
        >
          <Icon name="more" size={22} color={brand.ink} strokeWidth={2} />
        </Pressable>
      </View>

      <ReportSheet
        visible={reportOpen}
        onClose={() => setReportOpen(false)}
        onSubmit={() => {
          // TODO: submit report for this item
          setReportOpen(false);
        }}
      />

      <View
        style={[styles.bar, { paddingBottom: Math.max(insets.bottom - 8, 16) }]}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Message ${poster.name}`}
          onPress={onMessage}
          className="w-[54px] h-[54px] rounded-[27px] items-center justify-center bg-[#0B0F14]"
          style={({ pressed }) => [styles.arrowBtn, pressed && styles.pressed]}
        >
          <Icon name="next" size={22} color={brand.white} strokeWidth={2} />
        </Pressable>
        <View style={{ flex: 1 }}>
          <Button
            label={isLost ? "I found this" : "This is mine"}
            tone="yellow"
            onPress={() =>
              router.push({
                pathname: "/claim/[id]/prove",
                params: { id: item.id },
              })
            }
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: brand.bg },
  pressed: { opacity: 0.85 },

  hero: { height: 292, backgroundColor: HERO_BG },
  photo: {
    height: 292,
    backgroundColor: HERO_BG,
    alignItems: "center",
    justifyContent: "center",
  },
  photoCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: HERO_CIRCLE,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 22,
  },
  counter: {
    position: "absolute",
    right: 20,
    bottom: 46,
    backgroundColor: "rgba(60, 66, 80, 0.7)",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  counterText: { fontSize: 12, fontWeight: "700", color: brand.white },

  topButtons: {
    position: "absolute",
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  sheet: {
    marginTop: -20,
    backgroundColor: brand.bg,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 22,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  title: {
    flex: 1,
    fontSize: 26,
    fontWeight: "800",
    color: brand.ink,
    letterSpacing: -0.5,
  },
  badge: {
    backgroundColor: brand.ink,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  badgeLost: { backgroundColor: LOST_BG },
  badgeText: { fontSize: 12, fontWeight: "700", color: brand.white },
  badgeTextLost: { color: brand.muted },
  reported: { marginTop: 6, fontSize: 15, color: brand.muted },
  reportedName: { fontWeight: "700", color: brand.ink },

  collect: {
    marginTop: 16,
    backgroundColor: COLLECT_BG,
    borderRadius: 20,
    padding: 16,
  },
  collectLabel: { fontSize: 12, color: brand.ink },
  collectName: {
    marginTop: 4,
    fontSize: 17,
    fontWeight: "800",
    color: brand.ink,
  },
  collectNote: { marginTop: 6, fontSize: 13, color: brand.muted },

  description: {
    marginTop: 16,
    fontSize: 16,
    lineHeight: 24,
    color: brand.ink,
  },

  details: {
    marginTop: 16,
    backgroundColor: brand.white,
    borderRadius: 24,
    paddingHorizontal: 18,
  },
  row: {
    height: 47,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowDivider: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: DIVIDER,
  },
  rowLabel: { fontSize: 15, color: brand.muted },
  rowValue: { fontSize: 15, fontWeight: "800", color: brand.ink },

  bar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 12,
    backgroundColor: "rgba(255, 255, 255, 0.92)",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  arrowBtn: {
    alignItems: "center",
    justifyContent: "center",
  },
});
