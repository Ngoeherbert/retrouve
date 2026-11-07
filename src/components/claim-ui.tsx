import { ReactNode, useRef } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Icon } from "@/components/icon";
import { Brand as brand } from "@/constants/theme";

export const DANGER = "#C0392B";
export const DANGER_BG = "#FBE3DF";
const LINE = "#E6E8EE";

export function ClaimScreen({
  title,
  right,
  footer,
  children,
  hideHeader,
  topOffset = 0,
}: {
  title?: string;
  right?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  hideHeader?: boolean;
  topOffset?: number;
}) {
  const insets = useSafeAreaInsets();
  return (
    <View style={s.screen}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: insets.top + 12 + topOffset,
          paddingBottom: Math.max(insets.bottom, 20) + 4,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {!hideHeader && (
          <View style={s.header}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Go back"
              onPress={() =>
                router.canGoBack() ? router.back() : router.replace("/(tabs)")
              }
              hitSlop={8}
              className="w-12 h-12 rounded-full bg-white items-center justify-center"
              style={({ pressed }) => [s.backShadow, pressed && s.pressed]}
            >
              <Icon name="back" size={22} color={brand.ink} strokeWidth={2} />
            </Pressable>
            {title ? (
              <Text style={s.headerTitle} pointerEvents="none">
                {title}
              </Text>
            ) : null}
            {right}
          </View>
        )}
        {children}
        <View style={s.spacer} />
        {footer ? <View style={s.footer}>{footer}</View> : null}
      </ScrollView>
    </View>
  );
}

export function Intro({
  title,
  subtitle,
  center,
}: {
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <View style={[s.intro, center && s.introCenter]}>
      <Text style={[s.title, center && s.titleCenter]}>{title}</Text>
      {subtitle ? (
        <Text style={[s.subtitle, center && s.subtitleCenter]}>{subtitle}</Text>
      ) : null}
    </View>
  );
}

export function Sheet({
  title,
  subtitle,
  footer,
  children,
}: {
  title: string;
  subtitle?: string;
  footer?: ReactNode;
  children: ReactNode;
}) {
  const insets = useSafeAreaInsets();
  return (
    <View style={s.sheetRoot}>
      <Pressable
        accessibilityLabel="Close"
        style={StyleSheet.absoluteFill}
        onPress={() => router.back()}
      />
      <View style={s.sheet}>
        <View style={s.handle} />
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingTop: 22,
            paddingBottom: Math.max(insets.bottom, 20) + 4,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={s.sheetTitle}>{title}</Text>
          {subtitle ? <Text style={s.sheetSubtitle}>{subtitle}</Text> : null}
          <View style={s.sheetBody}>{children}</View>
          <View style={s.spacer} />
          {footer ? (
            <View style={[s.footer, { paddingHorizontal: 0 }]}>{footer}</View>
          ) : null}
        </ScrollView>
      </View>
    </View>
  );
}

type Tone = "ink" | "yellow" | "grey";

export function Badge({ label, tone = "ink" }: { label: string; tone?: Tone }) {
  const bg =
    tone === "ink" ? brand.ink : tone === "yellow" ? brand.yellow : "#E6E8EE";
  const fg =
    tone === "ink" ? brand.white : tone === "yellow" ? brand.ink : brand.muted;
  return (
    <View style={[s.badge, { backgroundColor: bg }]}>
      <Text style={[s.badgeText, { color: fg }]}>{label}</Text>
    </View>
  );
}

export function Avatar({
  initials,
  tint,
  size = 48,
}: {
  initials: string;
  tint: string;
  size?: number;
}) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: tint,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{ fontSize: size * 0.36, fontWeight: "800", color: brand.ink }}
      >
        {initials}
      </Text>
    </View>
  );
}

