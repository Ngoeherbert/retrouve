import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/components/button";
import { Icon } from "@/components/icon";
import { Brand as brand } from "@/constants/theme";

const STEP = 1;
const TOTAL_STEPS = 4;

type Mode = "lost" | "found";

const CATEGORIES = [
  "Bags",
  "Electronics",
  "Wallets",
  "Keys",
  "Documents",
  "Other",
];

export default function WhatHappened() {
  const insets = useSafeAreaInsets();

  const [mode, setMode] = useState<Mode>("lost");
  const [name, setName] = useState("Grey backpack");
  const [category, setCategory] = useState("Bags");
  const [details, setDetails] = useState("");

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: insets.top + 12,
          paddingBottom: Math.max(insets.bottom, 20) + 4,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Go back"
            onPress={() =>
              router.canGoBack() ? router.back() : router.replace("/(tabs)")
            }
            hitSlop={8}
            className="w-12 h-12 rounded-full bg-white items-center justify-center"
            style={({ pressed }) => pressed && styles.pressed}
          >
            <Icon name="back" size={22} color={brand.ink} strokeWidth={2} />
          </Pressable>
          <Text style={styles.step}>
            Step {STEP} of {TOTAL_STEPS}
          </Text>
        </View>

        <View style={styles.progress}>
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <View
              key={i}
              style={[styles.progressSeg, i < STEP && styles.progressSegActive]}
            />
          ))}
        </View>

        <Text style={styles.title}>What happened?</Text>

        <View style={styles.content}>
          {/* Lost / found toggle */}
          <View style={styles.segmented}>
            {(["lost", "found"] as Mode[]).map((m) => {
              const active = mode === m;
              return (
                <Pressable
                  key={m}
                  accessibilityRole="button"
                  accessibilityState={{ selected: active }}
                  onPress={() => setMode(m)}
                  style={[styles.segment, active && styles.segmentActive]}
                >
                  <Text
                    style={[
                      styles.segmentText,
                      { color: active ? brand.white : brand.muted },
                    ]}
                  >
                    {m === "lost" ? "I lost it" : "I found it"}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* Photos */}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Add photos"
            onPress={() => {
              /* open image picker */
            }}
            className="h-[112px] rounded-[20px] border-[1.5px] border-dashed border-[#B9BCC9] items-center justify-center"
            style={({ pressed }) => pressed && styles.pressed}
          >
            <Icon name="camera" size={22} color={brand.ink} />
            <Text className="mt-2 text-sm font-bold" style={{ color: brand.ink }}>
              Add photos
            </Text>
          </Pressable>

          {/* Item name */}
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="What is it?"
            placeholderTextColor={brand.muted}
            style={styles.input}
          />

          {/* Category */}
          <View>
            <Text style={styles.label}>Category</Text>
            <View style={styles.chips}>
              {CATEGORIES.map((c) => {
                const active = c === category;
                return (
                  <Pressable
                    key={c}
                    accessibilityRole="button"
                    accessibilityState={{ selected: active }}
                    onPress={() => setCategory(c)}
                    style={[styles.chip, active && styles.chipActive]}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        { color: active ? brand.white : brand.ink },
                      ]}
                    >
                      {c}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* Details */}
          <TextInput
            value={details}
            onChangeText={setDetails}
            placeholder="Add details that only the owner would know"
            placeholderTextColor={brand.muted}
            multiline
            textAlignVertical="top"
            style={styles.textarea}
          />
        </View>

        <View style={styles.spacer} />

        <View style={styles.footer}>
          <Button
            label="Continue"
            tone="yellow"
            onPress={() => router.push("/report/step-2")}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: brand.bg },
  pressed: { opacity: 0.85 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    height: 48,
  },
  step: { fontSize: 13, fontWeight: "700", color: brand.muted },

  progress: {
    flexDirection: "row",
    gap: 6,
    paddingHorizontal: 20,
    marginTop: 14,
  },
  progressSeg: {
    flex: 1,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#DDE0E8",
  },
  progressSegActive: { backgroundColor: brand.ink },

  title: {
    paddingHorizontal: 20,
    marginTop: 14,
    fontSize: 30,
    fontWeight: "800",
    color: brand.ink,
    letterSpacing: -0.5,
  },

  content: { paddingHorizontal: 20, marginTop: 16, gap: 14 },

  segmented: {
    flexDirection: "row",
    backgroundColor: "#E6E8EE",
    borderRadius: 24,
    padding: 4,
  },
  segment: {
    flex: 1,
    height: 44,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  segmentActive: { backgroundColor: brand.ink },
  segmentText: { fontSize: 15, fontWeight: "800" },

  input: {
    height: 56,
    borderRadius: 20,
    backgroundColor: brand.white,
    paddingHorizontal: 18,
    fontSize: 16,
    color: brand.ink,
  },

  label: {
    fontSize: 13,
    fontWeight: "700",
    color: brand.muted,
    marginBottom: 10,
  },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: {
    height: 38,
    paddingHorizontal: 16,
    borderRadius: 19,
    backgroundColor: brand.white,
    alignItems: "center",
    justifyContent: "center",
  },
  chipActive: { backgroundColor: brand.ink },
  chipText: { fontSize: 13, fontWeight: "800" },

  textarea: {
    minHeight: 84,
    borderRadius: 20,
    backgroundColor: brand.white,
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 16,
    fontSize: 16,
    color: brand.ink,
  },

  spacer: { flex: 1, minHeight: 24 },
  footer: { paddingHorizontal: 20 },
});
