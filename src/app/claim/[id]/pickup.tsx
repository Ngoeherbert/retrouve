import { Linking, StyleSheet, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { Button } from "@/components/button";
import {
  Banner,
  ClaimScreen,
  DetailRows,
  HandoverCodeCard,
  Note,
  PillButton,
} from "@/components/claim-ui";
import { handoverCodeFor } from "@/lib/handover";
import { PICKUP_PLACE } from "@/lib/place";

// TODO: replace with data from lib/mock-claims.ts once it exists
const PICKUP = { when: "Today, 2 to 4 pm", finder: "Daniel T." };

export default function PickupArranged() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const directions = () =>
    Linking.openURL(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        PICKUP_PLACE + ", Molyko"
      )}`
    );

  return (
    <ClaimScreen
      title="Pickup arranged"
      footer={
        <>
          <Button label="Get directions" onPress={directions} />
          <PillButton
            label="Message Daniel"
            onPress={() =>
              router.push({ pathname: "/messages/[id]", params: { id } })
            }
          />
        </>
      }
    >
      <View style={styles.banner}>
        <Banner title="Claim approved" sub="Daniel is ready to meet you" />
      </View>
      <View style={styles.block}>
        <DetailRows
          rows={[
            { label: "Where", value: PICKUP_PLACE },
            { label: "When", value: PICKUP.when },
            { label: "With", value: PICKUP.finder },
          ]}
        />
      </View>
      <View style={styles.block}>
        <HandoverCodeCard
          code={handoverCodeFor(id)}
          hint="Show it only when you have the item."
        />
      </View>
      <Note>Bring photo ID. Meet in a public place.</Note>
    </ClaimScreen>
  );
}

const styles = StyleSheet.create({
  banner: { marginTop: 16 },
  block: { marginTop: 14 },
});
