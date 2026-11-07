import { Alert } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { Button } from "@/components/button";
import {
  ClaimScreen,
  Intro,
  ItemCard,
  LinkButton,
  Timeline,
} from "@/components/claim-ui";
import { PICKUP_PLACE } from "@/lib/place";

type ClaimStatus = "sent" | "reviewing" | "pickup" | "returned";
const ORDER: ClaimStatus[] = ["sent", "reviewing", "pickup", "returned"];

// TODO: replace with data from lib/mock-claims.ts once it exists
const ITEM = { title: "Black leather wallet", finder: "Daniel T." };
const STATUS: ClaimStatus = "reviewing";
const SENT_AT = "Today, 10:12";

const STEPS = [
  { title: "Claim sent", sub: SENT_AT },
  { title: "Finder is reviewing", sub: "Waiting for a reply" },
  { title: "Pickup arranged", sub: PICKUP_PLACE },
  { title: "Returned", sub: "Confirm when you have it" },
];

export default function ClaimStatusScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const withdraw = () =>
    Alert.alert("Withdraw claim?", "Daniel will be told you withdrew it.", [
      { text: "Keep claim", style: "cancel" },
      {
        text: "Withdraw",
        style: "destructive",
        // TODO: call the backend, then leave the flow
        onPress: () => router.replace("/(tabs)"),
      },
    ]);

  return (
    <ClaimScreen
      title="Your claim"
      footer={
        <>
          <Button
            label="Message finder"
            onPress={() =>
              router.push({ pathname: "/messages/[id]", params: { id } })
            }
          />
          <LinkButton danger label="Withdraw claim" onPress={withdraw} />
        </>
      }
    >
      <Intro
        title="Claim sent"
        subtitle="Daniel is reviewing your answers. Most claims are answered within a day."
      />
      <ItemCard title={ITEM.title} meta={`Found by ${ITEM.finder}`} />
      <Timeline steps={STEPS} current={ORDER.indexOf(STATUS)} />
    </ClaimScreen>
  );
}
