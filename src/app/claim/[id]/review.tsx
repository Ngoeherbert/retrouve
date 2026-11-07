import { StyleSheet, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { Button } from "@/components/button";
import {
  Avatar,
  Badge,
  ClaimScreen,
  Intro,
  LinkButton,
  PillButton,
  QACard,
  SectionLabel,
  TextCard,
} from "@/components/claim-ui";
import { Brand as brand } from "@/constants/theme";

// TODO: replace with data from lib/mock-claims.ts once it exists
const CLAIMANT = { name: "Amina Mbah", initials: "AM", tint: "#E6DAEE", claimed: "Claimed 12 min ago" };
const ANSWERS = [
  { question: "What is inside?", answer: "One bank card, student ID" },
  { question: "Marks or details?", answer: "Small tear near the zip" },
  { question: "When was it lost?", answer: "Today, around 9 am" },
];
const PRIVATE_NOTE = "Two cards, tear near the zip";

export default function ReviewClaim() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <ClaimScreen
      footer={
        <>
          <Button
            label="Approve and arrange pickup"
            onPress={() =>
              router.push({ pathname: "/claim/[id]/arrange", params: { id } })
            }
          />
          <PillButton
            label="Ask a question"
            onPress={() =>
              router.push({ pathname: "/messages/[id]", params: { id } })
            }
          />
          <LinkButton
            danger
            label="Decline claim"
            onPress={() =>
              router.push({ pathname: "/claim/[id]/decline", params: { id } })
            }
          />
        </>
      }
    >
      <Intro title="Review claim" />
      <View style={styles.claimant}>
        <Avatar initials={CLAIMANT.initials} tint={CLAIMANT.tint} size={52} />
        <View style={styles.body}>
          <Text style={styles.name}>{CLAIMANT.name}</Text>
          <Text style={styles.sub}>{CLAIMANT.claimed}</Text>
        </View>
        <Badge label="Verified" tone="yellow" />
      </View>
      <SectionLabel>Their answers</SectionLabel>
      <QACard items={ANSWERS} />
      <View style={styles.note}>
        <TextCard label="Your private note" text={PRIVATE_NOTE} tone="yellow" />
      </View>
    </ClaimScreen>
  );
}

const styles = StyleSheet.create({
  claimant: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: brand.white,
    borderRadius: 28,
    padding: 14,
    marginHorizontal: 20,
  },
  body: { flex: 1, marginLeft: 14, minWidth: 0 },
  name: { fontSize: 19, fontWeight: "800", color: brand.ink },
  sub: { marginTop: 3, fontSize: 15, color: brand.muted },
  note: { marginTop: 14 },
});
