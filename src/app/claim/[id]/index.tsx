import { StyleSheet, Text } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { Button } from "@/components/button";
import {
  ClaimScreen,
  Intro,
  ItemCard,
  LinkButton,
  Note,
  StepList,
} from "@/components/claim-ui";
import { Brand as brand } from "@/constants/theme";

// TODO: replace with data from lib/mock-claims.ts once it exists
const ITEM = { title: "Black leather wallet", finder: "Daniel T." };

const STEPS = [
  { title: "Answer a few questions", sub: "Only the real owner would know" },
  { title: "The finder reviews", sub: "Usually within a day" },
  { title: "Arrange pickup", sub: "In a public place or at the desk" },
];

export default function ClaimIntro() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <ClaimScreen
      title="Claim this item"
      right={<Text style={styles.step}>Step 1 of 3</Text>}
      footer={
        <>
          <Button
            label="Start claim"
            onPress={() =>
              router.push({ pathname: "/claim/[id]/prove", params: { id } })
            }
          />
          <LinkButton
            label="Message the finder first"
            onPress={() =>
              router.push({ pathname: "/messages/[id]", params: { id } })
            }
          />
        </>
      }
    >
      <Intro
        title="Is this yours?"
        subtitle="Claims keep items safe. It takes about two minutes."
      />
      <ItemCard
        title={ITEM.title}
        meta={`Found by ${ITEM.finder}`}
        badge="Verified"
        badgeTone="yellow"
      />
      <StepList steps={STEPS} />
      <Note>Never send money to claim an item.</Note>
    </ClaimScreen>
  );
}

const styles = StyleSheet.create({
  step: { fontSize: 15, fontWeight: "800", color: brand.muted },
});
