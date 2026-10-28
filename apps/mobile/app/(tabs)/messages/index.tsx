import { View, Text, ScrollView, StyleSheet, SafeAreaView, Pressable } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '../../../constants/theme';
import { AppIcon } from '../../../components/ui/AppIcons';

const conversations = [
  {
    id: '1',
    name: 'Alex Johnson',
    lastMessage: 'Thanks for finding my keys!',
    time: '2h ago',
    unread: 2,
    avatar: 'AJ',
  },
  {
    id: '2',
    name: 'Sarah Chen',
    lastMessage: "I'll meet you at the library",
    time: '5h ago',
    unread: 0,
    avatar: 'SC',
  },
  {
    id: '3',
    name: 'Mike Rodriguez',
    lastMessage: 'Is this your wallet?',
    time: '1d ago',
    unread: 1,
    avatar: 'MR',
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

export default function MessagesScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Messages</Text>
            <Pressable style={styles.newMessageButton} onPress={() => {}} accessibilityRole="button" accessibilityLabel="New message">
              <AppIcon name="edit" size={20} color="#FFFFFF" />
            </Pressable>
          </View>

          <View style={styles.searchBar}>
            <AppIcon name="explore" size={22} color={colors.textMuted} />
            <Text style={styles.searchPlaceholder}>Search conversations...</Text>
          </View>

          <View style={styles.conversationList}>
            {conversations.map((conversation) => (
              <Pressable
                key={conversation.id}
                style={styles.conversationItem}
                onPress={() => {}}
                accessibilityRole="button"
                accessibilityLabel={`Conversation with ${conversation.name}`}
              >
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{conversation.avatar}</Text>
                  {conversation.unread > 0 && (
                    <View style={styles.unreadBadge}>
                      <Text style={styles.unreadText}>
                        {conversation.unread > 9 ? '9+' : conversation.unread}
                      </Text>
                    </View>
                  )}
                </View>
                <View style={styles.conversationContent}>
                  <View style={styles.conversationHeader}>
                    <Text style={styles.conversationName}>{conversation.name}</Text>
                    <Text style={styles.conversationTime}>{conversation.time}</Text>
                  </View>
                  <Text style={styles.lastMessage}>{conversation.lastMessage}</Text>
                </View>
              </Pressable>
            ))}
          </View>

          {conversations.length === 0 && (
            <View style={styles.emptyState}>
              <AppIcon name="messages" size={48} color={colors.textMuted} />
              <Text style={styles.emptyTitle}>No messages yet</Text>
              <Text style={styles.emptyText}>
                When you connect with other users, your conversations will appear here.
              </Text>
            </View>
          )}

          <View style={styles.placeholderCard}>
            <AppIcon name="messages" size={48} color={colors.primary} />
            <Text style={styles.placeholderTitle}>Messages Screen</Text>
            <Text style={styles.placeholderText}>
              This is the messages screen placeholder. Replace with actual messaging functionality.
            </Text>
          </View>
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
    paddingBottom: 100,
    gap: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: typography.xxl,
    fontWeight: '800',
    color: colors.text,
  },
  newMessageButton: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    gap: spacing.sm,
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: typography.md,
    color: colors.textMuted,
  },
  conversationList: {
    gap: spacing.sm,
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    ...shadows.card,
  },
  avatar: {
    position: 'relative',
    width: 48,
    height: 48,
    borderRadius: radius.full,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: typography.sm,
    fontWeight: '700',
    color: colors.primary,
  },
  unreadBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    minWidth: 18,
    height: 18,
    borderRadius: radius.full,
    backgroundColor: colors.danger,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: colors.surface,
  },
  unreadText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  conversationContent: {
    flex: 1,
    minWidth: 0,
    gap: spacing.xs,
  },
  conversationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  conversationName: {
    fontSize: typography.md,
    fontWeight: '600',
    color: colors.text,
  },
  conversationTime: {
    fontSize: typography.xs,
    color: colors.textMuted,
  },
  lastMessage: {
    fontSize: typography.sm,
    color: colors.textSecondary,
    maxWidth: '100%',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
    gap: spacing.md,
  },
  emptyTitle: {
    fontSize: typography.lg,
    fontWeight: '700',
    color: colors.text,
  },
  emptyText: {
    fontSize: typography.md,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: spacing.lg,
  },
  placeholderCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.xl,
    alignItems: 'center',
    marginTop: spacing.lg,
    ...shadows.card,
  },
  placeholderTitle: {
    fontSize: typography.xl,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  placeholderText: {
    fontSize: typography.md,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});