export function ItemCard({
  title,
  meta,
  tint = "#D6DFEA",
  badge,
  badgeTone = "ink",
}: {
  title: string;
  meta: string;
  tint?: string;
  badge?: string;
  badgeTone?: Tone;
}) {
  return (
    <View style={s.itemCard}>
      <View style={[s.thumb, { backgroundColor: tint }]}>
        <Icon name="wallet" size={26} color={brand.muted} />
      </View>
      <View style={s.itemBody}>
        <Text style={s.itemTitle} numberOfLines={1}>
          {title}
        </Text>
        <Text style={s.itemMeta} numberOfLines={1}>
          {meta}
        </Text>
      </View>
      {badge ? <Badge label={badge} tone={badgeTone} /> : null}
    </View>
  );
}

export function PillButton({
  label,
  tone = "white",
  onPress,
}: {
  label: string;
  tone?: "white" | "danger";
  onPress?: () => void;
}) {
  const danger = tone === "danger";
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        s.pill,
        { backgroundColor: danger ? DANGER_BG : brand.white },
        pressed && s.pressed,
      ]}
    >
      <Text style={[s.pillText, { color: danger ? DANGER : brand.ink }]}>
        {label}
      </Text>
    </Pressable>
  );
}

export function LinkButton({
  label,
  danger,
  onPress,
}: {
  label: string;
  danger?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      hitSlop={8}
      style={({ pressed }) => [s.link, pressed && s.pressed]}
    >
      <Text style={[s.linkText, { color: danger ? DANGER : brand.ink }]}>
        {label}
      </Text>
    </Pressable>
  );
}

export function RadioCard({
  selected,
  title,
  sub,
  onPress,
}: {
  selected: boolean;
  title: string;
  sub?: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={[s.radioCard, selected && s.radioCardOn]}
    >
      <View style={s.radio}>{selected && <View style={s.radioDot} />}</View>
      <View style={{ flex: 1, marginLeft: 16 }}>
        <Text style={s.radioTitle}>{title}</Text>
        {sub ? <Text style={s.radioSub}>{sub}</Text> : null}
      </View>
    </Pressable>
  );
}

export function Chip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      onPress={onPress}
      style={[s.chip, active && s.chipOn]}
    >
      <Text style={[s.chipText, { color: active ? brand.white : brand.ink }]}>
        {label}
      </Text>
    </Pressable>
  );
}

export function Label({ children }: { children: string }) {
  return <Text style={s.label}>{children}</Text>;
}

export function SectionLabel({ children }: { children: string }) {
  return <Text style={s.sectionLabel}>{children}</Text>;
}

export function Note({ children }: { children: string }) {
  return <Text style={s.note}>{children}</Text>;
}

export function Input(props: TextInputProps & { tall?: boolean }) {
  const { tall, style, ...rest } = props;
  return (
    <TextInput
      placeholderTextColor="#8E94A3"
      multiline={tall}
      textAlignVertical={tall ? "top" : "center"}
      style={[tall ? s.textarea : s.input, style]}
      {...rest}
    />
  );
}

export function PhotoUpload({
  label,
  onPress,
}: {
  label: string;
  onPress?: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [s.upload, pressed && s.pressed]}
    >
      <Icon name="camera" size={18} color={brand.ink} />
      <Text style={s.uploadText}>{label}</Text>
    </Pressable>
  );
}

export function DetailRows({
  rows,
}: {
  rows: { label: string; value: string }[];
}) {
  return (
    <View style={s.cardPlain}>
      {rows.map((r, i) => (
        <View key={r.label} style={[s.detailRow, i > 0 && s.divider]}>
          <Text style={s.detailLabel}>{r.label}</Text>
          <Text style={s.detailValue} numberOfLines={1}>
            {r.value}
          </Text>
        </View>
      ))}
    </View>
  );
}

