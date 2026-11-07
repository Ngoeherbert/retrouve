import { useState } from "react";
import { Alert, Image, StyleSheet, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import * as ImagePicker from "expo-image-picker";

import { Button } from "@/components/button";
import {
  ChatBubble,
  ClaimScreen,
  Input,
  Intro,
  Label,
  LinkButton,
  Note,
  PhotoUpload,
  gutter,
} from "@/components/claim-ui";

// TODO: replace with data from lib/mock-claims.ts once it exists
const QUESTION = "What is on the back of the student ID card?";

export default function MoreInfoRequested() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [answer, setAnswer] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);

  const canSend = answer.trim().length > 0;

  const pickPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.7,
    });
    if (!result.canceled) setPhoto(result.assets[0].uri);
  };

  const send = () => {
    // TODO: submit { answer, photo } to the backend
    router.replace({ pathname: "/claim/[id]/status", params: { id } });
  };

  const withdraw = () =>
    Alert.alert("Withdraw claim?", "Daniel will be told you withdrew it.", [
      { text: "Keep claim", style: "cancel" },
      {
        text: "Withdraw",
        style: "destructive",
        // TODO: call the backend, then leave the flow
        onPress: () => router.replace("/(tabs)"),
      },
    ]);

  return (
    <ClaimScreen
      title="Your claim"
      footer={
        <>
          <View
            style={!canSend && styles.disabled}
            pointerEvents={canSend ? "auto" : "none"}
          >
            <Button label="Send answer" onPress={send} disabled={!canSend} />
          </View>
          <LinkButton danger label="Withdraw claim" onPress={withdraw} />
        </>
      }
    >
      <Intro
        title="Daniel needs one more detail"
        subtitle="Answer to keep your claim moving."
      />
      <ChatBubble initials="DT" text={QUESTION} />

      <View style={styles.group}>
        <Label>Your answer</Label>
        <Input
          value={answer}
          onChangeText={setAnswer}
          placeholder="My signature and the faculty stamp"
        />
      </View>

      <View style={styles.group}>
        <PhotoUpload
          label={photo ? "Photo added. Tap to change" : "Add a photo (optional)"}
          onPress={pickPhoto}
        />
        {photo ? <Image source={{ uri: photo }} style={styles.preview} /> : null}
      </View>

      <Note>Your reply goes only to Daniel.</Note>
    </ClaimScreen>
  );
}

const styles = StyleSheet.create({
  disabled: { opacity: 0.5 },
  group: { ...gutter, marginTop: 20 },
  preview: { marginTop: 12, height: 140, borderRadius: 24, width: "100%" },
});
