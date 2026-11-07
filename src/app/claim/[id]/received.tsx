import { StyleSheet, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { Button } from "@/components/button";
import { ClaimScreen, Intro, ItemCard, PillButton } from "@/components/claim-ui";
import { Brand as brand } from "@/constants/theme";

// TODO: replace with data from lib/mock-claims.ts once it exists
const ITEM = { title: "Black leather wallet", finder: "Daniel T." };

export default function ConfirmReceived() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <ClaimScreen
      title="Handover"
      footer={
        <Text style={styles.note}>Only confirm once the item is in your hands.</Text>
      }
    >
      <Intro
        title="Did you get your item?"
        subtitle="Confirming closes the claim and lets you rate Daniel."
      />
      <ItemCard
        title={ITEM.title}
        meta={`Found by ${ITEM.finder}`}
        badge="Found"
        badgeTone="ink"
      />
      <View style={styles.actions}>
        <Button
          label="Yes, I have it"
          onPress={() =>
            router.push({ pathname: "/handover/[id]", params: { id } })
          }
        />
        <PillButton
          label="No, there is a problem"
          onPress={() => router.push("/report-problem")}
        />
      </View>
    </ClaimScreen>
  );
}

const styles = StyleSheet.create({
  actions: { marginHorizontal: 20, marginTop: 22, gap: 12 },
  note: { textAlign: "center", fontSize: 14, color: brand.muted },
});
