import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Brand as brand } from "@/constants/theme";

export default function Home() {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, backgroundColor: brand.bg, alignItems: "center", justifyContent: "center", paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <Text style={{ fontSize: 24, fontWeight: "800", color: brand.ink }}>Home</Text>
    </View>
  );
}
