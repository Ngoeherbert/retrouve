import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Image,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { colors, spacing, typography } from "../../../constants/theme";
import { AppIcon, type AppIconName } from "../../../components/ui/AppIcons";

type ThemeMode = "light" | "dark" | "system";

interface MenuItem {
  id: string;
  label: string;
  icon: AppIconName;
  count: number | null;
}

const menuItems: MenuItem[] = [
  { id: "items", label: "My Items", icon: "package", count: 3 },
  { id: "saved", label: "Saved", icon: "bookmarkAdd", count: 5 },
  { id: "rewards", label: "Rewards", icon: "trophy", count: 120 },
];

const THEME_LABELS: Record<ThemeMode, string> = {
  light: "Light",
  dark: "Dark",
  system: "System",
};

// Swap these for your own icon names (sun, moon, globe, lock, shield, bell...) if you have them.
const SETTING_ICONS = {
  language: "explore",
  appearance: "settingsAlt",
  notifications: "notifications",
  help: "help",
  policy: "checkSolid",
} satisfies Record<string, AppIconName>;

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

function SettingRow({
  icon,
  label,
  value,
  onPress,
  last,
}: {
  icon: AppIconName;
  label: string;
  // Optional current value shown before the chevron (e.g. "English")
  value?: string;
  onPress: () => void;
  last?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={value ? `${label}, ${value}` : label}
    >
      <View style={[styles.settingRow, !last && styles.rowDivider]}>
        <AppIcon name={icon} size={20} color={colors.textSecondary} />
        <Text style={styles.menuLabel}>{label}</Text>
        <View style={styles.valueRow}>
          {value ? <Text style={styles.valueText}>{value}</Text> : null}
          <AppIcon
            name="forward"
            size={18}
            color={colors.textMuted}
            strokeWidth={2}
          />
        </View>
      </View>
    </Pressable>
  );
}

