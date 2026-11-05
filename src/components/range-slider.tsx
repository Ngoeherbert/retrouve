import { useRef, useState } from "react";
import {
  PanResponder,
  StyleSheet,
  View,
  type LayoutChangeEvent,
} from "react-native";

import { Brand as brand } from "@/constants/theme";

const THUMB = 28;

type Props = {
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
};

export function RangeSlider({ value, min, max, onChange }: Props) {
  const [width, setWidth] = useState(0);
  const box = useRef<any>(null);

  const latest = useRef({ min, max, onChange, width });
  latest.current = { min, max, onChange, width };
  const left = useRef(0);

  const setFromX = (x: number) => {
    const { min, max, onChange, width } = latest.current;
    const travel = width - THUMB;
    if (travel <= 0) return;
    const ratio = Math.min(1, Math.max(0, (x - THUMB / 2) / travel));
    onChange(Math.round(min + ratio * (max - min)));
  };

  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderTerminationRequest: () => false,
      onPanResponderGrant: (e) => {
        const pageX = e.nativeEvent.pageX;
        if (box.current && typeof box.current.measureInWindow === 'function') {
          box.current.measureInWindow((x: number) => {
            left.current = x;
            setFromX(pageX - x);
          });
        }
      },
      onPanResponderMove: (_, g) => setFromX(g.moveX - left.current),
    }),
  ).current;

  const travel = Math.max(width - THUMB, 0);
  const ratio = (value - min) / (max - min);
  const thumbX = ratio * travel;

  return (
    <View
      ref={box}
      onLayout={(e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width)}
      accessible
      accessibilityRole="adjustable"
      accessibilityValue={{ min, max, now: value }}
      accessibilityActions={[{ name: "increment" }, { name: "decrement" }]}
      onAccessibilityAction={(e) => {
        const next = e.nativeEvent.actionName === "increment" ? 1 : -1;
        onChange(Math.min(max, Math.max(min, value + next)));
      }}
      style={styles.hit}
      {...pan.panHandlers}
    >
      <View style={styles.track} />
      <View style={[styles.fill, { width: thumbX + THUMB / 2 }]} />
      <View style={[styles.thumb, { left: thumbX }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  hit: { height: 44, justifyContent: "center" },
  track: {
    height: 6,
    borderRadius: 3,
    backgroundColor: brand.ink,
    opacity: 0.12,
  },
  fill: {
    position: "absolute",
    height: 6,
    borderRadius: 3,
    backgroundColor: brand.ink,
  },
  thumb: {
    position: "absolute",
    width: THUMB,
    height: THUMB,
    borderRadius: THUMB / 2,
    backgroundColor: brand.yellow,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
});
