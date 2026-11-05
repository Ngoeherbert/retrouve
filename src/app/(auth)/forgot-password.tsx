import { useState } from "react";
import { router } from "expo-router";

import { AuthLink, AuthScreen } from "@/components/auth-screen";
import { Button } from "@/components/button";
import { Field } from "@/components/field";

export default function ForgotPassword() {
  const [identifier, setIdentifier] = useState("");

  const ready = identifier.trim().length > 4;

  const submit = () => {
    router.push({
      pathname: "/(auth)/verify-phone",
      params: { target: identifier },
    });
  };

  return (
    <AuthScreen
      title="Forgot password?"
      subtitle="Enter your email or phone and we will send you a link or code."
      footer={
        <>
          <Button label="Send reset link" onPress={submit} disabled={!ready} />
          <AuthLink action="Back to sign in" onPress={() => router.back()} />
        </>
      }
    >
      <Field
        label="Email or phone"
        placeholder="you@example.com or phone number"
        value={identifier}
        onChangeText={setIdentifier}
        keyboardType="email-address"
        autoComplete="username"
        textContentType="username"
        returnKeyType="send"
        onSubmitEditing={ready ? submit : undefined}
      />
    </AuthScreen>
  );
}
