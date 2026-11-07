/* eslint-disable react-hooks/refs -- Animated.Value ref is created once and interpolated for render */
import { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet } from "react-native";

import { Brand as brand } from "@/constants/theme";

type Props = {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  accessibilityLabel?: string;
};

const TRACK_W = 50;
const TRACK_H = 30;
const PADDING = 3;
const THUMB = TRACK_H - PADDING * 2;
const TRAVEL = TRACK_W - THUMB - PADDING * 2;

export function ToggleSwitch({
  value,
  onValueChange,
  disabled,
  accessibilityLabel,
}: Props) {
  const anim = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(anim, {
      toValue: value ? 1 : 0,
      useNativeDriver: true,
      friction: 8,
      tension: 80,
    }).start();
  }, [value, anim]);

  const translateX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, TRAVEL],
  });

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ checked: value, disabled: !!disabled }}
      disabled={disabled}
      onPress={() => onValueChange(!value)}
      style={({ pressed }) => [
        styles.track,
        value ? styles.trackOn : styles.trackOff,
        pressed && !disabled && styles.pressed,
      ]}
    >
      <Animated.View style={[styles.thumb, { transform: [{ translateX }] }]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: {
    width: TRACK_W,
    height: TRACK_H,
    borderRadius: TRACK_H / 2,
    padding: PADDING,
    justifyContent: "center",
  },
  trackOn: { backgroundColor: brand.ink },
  trackOff: { backgroundColor: "#D3D8E2" },
  thumb: {
    width: THUMB,
    height: THUMB,
    borderRadius: THUMB / 2,
    backgroundColor: brand.white,
  },
  pressed: { opacity: 0.85 },
});

export default ToggleSwitch;
