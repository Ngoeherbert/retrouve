import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { Button } from "@/components/button";
import {
  CheckCircle,
  Chip,
  ClaimScreen,
  Input,
  Intro,
  LinkButton,
  StarRating,
  gutter,
} from "@/components/claim-ui";

// TODO: replace with data from lib/mock-claims.ts once it exists
const FINDER = "Daniel";
const TAGS = ["Friendly", "On time", "Safe meetup", "Easy to reach"];

export default function ItemReturnedAndRating() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [stars, setStars] = useState(5);
  const [tags, setTags] = useState<string[]>([]);
  const [note, setNote] = useState("");

  const toggle = (t: string) =>
    setTags((cur) => (cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]));

  const finish = () => router.replace("/(tabs)");

  const submit = () => {
    // TODO: send { claimId: id, stars, tags, note } to the backend
    finish();
  };

  return (
    <ClaimScreen
      title="Handover"
      footer={
        <>
          <Button label="Submit" onPress={submit} />
          <LinkButton label="Skip" onPress={finish} />
        </>
      }
    >
      <View style={styles.check}>
        <CheckCircle size={80} />
      </View>
      <Intro center title="Item returned" subtitle={`How was ${FINDER}?`} />
      <StarRating value={stars} onChange={setStars} />
      <View style={styles.chips}>
        {TAGS.map((t) => (
          <Chip key={t} label={t} active={tags.includes(t)} onPress={() => toggle(t)} />
        ))}
      </View>
      <View style={styles.note}>
        <Input
          tall
          value={note}
          onChangeText={setNote}
          placeholder="Add a note (optional)"
        />
      </View>
    </ClaimScreen>
  );
}

const styles = StyleSheet.create({
  check: { marginTop: 24 },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    paddingHorizontal: 20,
    marginTop: 16,
  },
  note: { ...gutter, marginTop: 18 },
});
