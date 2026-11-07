import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/components/button";
import { Icon } from "@/components/icon";
import { ToggleSwitch } from "@/components/toggle-switch";
import { Brand as brand } from "@/constants/theme";

const STEP = 3;
const TOTAL_STEPS = 4;

type AreaKey = "face" | "name" | "id";

const AREAS: { key: AreaKey; label: string }[] = [
  { key: "face", label: "Face photo" },
  { key: "name", label: "Name" },
  { key: "id", label: "ID number" },
];

type Hidden = Record<AreaKey, boolean>;

const YELLOW_BORDER = "#FFD23F";

function DocumentPreview({ hidden }: { hidden: Hidden }) {
  return (
    <View
      className="h-[230px] rounded-[28px] items-center justify-center"
      style={{ backgroundColor: "#D6DFEA" }}
    >
      <View
        className="w-[83%] h-[170px] rounded-[16px] overflow-hidden"
        style={{ backgroundColor: brand.white }}
      >
        <View
          className="absolute rounded-[10px]"
          style={{ left: 16, top: 18, width: 64, height: 76, backgroundColor: "#E4DDEA" }}
        />

        <View
          className="absolute rounded-md overflow-hidden"
          style={{
            left: 10, top: 12, width: 66, height: 88,
            borderWidth: 2,
            borderColor: hidden.face ? YELLOW_BORDER : "transparent",
          }}
        >
          <View style={{ flex: 1, backgroundColor: hidden.face ? "#EDE6F2" : "#8E7FA0" }} />
        </View>

        <View
          className="absolute rounded-md overflow-hidden"
          style={{
            left: 92, top: 18, width: 162, height: 22,
            borderWidth: 2,
            borderColor: hidden.name ? YELLOW_BORDER : "transparent",
          }}
        >
          <View style={{ flex: 1, backgroundColor: hidden.name ? "#CBD0DA" : "#4B5160" }} />
        </View>

        <View className="absolute h-2.5 rounded-[5px]" style={{ left: 96, top: 43, width: 110, backgroundColor: "#C9CDD8" }} />
        <View className="absolute h-2.5 rounded-[5px]" style={{ left: 96, top: 66, width: 130, backgroundColor: "#C9CDD8" }} />

        <View
          className="absolute rounded-md overflow-hidden"
          style={{
            left: 16, top: 112, width: 160, height: 22,
            borderWidth: 2,
            borderColor: hidden.id ? YELLOW_BORDER : "transparent",
          }}
        >
          <View style={{ flex: 1, backgroundColor: hidden.id ? "#CBD0DA" : "#4B5160" }} />
        </View>
        <View className="absolute h-2.5 rounded-[5px]" style={{ left: 176, top: 120, width: 40, backgroundColor: brand.ink }} />
        <View className="absolute h-2.5 rounded-[5px]" style={{ left: 16, top: 142, width: 120, backgroundColor: "#C9CDD8" }} />
      </View>
    </View>
  );
}

export default function HidePrivateDetails() {
  const insets = useSafeAreaInsets();

  const [hidden, setHidden] = useState<Hidden>({
    face: true,
    name: true,
    id: true,
  });
  const [history, setHistory] = useState<Hidden[]>([]);

  const toggle = (key: AreaKey, value: boolean) => {
    setHistory((h) => [...h, hidden]);
    setHidden((prev) => ({ ...prev, [key]: value }));
  };

  const undo = () => {
    setHistory((h) => {
      if (h.length === 0) return h;
      setHidden(h[h.length - 1]);
      return h.slice(0, -1);
    });
  };

  return (
    <View className="flex-1" style={{ backgroundColor: brand.bg }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: insets.top + 12,
          paddingBottom: Math.max(insets.bottom, 20) + 4,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-center px-5 h-12">
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Go back"
            onPress={() =>
              router.canGoBack() ? router.back() : router.replace("/(tabs)")
            }
            hitSlop={8}
            className="w-12 h-12 rounded-full bg-white items-center justify-center"
            style={({ pressed }) => pressed && { opacity: 0.85 }}
          >
            <Icon name="back" size={22} color={brand.ink} strokeWidth={2} />
          </Pressable>
          <Text
            className="absolute left-0 right-0 text-center text-[17px] font-bold"
            style={{ color: brand.ink }}
            pointerEvents="none"
          >
            Step {STEP} of {TOTAL_STEPS}
          </Text>
        </View>

        <View className="flex-row gap-1.5 px-5 mt-3.5">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <View
              key={i}
              className="flex-1 h-[5px] rounded-[3px]"
              style={{ backgroundColor: i < STEP ? brand.ink : "#DDE0E8" }}
            />
          ))}
        </View>

        <Text
          className="px-5 mt-3.5 text-[30px] font-extrabold"
          style={{ color: brand.ink, letterSpacing: -0.5 }}
        >
          Hide private details
        </Text>

        <View className="px-5 mt-3.5 gap-3.5">
          <DocumentPreview hidden={hidden} />

          <Text className="text-[15px] font-extrabold mt-1" style={{ color: brand.ink }}>
            We found {AREAS.length} private areas
          </Text>

          <View className="rounded-[24px] bg-white px-[18px]">
            {AREAS.map((a, i) => (
              <View
                key={a.key}
                className="h-[61px] flex-row items-center justify-between"
                style={i > 0 ? { borderTopWidth: 1, borderTopColor: "#E6E8EE" } : undefined}
              >
                <Text className="text-base font-extrabold" style={{ color: brand.ink }}>
                  {a.label}
                </Text>
                <ToggleSwitch
                  value={hidden[a.key]}
                  onValueChange={(v) => toggle(a.key, v)}
                  accessibilityLabel={`Hide ${a.label}`}
                />
              </View>
            ))}
          </View>

          <View className="flex-row gap-2">
            <Pressable
              accessibilityRole="button"
              onPress={() => {}}
              className="h-[38px] px-4 rounded-[19px] bg-white items-center justify-center"
              style={({ pressed }) => pressed && { opacity: 0.85 }}
            >
              <Text className="text-[13px] font-extrabold" style={{ color: brand.ink }}>
                Blur more by hand
              </Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              disabled={history.length === 0}
              onPress={undo}
              className="h-[38px] px-4 rounded-[19px] bg-white items-center justify-center"
              style={({ pressed }) => [
                history.length === 0 && { opacity: 0.5 },
                pressed && { opacity: 0.85 },
              ]}
            >
              <Text className="text-[13px] font-extrabold" style={{ color: brand.ink }}>
                Undo
              </Text>
            </Pressable>
          </View>
        </View>

        <View className="flex-1 min-h-6" />

        <View className="px-5">
          <Button
            label="Continue"
            tone="yellow"
            onPress={() => router.push("/report/step-4")}
          />
        </View>
      </ScrollView>
    </View>
  );
}