export default function ProfileScreen() {
  // TODO: read the current theme from your theme store
  const mode: ThemeMode = "light";
  const [imageUri] = useState<string | null>(
    "https://placehold.co/88x88/eaf0ff/3563e9?text=JD",
  );
  const [failedImageUri, setFailedImageUri] = useState<string | null>(null);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              {imageUri && failedImageUri !== imageUri ? (
                <Image
                  source={{ uri: imageUri }}
                  style={styles.avatarImage}
                  onError={() => setFailedImageUri(imageUri)}
                />
              ) : (
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>JD</Text>
                </View>
              )}
              {imageUri !== null && (
                <Pressable
                  style={styles.changePhotoButton}
                  onPress={() => {}}
                  accessibilityRole="button"
                  accessibilityLabel="Change photo"
                >
                  <AppIcon
                    name="image"
                    size={20}
                    color={colors.surface}
                    strokeWidth={2}
                  />
                </Pressable>
              )}
              <View style={styles.verifiedBadge}>
                <AppIcon
                  name="check"
                  size={14}
                  color="#FFFFFF"
                  strokeWidth={3}
                />
              </View>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>John Doe</Text>
              <Text style={styles.userEmail}>john.doe@email.com</Text>
              <View style={styles.statsRow}>
                <View style={styles.stat}>
                  <Text style={styles.statValue}>12</Text>
                  <Text style={styles.statLabel}>Items</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.stat}>
                  <Text style={styles.statValue}>48</Text>
                  <Text style={styles.statLabel}>Found</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.stat}>
                  <Text style={styles.statValue}>120</Text>
                  <Text style={styles.statLabel}>Points</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Account */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account</Text>
            <View style={styles.menuList}>
              {menuItems.map((item) => (
                <Pressable
                  key={item.id}
                  style={styles.menuItem}
                  onPress={() => {}}
                  accessibilityRole="button"
                  accessibilityLabel={item.label}
                >
                  <AppIcon
                    name={item.icon}
                    size={22}
                    color={colors.textSecondary}
                  />
                  <Text style={styles.menuLabel}>{item.label}</Text>
                  {item.count !== null && (
                    <View style={styles.menuBadge}>
                      <Text style={styles.menuBadgeText}>{item.count}</Text>
                    </View>
                  )}
                  <AppIcon
                    name="forward"
                    size={20}
                    color={colors.textMuted}
                    strokeWidth={2}
                  />
                </Pressable>
              ))}
            </View>
          </View>

          {/* Preferences */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferences</Text>
            <View style={styles.settingsCard}>
              <SettingRow
                icon={SETTING_ICONS.language}
                label="Language"
                value="English"
                onPress={() => {}}
              />
              {/* TODO: navigate to the Appearance screen */}
              <SettingRow
                icon={SETTING_ICONS.appearance}
                label="Appearance"
                value={THEME_LABELS[mode]}
                onPress={() => {}}
              />
              {/* TODO: navigate to the Notifications screen */}
              <SettingRow
                icon={SETTING_ICONS.notifications}
                label="Notifications"
                onPress={() => {}}
                last
              />
            </View>
          </View>

          {/* Support & Legal */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Support & Legal</Text>
            <View style={styles.settingsCard}>
              <SettingRow
                icon={SETTING_ICONS.help}
                label="Help & Support"
                onPress={() => {}}
              />
              <SettingRow
                icon={SETTING_ICONS.policy}
                label="Policy & Privacy"
                onPress={() => {}}
                last
              />
            </View>
          </View>

          <Pressable
            style={styles.logoutButton}
            onPress={() => {}}
            accessibilityRole="button"
            accessibilityLabel="Sign out"
          >
            <Text style={styles.logoutText}>Sign Out</Text>
          </Pressable>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: 120,
    gap: spacing.xl,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md,
    paddingTop: spacing.md,
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: radius.full,
    backgroundColor: colors.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "700",
    color: colors.primary,
  },
  verifiedBadge: {
    position: "absolute",
    bottom: 4,
    right: 4,
    width: 24,
    height: 24,
    borderRadius: radius.full,
    backgroundColor: colors.success,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: colors.background,
  },
  profileInfo: {
    flex: 1,
    gap: spacing.xs,
  },
  userName: {
    fontSize: typography.xxl,
    fontWeight: "800",
    color: colors.text,
  },
  userEmail: {
    fontSize: typography.md,
    color: colors.textSecondary,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  stat: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: typography.lg,
    fontWeight: "800",
    color: colors.text,
  },
  statLabel: {
    fontSize: typography.xs,
    color: colors.textMuted,
    marginTop: 2,
  },
  statDivider: {
    width: StyleSheet.hairlineWidth,
    height: 32,
    backgroundColor: colors.border,
  },
  section: {
    gap: spacing.sm,
  },
  sectionTitle: {
    fontSize: typography.md,
    fontWeight: "700",
    color: colors.text,
  },
  menuList: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    overflow: "hidden",
    ...shadows.card,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    gap: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  menuLabel: {
    flex: 1,
    fontSize: typography.md,
    fontWeight: "500",
    color: colors.text,
  },
  menuBadge: {
    minWidth: 24,
    height: 24,
    borderRadius: radius.full,
    backgroundColor: colors.primarySoft,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.sm,
  },
  menuBadgeText: {
    fontSize: typography.xs,
    fontWeight: "700",
    color: colors.primary,
  },
  settingsCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    ...shadows.card,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    minHeight: 56,
  },
  rowDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  valueRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  valueText: {
    fontSize: typography.sm,
    color: colors.textSecondary,
  },
  logoutButton: {
    paddingVertical: spacing.md,
    alignItems: "center",
    marginTop: spacing.md,
  },
  logoutText: {
    fontSize: typography.md,
    fontWeight: "600",
    color: colors.danger,
  },
  avatarIcon: {
    width: 64,
    height: 64,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceSecondary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarImage: {
    width: 88,
    height: 88,
    borderRadius: radius.full,
  },
  changePhotoButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});
