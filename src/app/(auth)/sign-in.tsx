import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";

import { AuthLink, AuthScreen } from "@/components/auth-screen";
import { Button } from "@/components/button";
import { Field } from "@/components/field";
import { Brand as brand } from "@/constants/theme";

export default function SignIn() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const ready = identifier.trim().length > 0 && password.length > 0;

  const submit = () => {
    router.replace("/(tabs)");
  };

  const continueWithGoogle = () => {
    router.replace("/(tabs)");
  };

  return (
    <AuthScreen
      title="Welcome back"
      subtitle="Sign in to check your reports and messages."
      footer={
        <AuthLink
          prompt="New here?"
          action="Create account"
          onPress={() => router.replace("/(auth)/sign-up")}
        />
      }
    >
      <Field
        label="Email or phone"
        placeholder="Email or phone number"
        value={identifier}
        onChangeText={setIdentifier}
        keyboardType="email-address"
        autoComplete="username"
        textContentType="username"
        returnKeyType="next"
      />
      <Field
        label="Password"
        placeholder="Enter your password"
        secure
        value={password}
        onChangeText={setPassword}
        autoComplete="current-password"
        textContentType="password"
        returnKeyType="go"
        onSubmitEditing={ready ? submit : undefined}
      />

      <Pressable
        accessibilityRole="link"
        hitSlop={8}
        onPress={() => router.push("/(auth)/forgot-password")}
        style={styles.forgot}
      >
        <Text style={styles.forgotLabel}>Forgot password?</Text>
      </Pressable>

      <View style={styles.primary}>
        <Button label="Sign in" onPress={submit} disabled={!ready} />
      </View>

      <View style={styles.divider}>
        <View style={styles.rule} />
        <Text style={styles.or}>or</Text>
        <View style={styles.rule} />
      </View>

      <Button
        label="Continue with Google"
        tone="white"
        onPress={continueWithGoogle}
        leading={<Text style={styles.g}>G</Text>}
      />
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  forgot: { alignSelf: "flex-end", marginTop: 14 },
  forgotLabel: { fontSize: 14, fontWeight: "700", color: brand.ink },

  primary: { marginTop: 16 },

  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 22,
  },
  rule: { flex: 1, height: 1, backgroundColor: brand.ink, opacity: 0.1 },
  or: { marginHorizontal: 12, fontSize: 13, color: brand.muted },

  g: { fontSize: 20, fontWeight: "800", color: brand.ink },
});
