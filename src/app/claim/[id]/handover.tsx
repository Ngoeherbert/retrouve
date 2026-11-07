import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { Button } from "@/components/button";
import {
  CodeBoxes,
  ClaimScreen,
  DANGER,
  Intro,
  ItemCard,
  LinkButton,
} from "@/components/claim-ui";
import { handoverCodeFor } from "@/lib/handover";

// TODO: replace with data from lib/mock-claims.ts once it exists
const ITEM = { title: "Black leather wallet", finder: "Daniel T." };
const CLAIMANT = "Amina";

export default function ConfirmHandoverCode() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [digits, setDigits] = useState("");
  const [wrong, setWrong] = useState(false);

  const complete = digits.length === 4;

  const confirm = () => {
    // handoverCodeFor returns "RT-4821"; the screen only collects the digits
    const expected = handoverCodeFor(id).replace(/\D/g, "");
    if (digits !== expected) {
      setWrong(true);
      setDigits("");
      return;
    }
    // TODO: tell the backend the handover is confirmed
    router.replace("/(tabs)");
  };

  return (
    <ClaimScreen
      title="Confirm handover"
      footer={
        <>
          <View
            style={!complete && styles.disabled}
            pointerEvents={complete ? "auto" : "none"}
          >
            <Button label="Confirm handover" onPress={confirm} disabled={!complete} />
          </View>
          <LinkButton
            label="Cannot verify? Report a problem"
            onPress={() => router.push("/report-problem")}
          />
        </>
      }
    >
      <Intro
        title="Enter the owner code"
        subtitle={`Ask ${CLAIMANT} for the code shown in her app. It proves she has met you.`}
      />
      <CodeBoxes
        value={digits}
        onChange={(v) => {
          setWrong(false);
          setDigits(v);
        }}
      />
      {wrong ? (
        <Text style={styles.error}>That code does not match. Try again.</Text>
      ) : null}
      <View style={styles.item}>
        <ItemCard
          title={ITEM.title}
          meta={`Found by ${ITEM.finder}`}
          badge="Found"
          badgeTone="ink"
        />
      </View>
    </ClaimScreen>
  );
}

const styles = StyleSheet.create({
  disabled: { opacity: 0.5 },
  item: { marginTop: 22 },
  error: { marginTop: 10, paddingHorizontal: 26, fontSize: 14, color: DANGER },
});
