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
    <View className="flex-row items-center gap-3">
      <View className="flex-1 h-[54px] px-[18px] rounded-[27px] flex-row items-center bg-white">
        <Icon name="search" size={20} color={brand.muted} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder="Search lost and found items"
          placeholderTextColor={brand.muted}
          returnKeyType="search"
          autoCorrect={false}
          accessibilityLabel="Search lost and found items"
          className="flex-1 h-full ml-3 text-base"
          style={{ color: brand.ink }}
        />
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Filters"
        onPress={onFilter}
        className="w-[54px] h-[54px] rounded-[27px] items-center justify-center bg-[#0B0F14]"
        style={({ pressed }) => pressed && { opacity: 0.9 }}
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
