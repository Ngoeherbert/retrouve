import { useState } from "react";
import { router } from "expo-router";

import { AuthScreen } from "@/components/auth-screen";
import { Button } from "@/components/button";
import { Field } from "@/components/field";

export default function ForgotPassword() {
  const [target, setTarget] = useState("");
  const ready = target.trim().length > 4;

  const submit = () => {
    router.push({ pathname: "/(auth)/verify-phone", params: { target } });
  };

  return (
    <AuthScreen
      title="Reset your password"
      subtitle="Enter your email or phone and we'll send a code."
      footer={<Button label="Send code" onPress={submit} disabled={!ready} />}
    >
      <Field
        label="Email or phone"
        value={target}
        onChangeText={setTarget}
        keyboardType="email-address"
        autoComplete="username"
        textContentType="username"
        returnKeyType="go"
        onSubmitEditing={ready ? submit : undefined}
      />
    </AuthScreen>
  );
}
