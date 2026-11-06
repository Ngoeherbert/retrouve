import { Keyboard, Pressable, TextInput, View } from "react-native";

import { Brand as brand } from "@/constants/theme";
import { Icon } from "@/components/icon";

type Props = {
  value: string;
  onChangeText: (value: string) => void;
  onFilter: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  autoFocus?: boolean;
};

export function SearchBar({
  value,
  onChangeText,
  onFilter,
  onFocus,
  onBlur,
  autoFocus,
}: Props) {
  return (
    <View className="h-[54px] px-3 rounded-[27px] flex-row items-center bg-white">
      <Icon name="search" size={20} color={brand.muted} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onFocus={onFocus}
        onBlur={onBlur}
        autoFocus={autoFocus}
        placeholder="Search lost and found items"
        placeholderTextColor={brand.muted}
        returnKeyType="search"
        autoCorrect={false}
        accessibilityLabel="Search lost and found items"
        className="flex-1 mx-2.5 text-base"
        textAlign="left"
        textAlignVertical="center"
        style={{
          color: brand.ink,
          paddingVertical: 0,
          paddingHorizontal: 0,
          lineHeight: 20,
          includeFontPadding: false,
        }}
      />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={value.length > 0 ? "Clear search" : "Filters"}
        onPress={() => {
          if (value.length > 0) {
            onChangeText("");
            Keyboard.dismiss();
            return;
          }
          onFilter();
        }}
        hitSlop={8}
        className="w-10 h-10 rounded-full items-center justify-center bg-[#0B0F14]"
        style={({ pressed }) => pressed && { opacity: 0.85 }}
      >
        <Icon
          name={value.length > 0 ? "close" : "filter"}
          size={20}
          color={brand.white}
          strokeWidth={2}
        />
      </Pressable>
    </View>
  );
}
