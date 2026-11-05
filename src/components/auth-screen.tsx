import type { ReactNode } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { Icon } from "@/components/icon";
import { Brand as brand } from "@/constants/theme";

type Props = {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
};

export function AuthScreen({ title, subtitle, children, footer }: Props) {
  const insets = useSafeAreaInsets();

  const goBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/");
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <StatusBar style="dark" />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: insets.top + 12,
            paddingBottom: Math.max(insets.bottom, 20) + 16,
          },
        ]}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={goBack}
          hitSlop={8}
          className="w-12 h-12 rounded-full bg-white items-center justify-center"
          style={({ pressed }) => pressed && { opacity: 0.8 }}
        >
          <Icon name="back" size={22} color={brand.ink} strokeWidth={2} />
        </Pressable>

        <Text accessibilityRole="header" style={styles.title}>
          {title}
        </Text>
        <Text style={styles.subtitle}>{subtitle}</Text>

        {children}

        <View style={styles.spacer} />
        {footer}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

type LinkProps = {
  prompt?: string;
  action: string;
  onPress: () => void;
};

export function AuthLink({ prompt, action, onPress }: LinkProps) {
  return (
    <Pressable
      accessibilityRole="link"
      onPress={onPress}
      hitSlop={8}
      style={styles.link}
    >
      <Text style={styles.linkPrompt}>
        {prompt ? `${prompt} ` : ""}
        <Text style={styles.linkAction}>{action}</Text>
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: brand.bg },
  content: { flexGrow: 1, paddingHorizontal: 20 },

  title: {
    marginTop: 22,
    fontSize: 33,
    lineHeight: 38,
    fontWeight: "800",
    letterSpacing: -1.2,
    color: brand.ink,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 16.5,
    lineHeight: 22,
    color: brand.muted,
  },

  spacer: { flex: 1, minHeight: 28 },

  link: { alignSelf: "center", marginTop: 18 },
  linkPrompt: { fontSize: 15, color: brand.muted },
  linkAction: { fontWeight: "700", color: brand.ink },
});