export function ActionRows({
  rows,
}: {
  rows: { label: string; onPress: () => void }[];
}) {
  return (
    <View style={s.cardPlain}>
      {rows.map((r, i) => (
        <Pressable
          key={r.label}
          accessibilityRole="button"
          onPress={r.onPress}
          style={({ pressed }) => [
            s.actionRow,
            i > 0 && s.divider,
            pressed && s.pressed,
          ]}
        >
          <Text style={s.actionLabel}>{r.label}</Text>
          <Icon name="next" size={20} color="#8E94A3" />
        </Pressable>
      ))}
    </View>
  );
}

export const gutter = { paddingHorizontal: 20 } as const;

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: brand.bg },
  pressed: { opacity: 0.85 },
  spacer: { flex: 1, minHeight: 24 },
  footer: { paddingHorizontal: 20, gap: 12 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    height: 48,
  },
  backShadow: {
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  headerTitle: {
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 17,
    fontWeight: "700",
    color: brand.ink,
  },

  intro: { paddingHorizontal: 20, marginTop: 20, marginBottom: 18 },
  introCenter: { alignItems: "center", paddingHorizontal: 36, marginBottom: 0 },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: brand.ink,
    letterSpacing: -0.5,
  },
  titleCenter: { fontSize: 32, textAlign: "center", marginTop: 4 },
  subtitle: { marginTop: 6, fontSize: 16, lineHeight: 22, color: brand.muted },
  subtitleCenter: { textAlign: "center", lineHeight: 24, marginTop: 10 },

  sheetRoot: { flex: 1, backgroundColor: "rgba(17,24,39,0.72)" },
  sheet: {
    flex: 1,
    marginTop: 72,
    backgroundColor: brand.bg,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 20,
  },
  handle: {
    alignSelf: "center",
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#C9CED8",
    marginTop: 12,
  },
  sheetTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: brand.ink,
    letterSpacing: -0.5,
  },
  sheetSubtitle: { marginTop: 6, fontSize: 15, color: brand.muted },
  sheetBody: { marginTop: 18, gap: 10 },

  badge: {
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginLeft: 8,
  },
  badgeText: { fontSize: 12, fontWeight: "800" },

  itemCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: brand.white,
    borderRadius: 28,
    padding: 14,
    marginHorizontal: 20,
  },
  thumb: {
    width: 60,
    height: 60,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  itemBody: { flex: 1, marginLeft: 14, minWidth: 0 },
  itemTitle: { fontSize: 17, fontWeight: "800", color: brand.ink },
  itemMeta: { marginTop: 4, fontSize: 14, color: brand.muted },

  pill: {
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
  },
  pillText: { fontSize: 16, fontWeight: "800" },
  link: { alignItems: "center", paddingVertical: 10 },
  linkText: { fontSize: 15, fontWeight: "800" },

  radioCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: brand.white,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "transparent",
    paddingHorizontal: 16,
    paddingVertical: 16,
    minHeight: 56,
  },
  radioCardOn: { borderColor: brand.ink },
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
  radioTitle: { fontSize: 16, fontWeight: "800", color: brand.ink },
  radioSub: { marginTop: 3, fontSize: 14, color: brand.muted },

  chip: {
    height: 38,
    paddingHorizontal: 16,
    borderRadius: 19,
    backgroundColor: brand.white,
    alignItems: "center",
    justifyContent: "center",
  },
  chipOn: { backgroundColor: brand.ink },
  chipText: { fontSize: 14, fontWeight: "800" },

  label: { fontSize: 14, fontWeight: "800", color: brand.ink, marginBottom: 8 },
  sectionLabel: {
    fontSize: 15,
    fontWeight: "800",
    color: brand.muted,
    paddingHorizontal: 26,
    marginTop: 18,
    marginBottom: 10,
  },
  note: {
    paddingHorizontal: 26,
    marginTop: 14,
    fontSize: 14,
    color: brand.muted,
  },

  input: {
    height: 56,
    borderRadius: 20,
    backgroundColor: brand.white,
    paddingHorizontal: 18,
    fontSize: 16,
    color: brand.ink,
  },
  textarea: {
    minHeight: 76,
    borderRadius: 20,
    backgroundColor: brand.white,
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 16,
    fontSize: 16,
    color: brand.ink,
  },

  upload: {
    height: 84,
    borderRadius: 24,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: "#B9BCC9",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  uploadText: { fontSize: 14, fontWeight: "700", color: brand.ink },

  cardPlain: {
    backgroundColor: brand.white,
    borderRadius: 28,
    paddingHorizontal: 18,
    marginHorizontal: 20,
  },
  divider: { borderTopWidth: 1, borderTopColor: LINE },
  detailRow: {
    height: 47,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  detailLabel: { fontSize: 15, color: brand.muted },
  detailValue: {
    flexShrink: 1,
    marginLeft: 16,
    fontSize: 15,
    fontWeight: "800",
    color: brand.ink,
  },
  actionRow: {
    height: 51,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  actionLabel: { fontSize: 16, fontWeight: "800", color: brand.ink },
});

export function StepList({
  steps,
}: {
  steps: { title: string; sub: string }[];
}) {
  return (
    <View style={stepStyles.card}>
      {steps.map((step, i) => (
        <View key={step.title} style={[stepStyles.row, i > 0 && stepStyles.divider]}>
          <View style={stepStyles.circle}>
            <Text style={stepStyles.number}>{i + 1}</Text>
          </View>
          <View style={stepStyles.body}>
            <Text style={stepStyles.title}>{step.title}</Text>
            <Text style={stepStyles.sub}>{step.sub}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const stepStyles = StyleSheet.create({
  card: {
    backgroundColor: brand.white,
    borderRadius: 28,
    paddingHorizontal: 18,
    marginHorizontal: 20,
    marginTop: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  divider: { borderTopWidth: 1, borderTopColor: LINE },
  circle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: brand.yellow,
    alignItems: "center",
    justifyContent: "center",
  },
  number: { fontSize: 16, fontWeight: "800", color: brand.ink },
  body: { flex: 1, marginLeft: 14 },
  title: { fontSize: 17, fontWeight: "800", color: brand.ink },
  sub: { marginTop: 2, fontSize: 15, color: brand.muted },
});

export function CheckCircle({ size = 84 }: { size?: number }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: brand.yellow,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
      }}
    >
      <View
        style={{
          width: size * 0.17,
          height: size * 0.33,
          borderRightWidth: 4,
          borderBottomWidth: 4,
          borderColor: brand.ink,
          borderRadius: 2,
          marginTop: -size * 0.06,
          transform: [{ rotate: "45deg" }],
        }}
      />
    </View>
  );
}

export function ChatBubble({
  initials,
  text,
}: {
  initials: string;
  text: string;
}) {
  return (
    <View style={chatStyles.row}>
      <Avatar initials={initials} tint={brand.yellow} size={40} />
      <View style={chatStyles.bubble}>
        <Text style={chatStyles.text}>{text}</Text>
      </View>
    </View>
  );
}

const chatStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    gap: 10,
  },
  bubble: {
    flex: 1,
    marginRight: 20,
    backgroundColor: brand.white,
    borderRadius: 24,
    borderTopLeftRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  text: { fontSize: 16, lineHeight: 21, color: brand.ink },
});

export type TimelineStep = { title: string; sub: string };

export function Timeline({
  steps,
  current,
}: {
  steps: TimelineStep[];
  /** index of the active step; earlier steps are done, later ones upcoming */
  current: number;
}) {
  return (
    <View style={tlStyles.wrap}>
      {steps.map((step, i) => {
        const done = i < current;
        const active = i === current;
        const last = i === steps.length - 1;
        return (
          <View key={step.title} style={tlStyles.row}>
            <View style={tlStyles.rail}>
              <View
                style={[
                  tlStyles.dot,
                  done && tlStyles.dotDone,
                  active && tlStyles.dotActive,
                ]}
              >
                {done ? <View style={tlStyles.tick} /> : null}
              </View>
              {!last ? (
                <View style={[tlStyles.line, done && tlStyles.lineDone]} />
              ) : null}
            </View>
            <View style={[tlStyles.body, last && { paddingBottom: 0 }]}>
              <Text style={tlStyles.title}>{step.title}</Text>
              <Text style={tlStyles.sub}>{step.sub}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const tlStyles = StyleSheet.create({
  wrap: { paddingHorizontal: 20, marginTop: 26 },
  row: { flexDirection: "row" },
  rail: { width: 28, alignItems: "center", marginRight: 16 },
  dot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#DDE1E9",
    alignItems: "center",
    justifyContent: "center",
  },
  dotDone: { backgroundColor: brand.ink },
  dotActive: {
    backgroundColor: brand.yellow,
    borderWidth: 3,
    borderColor: brand.ink,
  },
  tick: {
    width: 6,
    height: 11,
    borderRightWidth: 2.5,
    borderBottomWidth: 2.5,
    borderColor: brand.yellow,
    marginTop: -2,
    transform: [{ rotate: "45deg" }],
  },
  line: { flex: 1, width: 2, backgroundColor: LINE, marginVertical: 2 },
  lineDone: { backgroundColor: brand.ink },
  body: { flex: 1, paddingBottom: 30, paddingTop: 1 },
  title: { fontSize: 17, fontWeight: "800", color: brand.ink },
  sub: { marginTop: 3, fontSize: 15, color: brand.muted },
});

export function XCircle({ size = 84 }: { size?: number }) {
  const bar = {
    position: "absolute" as const,
    width: size * 0.34,
    height: 4,
    borderRadius: 2,
    backgroundColor: brand.muted,
  };
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: "#E6E8EE",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
      }}
    >
      <View style={[bar, { transform: [{ rotate: "45deg" }] }]} />
      <View style={[bar, { transform: [{ rotate: "-45deg" }] }]} />
    </View>
  );
}

export function TextCard({
  label,
  text,
  tone = "white",
}: {
  label: string;
  text: string;
  tone?: "white" | "yellow";
}) {
  return (
    <View
      style={[
        tcStyles.card,
        { backgroundColor: tone === "yellow" ? "#FEF0B9" : brand.white },
      ]}
    >
      <Text style={tcStyles.label}>{label}</Text>
      <Text style={tcStyles.text}>{text}</Text>
    </View>
  );
}

const tcStyles = StyleSheet.create({
  card: {
    borderRadius: 28,
    paddingHorizontal: 18,
    paddingVertical: 16,
    marginHorizontal: 20,
  },
  label: { fontSize: 14, color: brand.muted },
  text: { marginTop: 4, fontSize: 17, fontWeight: "800", color: brand.ink },
});

export function Banner({ title, sub }: { title: string; sub?: string }) {
  return (
    <View style={bnStyles.card}>
      <View style={bnStyles.tick} />
      <View style={{ flex: 1 }}>
        <Text style={bnStyles.title}>{title}</Text>
        {sub ? <Text style={bnStyles.sub}>{sub}</Text> : null}
      </View>
    </View>
  );
}

const bnStyles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: brand.yellow,
    borderRadius: 28,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginHorizontal: 20,
    gap: 18,
  },
  tick: {
    width: 10,
    height: 18,
    borderRightWidth: 3.5,
    borderBottomWidth: 3.5,
    borderColor: brand.ink,
    marginLeft: 6,
    marginTop: -4,
    transform: [{ rotate: "45deg" }],
  },
  title: { fontSize: 20, fontWeight: "800", color: brand.ink },
  sub: { marginTop: 3, fontSize: 15, color: "#3B3F4A" },
});

