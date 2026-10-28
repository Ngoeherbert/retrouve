import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Pressable,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { colors, spacing, typography } from "../../constants/theme";
import { AppIcon, type AppIconName } from "../../components/ui/AppIcons";

type NotificationType = "match" | "message" | "qr" | "reward" | "security";

interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  time: string;
}

// Swap these for your own icon names (e.g. sparkles, qrCode, gift, shield) if you have them.
const ICONS: Record<NotificationType | "back" | "scan", AppIconName> = {
  match: "heart",
  message: "messages",
  qr: "searchAdd",
  reward: "trophy",
  security: "notifications",
  back: "back",
  scan: "searchAdd",
};

const TONES: Record<NotificationType, { bg: string; fg: string }> = {
  match: { bg: "#FFF4CC", fg: "#F5B800" },
  message: { bg: "#EEEAFD", fg: "#7C5CFC" },
  qr: { bg: "#E9EBFB", fg: "#6B74E6" },
  reward: { bg: "#FFF4CC", fg: "#F5B800" },
  security: { bg: "#FDECEC", fg: "#E5484D" },
};

const notifications: NotificationItem[] = [
  {
    id: "1",
    type: "match",
    title: "Ai Match Found - 96%",
    body: "Great news! A possible match for your AirPods Pro was found just 0.4 mi from your last reported location.",
    time: "2m ago",
  },
  {
    id: "2",
    type: "message",
    title: "Priya Sent You A Message",
    body: "Yes, I still have it! Where would you like to meet?",
    time: "12m ago",
  },
  {
    id: "3",
    type: "qr",
    title: "Your QR Tag Was Scanned",
    body: "Your Backpack QR Tag was scanned near Union Square. Tap to view the location.",
    time: "1h ago",
  },
  {
    id: "4",
    type: "reward",
    title: "Reward Received",
    body: "Congratulations! You earned $120 for successfully returning AirPods Pro.",
    time: "1d ago",
  },
  {
    id: "5",
    type: "security",
    title: "Security Alert",
    body: "New device login detected from Safari on macOS",
    time: "2d ago",
  },
];

const shadows = {
  card: {
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
};

const radius = {
  sm: 8,
  md: 14,
  lg: 20,
  xl: 28,
  full: 999,
};

export default function NotificationsScreen() {
  const router = useRouter();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Pressable
            style={styles.headerButton}
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <View style={styles.backIcon}>
              <AppIcon
                name={ICONS.back}
                size={20}
                color={colors.text}
                strokeWidth={2}
              />
            </View>
          </Pressable>

          <Text style={styles.headerTitle}>Notifications</Text>

          <Pressable
            style={styles.headerButton}
            onPress={() => {}}
            accessibilityRole="button"
            accessibilityLabel="Scan QR tag"
          >
            <AppIcon name={ICONS.scan} size={20} color={colors.text} />
          </Pressable>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {notifications.map((item) => {
            const tone = TONES[item.type];
            return (
              <Pressable
                key={item.id}
                style={styles.card}
                onPress={() => {}}
                accessibilityRole="button"
                accessibilityLabel={item.title}
              >
                <View style={[styles.iconTile, { backgroundColor: tone.bg }]}>
                  <AppIcon name={ICONS[item.type]} size={18} color={tone.fg} />
                </View>

                <View style={styles.cardContent}>
                  <View style={styles.cardTop}>
                    <Text style={styles.cardTitle} numberOfLines={1}>
                      {item.title}
                    </Text>
                    <Text style={styles.cardTime}>{item.time}</Text>
                  </View>
                  <Text style={styles.cardBody} numberOfLines={3}>
                    {item.body}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    ...shadows.card,
  },
  backIcon: {},
  headerTitle: {
    fontSize: typography.lg,
    fontWeight: "600",
    color: colors.text,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xs,
    paddingBottom: 100,
    gap: spacing.md,
  },
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    ...shadows.card,
  },
  iconTile: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  cardContent: {
    flex: 1,
    gap: 4,
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
  },
  cardTitle: {
    flex: 1,
    fontSize: typography.md,
    fontWeight: "700",
    color: colors.text,
  },
  cardTime: {
    fontSize: typography.xs,
    color: colors.textMuted,
  },
  cardBody: {
    fontSize: typography.sm,
    lineHeight: 18,
    color: colors.textSecondary,
  },
});
