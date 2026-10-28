import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Pressable,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { colors, spacing, typography, radius } from "../../../constants/theme";
import { AppIcon } from "../../../components/ui/AppIcons";

type Conversation = {
  id: string;
  name: string;
  itemTitle: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatar: string;
};

const conversations: Conversation[] = [
  {
    id: "1",
    name: "Sarah Chen",
    itemTitle: "AirPods Pro",
    lastMessage:
      "I'll be at the library entrance from 10 AM onwards. You can come anytime after that.",
    time: "2h ago",
    unread: 2,
    avatar: "SC",
  },
  {
    id: "2",
    name: "Mike Rodriguez",
    itemTitle: "Black Wallet",
    lastMessage:
      "All cards and documents are intact. I've left it with the security desk at Union Square.",
    time: "5h ago",
    unread: 0,
    avatar: "MR",
  },
  {
    id: "3",
    name: "Priya Nair",
    itemTitle: "Silver Ring",
    lastMessage: "It was handed into the lost and found at Central Park.",
    time: "1d ago",
    unread: 1,
    avatar: "PN",
  },
];

export default function MessagesScreen() {
  const router = useRouter();

  const renderEmpty = () => (
    <View style={styles.emptyState}>
      <View style={styles.emptyIcon}>
        <AppIcon
          name="messages"
          size={56}
          color={colors.textMuted}
          strokeWidth={1.5}
        />
      </View>
      <Text style={styles.emptyTitle}>No messages yet</Text>
      <Text style={styles.emptyText}>
        When you connect with other users about lost or found items, your
        conversations will appear here.
      </Text>
    </View>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        {/* Padding lives on this inner View: SafeAreaView ignores padding on iOS */}
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Messages</Text>
          </View>

          <FlatList
            data={conversations}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              styles.listContent,
              conversations.length === 0 && styles.centeredContent,
            ]}
            ListEmptyComponent={renderEmpty}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderItem={({ item }) => (
              <Pressable
                style={styles.conversationItem}
                onPress={() =>
                  router.push(`/(tabs)/messages/chat/${item.id}` as any)
                }
                accessibilityRole="button"
                accessibilityLabel={`Conversation with ${item.name} about ${item.itemTitle}, ${item.unread} unread messages`}
              >
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{item.avatar}</Text>
                  {item.unread > 0 && (
                    <View style={styles.unreadBadge}>
                      <Text style={styles.unreadText}>
                        {item.unread > 9 ? "9+" : item.unread}
                      </Text>
                    </View>
                  )}
                </View>
                <View style={styles.conversationContent}>
                  <View style={styles.conversationHeader}>
                    <Text style={styles.conversationName}>{item.name}</Text>
                    <Text style={styles.conversationTime}>{item.time}</Text>
                  </View>
                  <Text style={styles.itemTitle} numberOfLines={1}>
                    Re: {item.itemTitle}
                  </Text>
                  <Text
                    style={[
                      styles.lastMessage,
                      item.unread > 0 && styles.lastMessageUnread,
                    ]}
                    numberOfLines={2}
                  >
                    {item.lastMessage}
                  </Text>
                </View>
              </Pressable>
            )}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
  title: {
    fontSize: typography.xxl,
    fontWeight: "800",
    color: colors.text,
  },
  listContent: {
    paddingBottom: 100,
  },
  conversationItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: spacing.md,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: 64,
  },
  avatar: {
    position: "relative",
    width: 48,
    height: 48,
    borderRadius: radius.full,
    backgroundColor: colors.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: typography.sm,
    fontWeight: "700",
    color: colors.primary,
  },
  unreadBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    minWidth: 18,
    height: 18,
    borderRadius: radius.full,
    backgroundColor: colors.danger,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: colors.surface,
  },
  unreadText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  conversationContent: {
    flex: 1,
    minWidth: 0,
    gap: 2,
  },
  conversationHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  conversationName: {
    fontSize: typography.md,
    fontWeight: "600",
    color: colors.text,
  },
  conversationTime: {
    fontSize: typography.xs,
    color: colors.textMuted,
  },
  itemTitle: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  lastMessage: {
    fontSize: typography.sm,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  lastMessageUnread: {
    fontWeight: "600",
    color: colors.text,
  },
  centeredContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyState: {
    alignItems: "center",
    gap: spacing.md,
    paddingHorizontal: spacing.xl,
  },
  emptyIcon: {
    width: 100,
    height: 100,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceSecondary,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyTitle: {
    fontSize: typography.lg,
    fontWeight: "700",
    color: colors.text,
  },
  emptyText: {
    fontSize: typography.md,
    color: colors.textSecondary,
    textAlign: "center",
  },
});
