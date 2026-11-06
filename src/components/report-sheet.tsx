import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/components/button";
import { Brand as brand } from "@/constants/theme";

export type ReportReason = "scam" | "fake" | "inappropriate" | "duplicate";

const REASONS: { key: ReportReason; label: string }[] = [
  { key: "scam", label: "Scam or asking for money" },
  { key: "fake", label: "Fake or misleading" },
  { key: "inappropriate", label: "Inappropriate content" },
  { key: "duplicate", label: "Duplicate post" },
];

type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit?: (payload: { reason: ReportReason }) => void;
};

export function ReportSheet({ visible, onClose, onSubmit }: Props) {
  const insets = useSafeAreaInsets();
  const [reason, setReason] = useState<ReportReason>("scam");
  const [prevVisible, setPrevVisible] = useState(visible);

  if (visible && !prevVisible) setReason("scam");
  if (visible !== prevVisible) setPrevVisible(visible);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={styles.root}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Close"
          style={styles.backdrop}
          onPress={onClose}
        />

        <View style={styles.sheet}>
          <View style={styles.handle} />

          <Text style={styles.title}>Report this post</Text>
          <Text style={styles.subtitle}>
            Tell us what is wrong. The poster will not see your name.
          </Text>

          <View style={styles.options}>
            {REASONS.map((r) => {
              const selected = r.key === reason;
              return (
                <Pressable
                  key={r.key}
                  accessibilityRole="radio"
                  accessibilityState={{ selected }}
                  onPress={() => setReason(r.key)}
                  style={[styles.option, selected && styles.optionSelected]}
                >
                  <View style={styles.radio}>
                    {selected ? <View style={styles.radioDot} /> : null}
                  </View>
                  <Text style={styles.optionText}>{r.label}</Text>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.spacer} />

          <View style={{ marginBottom: Math.max(insets.bottom, 20) + 2 }}>
            <Button
              label="Send report"
              tone="yellow"
              onPress={() => onSubmit?.({ reason })}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default function ReportPostRoute() {
  const close = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/(tabs)");
  };

  return (
    <ReportSheet
      visible
      onClose={close}
      onSubmit={() => {
        close();
      }}
    />
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, justifyContent: "flex-end" },
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(15, 20, 28, 0.68)",
  },

  sheet: {
    height: "76%",
    backgroundColor: brand.bg,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
  },
  handle: {
    alignSelf: "center",
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#D0D4DD",
    marginTop: 10,
  },

  title: {
    marginTop: 16,
    fontSize: 28,
    fontWeight: "800",
    color: brand.ink,
    letterSpacing: -0.5,
  },
  subtitle: { marginTop: 6, fontSize: 14, color: brand.muted },

  options: { marginTop: 16, gap: 10 },
  option: {
    height: 56,
    borderRadius: 20,
    backgroundColor: brand.white,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    borderWidth: 2,
    borderColor: "transparent",
  },
  optionSelected: { borderColor: brand.ink },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: brand.ink,
    alignItems: "center",
    justifyContent: "center",
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: brand.ink,
  },
  optionText: {
    marginLeft: 14,
    fontSize: 16,
    fontWeight: "700",
    color: brand.ink,
  },

  spacer: { flex: 1 },
});