export function HandoverCodeCard({
  code,
  hint,
}: {
  code: string;
  hint?: string;
}) {
  return (
    <View style={hcStyles.card}>
      <Text style={hcStyles.label}>Handover code</Text>
      <Text
        style={hcStyles.code}
        accessibilityLabel={`Handover code ${code.split("").join(" ")}`}
        adjustsFontSizeToFit
        numberOfLines={1}
      >
        {code}
      </Text>
      {hint ? <Text style={hcStyles.hint}>{hint}</Text> : null}
    </View>
  );
}

const hcStyles = StyleSheet.create({
  card: {
    backgroundColor: brand.ink,
    borderRadius: 32,
    paddingVertical: 22,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    alignItems: "center",
  },
  label: { fontSize: 15, color: "#A9AFBD" },
  code: {
    marginTop: 8,
    fontSize: 48,
    fontWeight: "800",
    letterSpacing: 8,
    color: brand.yellow,
  },
  hint: { marginTop: 10, fontSize: 14, color: "#A9AFBD" },
});

export function StarRating({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <View style={srStyles.row}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Pressable
          key={n}
          accessibilityRole="button"
          accessibilityLabel={`${n} star${n > 1 ? "s" : ""}`}
          accessibilityState={{ selected: n <= value }}
          onPress={() => onChange(n)}
          hitSlop={4}
          style={srStyles.hit}
        >
          <Text
            style={[srStyles.star, { color: n <= value ? brand.yellow : "#D5D9E2" }]}
          >
            ★
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const srStyles = StyleSheet.create({
  row: { flexDirection: "row", justifyContent: "center", gap: 2, marginTop: 24 },
  hit: { minWidth: 44, minHeight: 48, alignItems: "center", justifyContent: "center" },
  star: { fontSize: 46, lineHeight: 52 },
});

export function QACard({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  return (
    <View style={qaStyles.card}>
      {items.map((it, i) => (
        <View key={it.question} style={[qaStyles.item, i > 0 && qaStyles.divider]}>
          <Text style={qaStyles.q}>{it.question}</Text>
          <Text style={qaStyles.a}>{it.answer}</Text>
        </View>
      ))}
    </View>
  );
}

const qaStyles = StyleSheet.create({
  card: {
    backgroundColor: brand.white,
    borderRadius: 28,
    paddingHorizontal: 18,
    marginHorizontal: 20,
  },
  item: { paddingVertical: 15 },
  divider: { borderTopWidth: 1, borderTopColor: LINE },
  q: { fontSize: 15, color: brand.muted },
  a: { marginTop: 4, fontSize: 18, fontWeight: "800", color: brand.ink },
});

export function CodeBoxes({
  value,
  onChange,
  prefix = "RT-",
  length = 4,
}: {
  value: string;
  onChange: (v: string) => void;
  prefix?: string;
  length?: number;
}) {
  const ref = useRef<TextInput>(null);
  const active = Math.min(value.length, length - 1);
  return (
    <View style={cbStyles.row}>
      <Text style={cbStyles.prefix}>{prefix}</Text>
      {Array.from({ length }).map((_, i) => (
        <View key={i} style={[cbStyles.box, i === active && cbStyles.boxOn]}>
          <Text style={cbStyles.digit}>{value[i] ?? ""}</Text>
        </View>
      ))}
      <TextInput
        ref={ref}
        autoFocus
        value={value}
        onChangeText={(t) => onChange(t.replace(/\D/g, "").slice(0, length))}
        keyboardType="number-pad"
        maxLength={length}
        caretHidden
        accessibilityLabel="Owner code digits"
        style={cbStyles.hidden}
      />
    </View>
  );
}

const cbStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 20,
  },
  prefix: { fontSize: 22, fontWeight: "800", color: brand.ink },
  box: {
    flex: 1,
    height: 64,
    borderRadius: 20,
    backgroundColor: brand.white,
    borderWidth: 2,
    borderColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  boxOn: { borderColor: brand.ink },
  digit: { fontSize: 28, fontWeight: "800", color: brand.ink },
  hidden: { ...StyleSheet.absoluteFillObject, opacity: 0.02, color: "transparent" },
});
