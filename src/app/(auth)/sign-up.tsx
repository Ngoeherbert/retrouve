import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";

import { AuthLink, AuthScreen } from "@/components/auth-screen";
import { Button } from "@/components/button";
import { Field } from "@/components/field";
import { Brand as brand } from "@/constants/theme";

const STRENGTH_LABELS = ["", "Weak", "Okay", "Strong", "Very strong"];

function scorePassword(value: string) {
  if (!value) return 0;
  let score = 0;
  if (value.length >= 6) score++;
  if (value.length >= 10) score++;
  if (/[a-z]/.test(value) && /[A-Z0-9]/.test(value)) score++;
  if (/[^A-Za-z0-9]/.test(value)) score++;
  return Math.max(score, 1);
}

function StrengthMeter({ score }: { score: number }) {
  return (
    <View style={styles.meter}>
      <View style={styles.segments}>
        {[1, 2, 3, 4].map((n) => (
          <View
            key={n}
            style={[styles.segment, n <= score && styles.segmentOn]}
          />
        ))}
      </View>
      <Text style={styles.meterLabel}>{STRENGTH_LABELS[score]} password</Text>
    </View>
  );
}

function Checkbox({
  checked,
  onToggle,
  children,
}: {
  checked: boolean;
  onToggle: () => void;
  children: string;
}) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      onPress={onToggle}
      style={styles.checkRow}
    >
      <View style={[styles.box, checked && styles.boxOn]}>
        {checked ? <View style={styles.tick} /> : null}
      </View>
      <Text style={styles.checkLabel}>{children}</Text>
    </Pressable>
  );
}

export default function SignUp() {
  const [name, setName] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);

  const score = scorePassword(password);
  const ready =
    name.trim().length > 1 &&
    identifier.trim().length > 4 &&
    score >= 2 &&
    agreed;

  const submit = () => {
    router.push({ pathname: "/(auth)/verify-phone", params: { target: identifier } });
  };

  return (
    <AuthScreen
      title="Create your account"
      subtitle="It takes a minute. Phone or email works."
      footer={
        <>
          <Button label="Create account" onPress={submit} disabled={!ready} />
          <AuthLink
            prompt="Already have one?"
            action="Sign in"
            onPress={() => router.replace("/(auth)/sign-in")}
          />
        </>
      }
    >
      <Field
        label="Full name"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
        autoComplete="name"
        textContentType="name"
        returnKeyType="next"
      />
      <Field
        label="Email or phone"
        value={identifier}
        onChangeText={setIdentifier}
        keyboardType="email-address"
        autoComplete="username"
        textContentType="username"
        returnKeyType="next"
      />
      <Field
        label="Password"
        secure
        value={password}
        onChangeText={setPassword}
        autoComplete="new-password"
        textContentType="newPassword"
        returnKeyType="done"
      />

      {score > 0 ? <StrengthMeter score={score} /> : null}

      <Checkbox checked={agreed} onToggle={() => setAgreed((a) => !a)}>
        I agree to the Terms and Privacy Policy.
      </Checkbox>
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  meter: { marginTop: 12 },
  segments: { flexDirection: "row" },
  segment: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    marginRight: 6,
    backgroundColor: brand.ink,
    opacity: 0.12,
  },
  segmentOn: { opacity: 0.9 },
  meterLabel: { marginTop: 8, fontSize: 13, color: brand.muted },

  checkRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 18,
  },
  box: {
    width: 22,
    height: 22,
    borderRadius: 7,
    borderWidth: 1.6,
    borderColor: brand.ink,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    marginTop: 2,
  },
  boxOn: { backgroundColor: brand.yellow, borderColor: brand.yellow },
  tick: {
    width: 12,
    height: 7,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: brand.ink,
    transform: [{ rotate: "-45deg" }],
    marginTop: -1,
  },
  checkLabel: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: brand.ink,
  },
});
