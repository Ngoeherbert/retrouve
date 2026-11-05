import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from "react-native";

import { Brand as brand } from "@/constants/theme";

type Props = TextInputProps & {
  label: string;
  secure?: boolean;
};

export function Field({ label, secure, ...input }: Props) {
  const [hidden, setHidden] = useState(true);

  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.box}>
        <TextInput
          placeholderTextColor={brand.muted}
          autoCapitalize="none"
          autoCorrect={false}
          {...input}
          secureTextEntry={secure && hidden}
          style={styles.input}
        />
        {secure ? (
          <Pressable
            hitSlop={12}
            accessibilityRole="button"
            accessibilityLabel={hidden ? "Show password" : "Hide password"}
            onPress={() => setHidden((h) => !h)}
          >
            <Text style={styles.toggle}>{hidden ? "Show" : "Hide"}</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginTop: 18 },
  label: {
    fontSize: 13.5,
    fontWeight: "700",
    color: brand.ink,
    marginBottom: 8,
  },
  box: {
    height: 56,
    borderRadius: 20,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: brand.white,
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    color: brand.ink,
  },
  toggle: {
    marginLeft: 12,
    fontSize: 14,
    fontWeight: "700",
    color: brand.muted,
  },
});
