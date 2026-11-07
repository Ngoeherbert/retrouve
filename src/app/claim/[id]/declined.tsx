import { StyleSheet, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { Button } from "@/components/button";
import {
  ActionRows,
  ClaimScreen,
  Intro,
  Note,
  TextCard,
  XCircle,
} from "@/components/claim-ui";

// TODO: replace with data from lib/mock-claims.ts once it exists
const REASON = "The details did not match the item.";

export default function ClaimDeclined() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <ClaimScreen
      hideHeader
      topOffset={48}
      footer={
        <Button
          label="Browse other items"
          onPress={() => router.replace("/(tabs)/search")}
        />
      }
    >
      <XCircle />
      <Intro
        center
        title="Claim not approved"
        subtitle="Daniel could not match your answers to the item."
      />
      <View style={styles.reason}>
        <TextCard label="Reason from Daniel" text={REASON} />
      </View>
      <View style={styles.actions}>
        <ActionRows
          rows={[
            {
              label: "Add more proof and try again",
              onPress: () =>
                router.push({ pathname: "/claim/[id]/prove", params: { id } }),
            },
            {
              label: "Message Daniel",
              onPress: () =>
                router.push({ pathname: "/messages/[id]", params: { id } }),
            },
            {
              label: "Report a problem",
              onPress: () => router.push("/report-problem"),
            },
          ]}
        />
      </View>
      <Note>This does not affect your rating.</Note>
    </ClaimScreen>
  );
}

const styles = StyleSheet.create({
  reason: { marginTop: 56 },
  actions: { marginTop: 14 },
});
