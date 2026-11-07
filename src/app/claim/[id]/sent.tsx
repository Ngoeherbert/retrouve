import { router, useLocalSearchParams } from "expo-router";

import { Button } from "@/components/button";
import {
  CheckCircle,
  ClaimScreen,
  Intro,
  ItemCard,
  PillButton,
  SectionLabel,
  StepList,
} from "@/components/claim-ui";

// TODO: replace with data from lib/mock-claims.ts once it exists
const ITEM = { title: "Black leather wallet", finder: "Daniel T." };

const STEPS = [
  { title: "Daniel reviews", sub: "You get a notification" },
  { title: "You may get a question", sub: "Reply in the chat" },
  { title: "Arrange pickup", sub: "In a public place or at the desk" },
];

export default function ClaimSent() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <ClaimScreen
      hideHeader
      topOffset={48}
      footer={
        <>
          <Button
            label="Track my claim"
            onPress={() =>
              router.replace({ pathname: "/claim/[id]/status", params: { id } })
            }
          />
          <PillButton
            label="Back to home"
            onPress={() => router.replace("/(tabs)")}
          />
        </>
      }
    >
      <CheckCircle />
      <Intro
        center
        title="Claim sent"
        subtitle="Daniel will review your answers. Most claims are answered within a day."
      />
      <ItemCard
        title={ITEM.title}
        meta={`Found by ${ITEM.finder}`}
        badge="Found"
        badgeTone="ink"
      />
      <SectionLabel>What happens next</SectionLabel>
      <StepList steps={STEPS} />
    </ClaimScreen>
  );
}
