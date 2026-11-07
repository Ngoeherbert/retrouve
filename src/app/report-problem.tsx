import { useState } from "react";
import { router } from "expo-router";

import { Button } from "@/components/button";
import { Input, RadioCard, Sheet } from "@/components/claim-ui";

const REASONS = [
  "Item is not mine",
  "Finder did not show up",
  "Asked for money",
  "Item damaged or incomplete",
];

export default function ReportProblem() {
  const [reason, setReason] = useState(REASONS[0]);
  const [details, setDetails] = useState("");

  const send = () => {
    // TODO: submit { reason, details } to the backend
    router.back();
  };

  return (
    <Sheet
      title="Report a problem"
      subtitle="Retrouve reviews every report within 24 hours."
      footer={<Button label="Send to Retrouve" onPress={send} />}
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
        value={details}
        onChangeText={setDetails}
        placeholder="Add details (optional)"
      />
    </Sheet>
  );
}
