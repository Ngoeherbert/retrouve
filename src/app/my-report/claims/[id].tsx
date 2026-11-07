import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";

import {
  Avatar,
  Badge,
  ClaimScreen,
  ItemCard,
  Note,
  SectionLabel,
} from "@/components/claim-ui";
import { Icon } from "@/components/icon";
import { Brand as brand } from "@/constants/theme";

type ClaimRow = {
  id: string;
  name: string;
  initials: string;
  tint: string;
  summary: string;
  badge: string;
  tone: "ink" | "grey";
};

// TODO: replace with data from lib/mock-claims.ts once it exists
const ITEM = { title: "Black leather wallet", finder: "Daniel T." };
const CLAIMS: ClaimRow[] = [
  { id: "c1", name: "Amina Mbah", initials: "AM", tint: "#E6DAEE", summary: "Answered 3 of 3, 12m ago", badge: "New", tone: "ink" },
  { id: "c2", name: "Paul K.", initials: "PK", tint: "#D6E5DC", summary: "Answered 2 of 3, 1h ago", badge: "Needs info", tone: "grey" },
  { id: "c3", name: "Marie N.", initials: "MN", tint: "#D6DFEA", summary: "Answered 3 of 3, yesterday", badge: "Reviewed", tone: "grey" },
];

export default function ClaimsOnMyItem() {
  return (
    <ClaimScreen title="Claims">
      <View style={styles.top}>
        <ItemCard
          title={ITEM.title}
          meta={`Found by ${ITEM.finder}`}
          badge="Found"
          badgeTone="ink"
        />
      </View>
      <SectionLabel>{`${CLAIMS.length} claims`}</SectionLabel>
      <View style={styles.list}>
        {CLAIMS.map((c) => (
          <Pressable
            key={c.id}
            accessibilityRole="button"
            accessibilityLabel={`${c.name}, ${c.summary}, ${c.badge}`}
            onPress={() =>
              router.push({ pathname: "/claim/[id]/review", params: { id: c.id } })
            }
            style={({ pressed }) => [styles.row, pressed && styles.pressed]}
          >
            <Avatar initials={c.initials} tint={c.tint} size={48} />
            <View style={styles.body}>
              <Text style={styles.name}>{c.name}</Text>
              <Text style={styles.sub}>{c.summary}</Text>
            </View>
            <Badge label={c.badge} tone={c.tone} />
            <Icon name="next" size={20} color="#8E94A3" />
          </Pressable>
        ))}
      </View>
      <Note>Approve only one claim. The others are told when you do.</Note>
    </ClaimScreen>
  );
}

const styles = StyleSheet.create({
  top: { marginTop: 16 },
  list: { gap: 10, marginHorizontal: 20 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: brand.white,
    borderRadius: 28,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 8,
  },
  pressed: { opacity: 0.85 },
  body: { flex: 1, marginLeft: 8, minWidth: 0 },
  name: { fontSize: 17, fontWeight: "800", color: brand.ink },
  sub: { marginTop: 2, fontSize: 14, color: brand.muted },
});
