import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Brand as brand } from "@/constants/theme";

const YELLOW = "#FFD23F";

type NearItem = {
  id: string;
  title: string;
  meta: string;
  tint: string;
};

const NEAR_YOU: NearItem[] = [
  { id: "1", title: "Brown wallet", meta: "Found, 300 m", tint: "#EADDCB" },
  { id: "2", title: "Car keys", meta: "Lost, 1.1 km", tint: "#D6E5D9" },
  { id: "3", title: "Black phone", meta: "Found, 1.4 km", tint: "#D5DFEC" },
  { id: "4", title: "House keys", meta: "Lost, 2 km", tint: "#E6D9EC" },
];

export default function Home() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const nearWidth = Math.floor((width - 40 - 12) / 2);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + 16 }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good morning</Text>
          <Text style={styles.name}>Amina</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Notifications"
          onPress={() => router.push("/notifications")}
          style={({ pressed }) => [styles.bell, pressed && styles.pressed]}
        >
          <Ionicons name="notifications-outline" size={22} color={brand.ink} />
        </Pressable>
      </View>

      {/* Search pill */}
      <Pressable
        accessibilityRole="search"
        onPress={() => router.push("/(tabs)/search")}
        className="mt-5 h-[54px] rounded-[27px] flex-row items-center px-4 bg-white"
        style={({ pressed }) => pressed && { opacity: 0.9 }}
      >
        <Ionicons name="search-outline" size={20} color={brand.muted} />
        <Text className="ml-3 text-base" style={{ color: brand.muted }}>
          Search lost and found items
        </Text>
      </Pressable>

      {/* Actions */}
      <View className="flex-row gap-3 mt-5">
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push("/report/step-1")}
          className="flex-1 min-h-[150px] rounded-[28px] p-4 justify-between bg-[#0B0F14]"
          style={({ pressed }) => pressed && { opacity: 0.9 }}
        >
          <View className="w-10 h-10 rounded-full items-center justify-center bg-[#FFD23F]">
            <Ionicons name="add" size={22} color={brand.ink} />
          </View>
          <View>
            <Text className="text-[19px] font-extrabold leading-6 text-white">
              I lost{"\n"}something
            </Text>
            <Text className="mt-1 text-[13px] text-[#B7BDC9]">
              Let finders reach you
            </Text>
          </View>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          onPress={() => router.push("/report/step-1")}
          className="flex-1 min-h-[150px] rounded-[28px] p-4 justify-between bg-[#FFD23F]"
          style={({ pressed }) => pressed && { opacity: 0.9 }}
        >
          <View className="w-10 h-10 rounded-full items-center justify-center bg-[#0B0F14]">
            <Ionicons name="checkmark" size={20} color={YELLOW} />
          </View>
          <View>
            <Text className="text-[19px] font-extrabold leading-6" style={{ color: brand.ink }}>
              I found{"\n"}something
            </Text>
            <Text className="mt-1 text-[13px] text-[#4A4220]">
              Help it get home
            </Text>
          </View>
        </Pressable>
      </View>

      {/* Active report */}
      <View style={styles.sectionRow}>
        <Text style={styles.section}>Your active report</Text>
        <Pressable onPress={() => router.push("/activity")} hitSlop={8}>
          <Text style={styles.link}>See all</Text>
        </Pressable>
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={() =>
          router.push({ pathname: "/my-report/[id]", params: { id: "1" } })
        }
        className="mt-3 flex-row items-center p-3.5 rounded-3xl bg-white"
        style={({ pressed }) => pressed && { opacity: 0.9 }}
      >
        <View className="w-[72px] h-[72px] rounded-2xl items-center justify-center bg-[#D5DFEC]">
          <Ionicons name="wallet-outline" size={24} color={brand.muted} />
        </View>
        <View className="flex-1 ml-3.5 justify-center">
          <Text className="text-[17px] font-extrabold" style={{ color: brand.ink }} numberOfLines={1}>
            Grey backpack
          </Text>
          <Text className="mt-0.5 text-sm" style={{ color: brand.muted }} numberOfLines={1}>
            Lost at Molyko, 2d ago
          </Text>
          <View className="self-start mt-2 px-3 py-1 rounded-[14px] bg-[#FFD23F]">
            <Text className="text-xs font-bold" style={{ color: brand.ink }}>
              2 new responses
            </Text>
          </View>
        </View>
      </Pressable>

      {/* Near you */}
      <View style={styles.sectionRow}>
        <Text style={styles.section}>Near you</Text>
        <Pressable
          onPress={() => router.push("/(tabs)/search/map")}
          hitSlop={8}
        >
          <Text style={styles.link}>Map</Text>
        </Pressable>
      </View>

      <View style={styles.grid}>
        {NEAR_YOU.map((item) => (
          <View key={item.id} style={{ width: nearWidth, flexGrow: 0, flexShrink: 0 }}>
            <Pressable
              accessibilityRole="button"
              onPress={() =>
                router.push({ pathname: "/item/[id]", params: { id: item.id } })
              }
              style={({ pressed }) => [styles.near, pressed && styles.pressed]}
            >
              <View style={[styles.nearTile, { backgroundColor: item.tint }]}>
                <Ionicons name="wallet-outline" size={26} color={brand.muted} />
              </View>
              <Text style={styles.nearTitle} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={styles.nearMeta} numberOfLines={1}>
                {item.meta}
              </Text>
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: brand.bg },
  content: { paddingHorizontal: 20, paddingBottom: 140 },
  pressed: { opacity: 0.9 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  greeting: { fontSize: 15, color: brand.muted },
  name: { fontSize: 28, fontWeight: "800", color: brand.ink },
  bell: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: brand.white,
  },

  search: {
    marginTop: 20,
    height: 54,
    borderRadius: 27,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: brand.white,
  },
  searchText: { marginLeft: 12, fontSize: 16, color: brand.muted },

  actions: { flexDirection: "row", gap: 12, marginTop: 20 },
  action: {
    flex: 1,
    minHeight: 150,
    borderRadius: 28,
    padding: 16,
    justifyContent: "space-between",
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  actionTitle: { fontSize: 19, fontWeight: "800", lineHeight: 24 },
  actionSub: { marginTop: 4, fontSize: 13 },

  sectionRow: {
    marginTop: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  section: { fontSize: 19, fontWeight: "800", color: brand.ink },
  link: { fontSize: 14, fontWeight: "600", color: brand.muted },

  report: {
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 16,
    backgroundColor: brand.white,
  },
  reportThumb: {
    width: 72,
    height: 72,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D5DFEC",
    flexShrink: 0,
  },
  reportBody: { flex: 1, marginLeft: 14, minWidth: 0, justifyContent: "center", backgroundColor: "red" },
  reportTitle: { fontSize: 17, fontWeight: "800", color: brand.ink },
  reportMeta: { marginTop: 2, fontSize: 14, color: brand.muted },
  pill: {
    alignSelf: "flex-start",
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 14,
    backgroundColor: YELLOW,
  },
  pillText: { fontSize: 12, fontWeight: "700", color: brand.ink },

  grid: {
    marginTop: 12,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  near: { marginBottom: 16 },
  nearTile: {
    width: "100%",
    aspectRatio: 1.45,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  nearTitle: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "800",
    color: brand.ink,
  },
  nearMeta: { fontSize: 13, color: brand.muted },
});
