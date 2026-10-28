import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Switch,
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
  { id: "help", label: "Help & Support", icon: "help", count: null },
];

// Swap these for your own icon names (sun, moon, globe, lock, shield, gift, alert...) if you have them.
const SETTING_ICONS = {
  light: "settingsAlt",
  dark: "settingsAlt",
  system: "settingsAlt",
  push: "notifications",
  match: "heart",
  reward: "trophy",
  language: "explore",
  security: "checkSolid",
  privacy: "help",
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
  right,
  onPress,
  last,
}: {
  icon: AppIconName;
  label: string;
  right?: React.ReactNode;
  onPress?: () => void;
  last?: boolean;
}) {
  const content = (
    <View style={[styles.settingRow, !last && styles.rowDivider]}>
      <AppIcon name={icon} size={20} color={colors.textSecondary} />
      <Text style={styles.menuLabel}>{label}</Text>
      {right}
    </View>
  );

  if (!onPress) return content;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      {content}
    </Pressable>
  );
}

function Toggle({
  value,
  onChange,
  label,
}: {
  value: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <Switch
      value={value}
      onValueChange={onChange}
      accessibilityLabel={label}
      trackColor={{ false: colors.border, true: colors.primary }}
      thumbColor="#FFFFFF"
      ios_backgroundColor={colors.border}
    />
  );
}

function Radio({ selected }: { selected: boolean }) {
  return (
    <View style={[styles.radio, selected && styles.radioSelected]}>
      {selected && <View style={styles.radioDot} />}
    </View>
  );
}

export default function ProfileScreen() {
  const [mode, setMode] = useState<ThemeMode>("light");
  const [push, setPush] = useState(true);
  const [matchAlerts, setMatchAlerts] = useState(true);
  const [rewardUpdates, setRewardUpdates] = useState(false);
  const [security, setSecurity] = useState(true);
  const [privacy, setPrivacy] = useState(false);

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
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>JD</Text>
              </View>
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

          {/* Appearance */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>APPEARANCE</Text>
            <View style={styles.settingsCard}>
              <SettingRow
                icon={SETTING_ICONS.light}
                label="Light Mode"
                onPress={() => setMode("light")}
                right={<Radio selected={mode === "light"} />}
              />
              <SettingRow
                icon={SETTING_ICONS.dark}
                label="Dark Mode"
                onPress={() => setMode("dark")}
                right={<Radio selected={mode === "dark"} />}
              />
              <SettingRow
                icon={SETTING_ICONS.system}
                label="System"
                onPress={() => setMode("system")}
                last
                right={<Radio selected={mode === "system"} />}
              />
            </View>
          </View>

          {/* Notifications */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>NOTIFICATIONS</Text>
            <View style={styles.settingsCard}>
              <SettingRow
                icon={SETTING_ICONS.push}
                label="Push Notifications"
                right={
                  <Toggle
                    value={push}
                    onChange={setPush}
                    label="Push notifications"
                  />
                }
              />
              <SettingRow
                icon={SETTING_ICONS.match}
                label="Match Alerts"
                right={
                  <Toggle
                    value={matchAlerts}
                    onChange={setMatchAlerts}
                    label="Match alerts"
                  />
                }
              />
              <SettingRow
                icon={SETTING_ICONS.reward}
                label="Reward Updates"
                last
                right={
                  <Toggle
                    value={rewardUpdates}
                    onChange={setRewardUpdates}
                    label="Reward updates"
                  />
                }
              />
            </View>
          </View>

          {/* Preferences */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>PREFERENCES</Text>
            <View style={styles.settingsCard}>
              <SettingRow
                icon={SETTING_ICONS.language}
                label="Language"
                onPress={() => {}}
                right={
                  <View style={styles.valueRow}>
                    <Text style={styles.valueText}>English</Text>
                    <AppIcon
                      name="forward"
                      size={18}
                      color={colors.textMuted}
                      strokeWidth={2}
                    />
                  </View>
                }
              />
              <SettingRow
                icon={SETTING_ICONS.security}
                label="Security"
                right={
                  <Toggle
                    value={security}
                    onChange={setSecurity}
                    label="Security"
                  />
                }
              />
              <SettingRow
                icon={SETTING_ICONS.privacy}
                label="Privacy"
                last
                right={
                  <Toggle
                    value={privacy}
                    onChange={setPrivacy}
                    label="Privacy"
                  />
                }
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
  sectionLabel: {
    fontSize: typography.xs,
    fontWeight: "600",
    letterSpacing: 0.6,
    color: colors.textSecondary,
    paddingHorizontal: spacing.xs,
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
  radio: {
    width: 20,
    height: 20,
    borderRadius: radius.full,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  radioSelected: {
    borderColor: colors.primary,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
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
});
