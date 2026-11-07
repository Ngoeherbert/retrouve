import { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import * as ImagePicker from "expo-image-picker";

import { Button } from "@/components/button";
import {
  Badge,
  ClaimScreen,
  Input,
  Intro,
  Label,
  PhotoUpload,
  gutter,
} from "@/components/claim-ui";
import { Icon } from "@/components/icon";
import { Brand as brand } from "@/constants/theme";

// TODO: replace with data from lib/mock-claims.ts once it exists
const ITEM = { title: "Black leather wallet" };

export default function ProveItIsYours() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [inside, setInside] = useState("");
  const [marks, setMarks] = useState("");
  const [lostWhen, setLostWhen] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);

  const canSend =
    inside.trim().length > 0 &&
    marks.trim().length > 0 &&
    lostWhen.trim().length > 0;

  const pickPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.7,
    });
    if (!result.canceled) setPhoto(result.assets[0].uri);
  };

  const send = () => {
    // TODO: submit { inside, marks, lostWhen, photo } to the backend
    router.push({ pathname: "/claim/[id]/sent", params: { id } });
  };

  return (
    <ClaimScreen
      right={<Text style={styles.step}>Step 2 of 3</Text>}
      footer={
        <View
          style={!canSend && styles.disabled}
          pointerEvents={canSend ? "auto" : "none"}
        >
          <Button label="Send claim" onPress={send} disabled={!canSend} />
        </View>
      }
    >
      <Intro
        title="Prove it is yours"
        subtitle="Answers go only to the finder. A good answer gets your item back faster."
      />

      <View style={styles.compactCard}>
        <View style={styles.compactThumb}>
          <Icon name="wallet" size={22} color={brand.muted} />
        </View>
        <Text style={styles.compactTitle} numberOfLines={1}>
          {ITEM.title}
        </Text>
        <Badge label="Found" tone="ink" />
      </View>

      <View style={styles.group}>
        <Label>What is inside?</Label>
        <Input
          value={inside}
          onChangeText={setInside}
          placeholder="One bank card, student ID"
          returnKeyType="next"
        />
      </View>

      <View style={styles.group}>
        <Label>Any marks or details?</Label>
        <Input
          value={marks}
          onChangeText={setMarks}
          placeholder="Small tear near the zip"
          returnKeyType="next"
        />
      </View>

      <View style={styles.group}>
        <Label>When did you lose it?</Label>
        <Input
          value={lostWhen}
          onChangeText={setLostWhen}
          placeholder="Today, around 9 am"
          returnKeyType="done"
        />
      </View>

      <View style={styles.group}>
        <PhotoUpload
          label={photo ? "Photo added. Tap to change" : "Add a photo or receipt"}
          onPress={pickPhoto}
        />
        {photo ? <Image source={{ uri: photo }} style={styles.preview} /> : null}
      </View>
    </ClaimScreen>
  );
}

const styles = StyleSheet.create({
  step: { fontSize: 15, fontWeight: "800", color: brand.muted },
  disabled: { opacity: 0.5 },
  group: { ...gutter, marginTop: 18 },
  compactCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: brand.white,
    borderRadius: 28,
    padding: 10,
    marginHorizontal: 20,
  },
  compactThumb: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#D6DFEA",
    alignItems: "center",
    justifyContent: "center",
  },
  compactTitle: {
    flex: 1,
    marginLeft: 12,
    fontSize: 17,
    fontWeight: "800",
    color: brand.ink,
  },
  preview: {
    marginTop: 12,
    height: 140,
    borderRadius: 24,
    width: "100%",
  },
});
