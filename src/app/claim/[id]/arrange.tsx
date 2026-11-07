import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { Button } from "@/components/button";
import {
  Chip,
  ClaimScreen,
  Input,
  Intro,
  Label,
  Note,
  RadioCard,
  gutter,
} from "@/components/claim-ui";
import { PICKUP_PLACE } from "@/lib/place";

// TODO: replace with data from lib/mock-claims.ts once it exists
const CLAIMANT = "Amina";
const TIMES = ["Today 2 pm", "Today 5 pm", "Tomorrow 9 am", "Pick a time"];

type Mode = "public" | "desk";

export default function ArrangePickup() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [mode, setMode] = useState<Mode>("public");
  const [place, setPlace] = useState("Molyko Market main gate");
  const [time, setTime] = useState(TIMES[0]);

  const desk = mode === "desk";
  const shownPlace = desk ? PICKUP_PLACE : place;
  const canSend = shownPlace.trim().length > 0;

  const send = () => {
    // TODO: send { claimId: id, mode, place: shownPlace, time } to the backend
    router.replace("/(tabs)");
  };

  return (
    <ClaimScreen
      title="Arrange pickup"
      footer={
        <View
          style={!canSend && styles.disabled}
          pointerEvents={canSend ? "auto" : "none"}
        >
          <Button label="Send pickup details" onPress={send} disabled={!canSend} />
        </View>
      }
    >
      <Intro
        title="Where should you meet?"
        subtitle={`${CLAIMANT} will see this right away.`}
      />

      <View style={styles.cards}>
        <RadioCard
          title="Meet in a public place"
          sub="Market, campus gate, bus station"
          selected={mode === "public"}
          onPress={() => setMode("public")}
        />
        <RadioCard
          title={`Drop at ${PICKUP_PLACE}`}
          sub="Staff hand it over"
          selected={desk}
          onPress={() => setMode("desk")}
        />
      </View>

      <View style={styles.group}>
        <Label>Place</Label>
        <Input
          value={shownPlace}
          onChangeText={setPlace}
          editable={!desk}
          placeholder="Where will you meet?"
          style={desk && styles.locked}
        />
      </View>

      <View style={styles.group}>
        <Label>Time</Label>
        <View style={styles.chips}>
          {TIMES.map((t) => (
            <Chip key={t} label={t} active={time === t} onPress={() => setTime(t)} />
          ))}
        </View>
      </View>

      <Note>Never meet somewhere private. Never accept money.</Note>
    </ClaimScreen>
  );
}

const styles = StyleSheet.create({
  disabled: { opacity: 0.5 },
  cards: { ...gutter, gap: 10 },
  group: { ...gutter, marginTop: 22 },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  locked: { opacity: 0.6 },
});
