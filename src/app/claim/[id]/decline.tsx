import { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";

import {
  Input,
  PillButton,
  RadioCard,
  Sheet,
} from "@/components/claim-ui";

const REASONS = [
  "Details do not match",
  "Could not verify them",
  "Already returned to someone else",
];

export default function DeclineClaim() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [reason, setReason] = useState(REASONS[0]);
  const [message, setMessage] = useState("");

  const decline = () => {
    // TODO: send { claimId: id, reason, message } to the backend
    router.replace("/(tabs)");
  };

  return (
    <Sheet
      title="Decline claim"
      subtitle="The claimant sees your reason."
      footer={
        <>
          <PillButton tone="danger" label="Decline claim" onPress={decline} />
          <PillButton label="Cancel" onPress={() => router.back()} />
        </>
      }
    >
      {REASONS.map((r) => (
        <RadioCard
          key={r}
          title={r}
          selected={reason === r}
          onPress={() => setReason(r)}
        />
      ))}
      <Input
        tall
        value={message}
        onChangeText={setMessage}
        placeholder="Add a message (optional)"
      />
    </Sheet>
  );
}
