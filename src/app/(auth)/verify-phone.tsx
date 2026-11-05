import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { AuthScreen } from "@/components/auth-screen";
import { Button } from "@/components/button";
import { Brand as brand } from "@/constants/theme";

const LENGTH = 6;
const RESEND_AFTER = 30;

function mask(target: string) {
  if (target.includes("@")) {
    const [name, domain] = target.split("@");
    return `${name.slice(0, 1)}•••@${domain}`;
  }
  const d = target.replace(/\s/g, "");
  return `${d.slice(0, 4)} ${d.charAt(4)}•• ••• ${d.slice(-3)}`;
}

export default function VerifyCode() {
  const { target } = useLocalSearchParams<{ target?: string }>();
  const [code, setCode] = useState("");
  const [focused, setFocused] = useState(true);
  const [seconds, setSeconds] = useState(RESEND_AFTER);

  const byEmail = !!target?.includes("@");
  const complete = code.length === LENGTH;

  useEffect(() => {
    if (seconds <= 0) return;
    const timer = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [seconds]);

  const resend = () => {
    setCode("");
    setSeconds(RESEND_AFTER);
  };

  const submit = () => {
    router.replace("/(auth)/location-permission");
  };

  return (
    <AuthScreen
      title={byEmail ? "Check your email" : "Check your phone"}
      subtitle={
        target
          ? `We sent a ${LENGTH}-digit code to ${mask(target)}.`
          : `We sent you a ${LENGTH}-digit code.`
      }
      footer={<Button label="Verify" onPress={submit} disabled={!complete} />}
    >
      <View style={styles.cells}>
        {Array.from({ length: LENGTH }, (_, i) => {
          const active = focused && i === code.length;
          return (
            <View key={i} style={[styles.cell, active && styles.cellActive]}>
              {code[i] ? (
                <Text style={styles.digit}>{code[i]}</Text>
              ) : active ? (
                <View style={styles.caret} />
              ) : null}
            </View>
          );
        })}

        <TextInput
          value={code}
          onChangeText={(v) => setCode(v.replace(/\D/g, "").slice(0, LENGTH))}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          autoComplete="sms-otp"
          maxLength={LENGTH}
          autoFocus
          caretHidden
          accessibilityLabel="Verification code"
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0 }}
        />
      </View>

      {seconds > 0 ? (
        <Text style={styles.resend}>
          Resend code in 0:{String(seconds).padStart(2, "0")}
        </Text>
      ) : (
        <Pressable accessibilityRole="button" hitSlop={8} onPress={resend}>
          <Text style={[styles.resend, styles.resendAction]}>Resend code</Text>
        </Pressable>
      )}
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  cells: { flexDirection: "row", gap: 10, marginTop: 28 },
  cell: {
    flex: 1,
    height: 64,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: brand.white,
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  cellActive: { borderColor: brand.ink },
  digit: {
    fontSize: 24,
    fontWeight: "800",
    color: brand.ink,
  },
  caret: { width: 2, height: 28, borderRadius: 1, backgroundColor: brand.ink },
  hiddenInput: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0 },

  resend: { marginTop: 20, fontSize: 15, color: brand.muted },
  resendAction: { fontWeight: "700", color: brand.ink },
});
