import { Pressable, StyleSheet, TextInput, View } from "react-native";

import { Brand as brand } from "@/constants/theme";
import { Icon } from "@/components/icon";

type Props = {
  value: string;
  onChangeText: (value: string) => void;
  onFilter: () => void;
};

export function SearchBar({ value, onChangeText, onFilter }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.field}>
        <Icon name="search" size={20} color={brand.muted} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder="Search lost and found items"
          placeholderTextColor={brand.muted}
          returnKeyType="search"
          autoCorrect={false}
          accessibilityLabel="Search lost and found items"
          style={styles.input}
        />
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Filters"
        onPress={onFilter}
        style={({ pressed }) => [styles.filter, pressed && styles.pressed]}
      >
        <Icon name="filter" size={22} color={brand.white} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 12 },
  field: {
    flex: 1,
    height: 54,
    paddingHorizontal: 18,
    borderRadius: 27,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: brand.white,
  },
  input: {
    flex: 1,
    height: "100%",
    marginLeft: 12,
    fontSize: 16,
    color: brand.ink,
  },
  filter: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: brand.ink,
  },
  pressed: { opacity: 0.9 },
});
