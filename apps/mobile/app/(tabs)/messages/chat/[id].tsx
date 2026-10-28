import { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Modal,
  useWindowDimensions,
  Image,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import * as Haptics from "expo-haptics";
import * as Clipboard from "expo-clipboard";
import { BlurView } from "expo-blur";
import {
  colors,
  spacing,
  typography,
  shadows,
  radius,
} from "../../../../constants/theme";
import { AppIcon } from "../../../../components/ui/AppIcons";

type Message = {
  id: string;
  text: string;
  time: string;
  fromSelf: boolean;
  reaction?: string;
  edited?: boolean;
  replyTo?: { name: string; text: string };
};

type SelectedMessage = {
  msg: Message;
  x: number;
  y: number;
  w: number;
  h: number;
};

type ActionKey = "reply" | "copy" | "edit" | "undo";

const REACTIONS = ["❤️", "👍", "👎", "😂", "‼️", "❓"];

// Long-press overlay sizing
const BAR_H = 48;
const GAP = 8;
const ITEM_H = 46;
const MENU_W = 220;
const EDGE_TOP = 56;
const EDGE_BOTTOM = 32;

const conversationData: Record<
  string,
  { name: string; avatar: string; avatarUrl: string; itemTitle: string }
> = {
  "1": { name: "Sarah Chen", avatar: "SC", avatarUrl: "https://placehold.co/40x40/eaf0ff/3563e9?text=SC", itemTitle: "AirPods Pro" },
  "2": { name: "Mike Rodriguez", avatar: "MR", avatarUrl: "https://placehold.co/40x40/eaf0ff/3563e9?text=MR", itemTitle: "Black Wallet" },
  "3": { name: "Priya Nair", avatar: "PN", avatarUrl: "https://placehold.co/40x40/eaf0ff/3563e9?text=PN", itemTitle: "Silver Ring" },
};

const messageData: Record<string, Message[]> = {
  "1": [
    {
      id: "1",
      text: "Hi! I found your AirPods Pro near the library entrance.",
      time: "09:00 AM",
      fromSelf: false,
    },
    {
      id: "2",
      text: "Thank you so much! Are they working properly?",
      time: "09:05 AM",
      fromSelf: true,
    },
    {
      id: "3",
      text: "Yes, everything works. The case has some scratches but the earbuds are in great condition.",
      time: "09:10 AM",
      fromSelf: false,
    },
    {
      id: "4",
      text: "Great, when and where can I pick them up?",
      time: "09:15 AM",
      fromSelf: true,
    },
    {
      id: "5",
      text: "I'll be at the library entrance from 10 AM onwards. You can come anytime after that.",
      time: "09:20 AM",
      fromSelf: false,
    },
  ],
  "2": [
    {
      id: "1",
      text: "Hello, I found a black wallet near Union Square. Is this yours?",
      time: "Yesterday",
      fromSelf: false,
    },
    {
      id: "2",
      text: "Yes, that's mine! Thank you for finding it.",
      time: "Yesterday",
      fromSelf: true,
    },
    {
      id: "3",
      text: "All cards and documents are intact. I've left it with the security desk at Union Square.",
      time: "Yesterday",
      fromSelf: false,
    },
  ],
  "3": [
    {
      id: "1",
      text: "Good news! Your silver ring has been found.",
      time: "2d ago",
      fromSelf: false,
    },
    {
      id: "2",
      text: "That's wonderful! Can you tell me where it was found?",
      time: "2d ago",
      fromSelf: true,
    },
    {
      id: "3",
      text: "It was handed into the lost and found at Central Park.",
      time: "2d ago",
      fromSelf: false,
    },
  ],
};

function BubbleBody({ msg }: { msg: Message }) {
  return (
    <>
      {msg.replyTo && (
        <View style={[styles.quote, msg.fromSelf && styles.quoteSelf]}>
          <Text
            style={[styles.quoteName, msg.fromSelf && styles.quoteNameSelf]}
            numberOfLines={1}
          >
            {msg.replyTo.name}
          </Text>
          <Text
            style={[styles.quoteText, msg.fromSelf && styles.quoteTextSelf]}
            numberOfLines={2}
          >
            {msg.replyTo.text}
          </Text>
        </View>
      )}
      <Text
        style={[styles.messageText, msg.fromSelf && styles.messageTextSelf]}
      >
        {msg.text}
      </Text>
      <View style={styles.metaRow}>
        {msg.edited && (
          <Text
            style={[styles.messageTime, msg.fromSelf && styles.messageTimeSelf]}
          >
            Edited
          </Text>
        )}
        <Text
          style={[styles.messageTime, msg.fromSelf && styles.messageTimeSelf]}
        >
          {msg.time}
        </Text>
        {msg.fromSelf && <Text style={styles.ticks}>✓✓</Text>}
      </View>
    </>
  );
}

export default function ChatScreen() {
  const router = useRouter();
  const { width: winW, height: winH } = useWindowDimensions();
  const { id, name, itemTitle } = useLocalSearchParams<{
    id: string;
    name?: string;
    itemTitle?: string;
  }>();
  const conversation = conversationData[id ?? ""] ?? {
    name: name ?? "Unknown",
    avatar: (name ?? "?")
      .split(" ")
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase(),
    avatarUrl: "",
    itemTitle: itemTitle ?? "Item",
  };
  const [messages, setMessages] = useState<Message[]>(
    messageData[id ?? ""] ?? [],
  );

  const [inputText, setInputText] = useState("");
  const [selected, setSelected] = useState<SelectedMessage | null>(null);
  const [groupH, setGroupH] = useState(0);
  const [replyTo, setReplyTo] = useState<Message | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const scrollRef = useRef<ScrollView>(null);
  const inputRef = useRef<TextInput>(null);
  const bubbleRefs = useRef<Record<string, View | null>>({});
  const canSend = inputText.trim().length > 0;

  const senderName = (msg: Message) =>
    msg.fromSelf ? "You" : conversation.name;

  const handleSend = () => {
    const text = inputText.trim();
    if (!text) return;

    if (editingId) {
      setMessages((current) =>
        current.map((m) =>
          m.id === editingId ? { ...m, text, edited: true } : m,
        ),
      );
      setEditingId(null);
      setInputText("");
      return;
    }

    setMessages((current) => [
      ...current,
      {
        id: Date.now().toString(),
        text,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        fromSelf: true,
        replyTo: replyTo
          ? { name: senderName(replyTo), text: replyTo.text }
          : undefined,
      },
    ]);
    setReplyTo(null);
    setInputText("");
  };

  const handleAttach = () => {
    // TODO: open the attachment options (photo, camera, location...)
  };

  const handleMic = () => {
    // TODO: start recording a voice message
  };

  // ---- Long press ----------------------------------------------------------

  const openMenu = (msg: Message) => {
    // Haptic fires immediately so the press feels responsive
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const node = bubbleRefs.current[msg.id];
    if (!node) return;
    node.measureInWindow((x, y, w, h) => {
      setGroupH(0); // re-measure the new group before showing it
      setSelected({ msg, x, y, w, h });
    });
  };

  const closeMenu = () => setSelected(null);

  // Tapping outside (or Android back) closes the menu with a light haptic
  const dismissMenu = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    closeMenu();
  };

  const handleReaction = (emoji: string) => {
    if (!selected) return;
    const targetId = selected.msg.id;
    Haptics.selectionAsync();
    setMessages((current) =>
      current.map((m) =>
        m.id === targetId
          ? { ...m, reaction: m.reaction === emoji ? undefined : emoji }
          : m,
      ),
    );
    closeMenu();
  };

  const handleAction = async (key: ActionKey) => {
    if (!selected) return;
    const msg = selected.msg;
    closeMenu();

    switch (key) {
      case "reply":
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setEditingId(null);
        setReplyTo(msg);
        inputRef.current?.focus();
        break;
      case "copy":
        await Clipboard.setStringAsync(msg.text);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        break;
      case "edit":
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setReplyTo(null);
        setEditingId(msg.id);
        setInputText(msg.text);
        inputRef.current?.focus();
        break;
      case "undo":
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        setMessages((current) => current.filter((m) => m.id !== msg.id));
        if (editingId === msg.id) {
          setEditingId(null);
          setInputText("");
        }
        break;
    }
  };

  const cancelContext = () => {
    if (editingId) setInputText("");
    setEditingId(null);
    setReplyTo(null);
  };

  const actionsFor = (msg: Message): { key: ActionKey; label: string }[] => {
    const list: { key: ActionKey; label: string }[] = [
      { key: "reply", label: "Reply" },
      { key: "copy", label: "Copy" },
    ];
    if (msg.fromSelf) {
      list.push({ key: "edit", label: "Edit" });
      list.push({ key: "undo", label: "Undo Send" });
    }
    return list;
  };

  // Lifted group: reaction bar + bubble + action menu stacked in ONE column,
  // so they can never overlap whatever the real heights are.
  const renderOverlay = () => {
    if (!selected) return null;
    const { msg, x, y, w } = selected;
    const actions = actionsFor(msg);
    // Keep the whole group on screen once its real height is known
    const desiredTop = y - BAR_H - GAP;
    const top = Math.min(
      Math.max(desiredTop, EDGE_TOP),
      Math.max(winH - groupH - EDGE_BOTTOM, EDGE_TOP),
    );
    const alignStyle = msg.fromSelf
      ? {
          right: Math.max(winW - (x + w), spacing.lg),
          alignItems: "flex-end" as const,
        }
      : { left: Math.max(x, spacing.lg), alignItems: "flex-start" as const };

    return (
      <Modal
        transparent
        visible
        animationType="fade"
        onRequestClose={dismissMenu}
        statusBarTranslucent
      >
        {/* Blurred chat behind, with a light dim so the lifted message pops */}
        <BlurView
          intensity={45}
          tint="dark"
          style={StyleSheet.absoluteFill}
          pointerEvents="none"
        />
        <Pressable
          style={styles.backdrop}
          onPress={dismissMenu}
          accessibilityRole="button"
          accessibilityLabel="Close message options"
        />

        <View
          // Only the bar and menu take touches; empty space in the group
          // falls through to the backdrop so tapping there also closes it
          pointerEvents="box-none"
          style={[
            styles.lifted,
            { top, opacity: groupH > 0 ? 1 : 0 },
            alignStyle,
          ]}
          onLayout={(e) => {
            const height = e.nativeEvent.layout.height;
            if (Math.abs(height - groupH) > 0.5) setGroupH(height);
          }}
        >
          <View style={styles.reactionBar}>
            {REACTIONS.map((emoji) => {
              const active = msg.reaction === emoji;
              return (
                <Pressable
                  key={emoji}
                  style={[
                    styles.reactionButton,
                    active && styles.reactionActive,
                  ]}
                  onPress={() => handleReaction(emoji)}
                  accessibilityRole="button"
                  accessibilityLabel={`React with ${emoji}`}
                  accessibilityState={{ selected: active }}
                >
                  <Text style={styles.reactionEmoji}>{emoji}</Text>
                </Pressable>
              );
            })}
          </View>

          <View
            pointerEvents="none"
            style={[
              styles.messageBubble,
              msg.fromSelf ? styles.messageFromSelf : styles.messageFromOther,
              styles.bubbleLifted,
              // Same width as the original; extra room above for the reaction badge
              { width: w, maxWidth: w, marginTop: msg.reaction ? 12 : 0 },
            ]}
          >
            <BubbleBody msg={msg} />
            {msg.reaction && (
              <View
                style={[
                  styles.reactionBadge,
                  msg.fromSelf
                    ? styles.reactionBadgeSelf
                    : styles.reactionBadgeOther,
                ]}
              >
                <Text style={styles.reactionBadgeText}>{msg.reaction}</Text>
              </View>
            )}
          </View>

          <View style={[styles.menu, { width: MENU_W }]}>
            {actions.map((action, index) => (
              <Pressable
                key={action.key}
                style={({ pressed }) => [
                  styles.menuRow,
                  index < actions.length - 1 && styles.menuRowDivider,
                  pressed && styles.menuRowPressed,
                ]}
                onPress={() => handleAction(action.key)}
                accessibilityRole="button"
                accessibilityLabel={action.label}
              >
                <Text
                  style={[
                    styles.menuRowText,
                    action.key === "undo" && styles.menuRowTextDanger,
                  ]}
                >
                  {action.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </Modal>
    );
  };

  const contextTarget = editingId
    ? messages.find((m) => m.id === editingId)
    : replyTo;

  return (
    <SafeAreaProvider>
      {/* No padding on SafeAreaView (iOS ignores it); spacing lives on the children */}
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.select({ ios: "padding", android: undefined })}
          style={styles.flex}
        >
          <View style={styles.header}>
            <Pressable
              style={styles.backButton}
              onPress={() => router.back()}
              accessibilityRole="button"
              accessibilityLabel="Go back"
            >
              <AppIcon
                name="back"
                size={24}
                color={colors.text}
                strokeWidth={1.5}
              />
            </Pressable>
            <View style={styles.avatar}>
              {conversation.avatarUrl ? (
                <Image source={{ uri: conversation.avatarUrl }} style={styles.avatarImage} />
              ) : (
                <Text style={styles.avatarText}>{conversation.avatar}</Text>
              )}
            </View>
            <View style={styles.headerInfo}>
              <Text style={styles.headerName} numberOfLines={1}>
                {conversation.name}
              </Text>
              <Text style={styles.headerStatus} numberOfLines={1}>
                Re: {conversation.itemTitle}
              </Text>
            </View>
            <Pressable
              style={styles.moreButton}
              onPress={() => {}}
              accessibilityRole="button"
              accessibilityLabel="More options"
            >
              <AppIcon
                name="more"
                size={24}
                color={colors.text}
                strokeWidth={1.5}
              />
            </Pressable>
          </View>

          <ScrollView
            ref={scrollRef}
            style={styles.messageList}
            contentContainerStyle={styles.messageContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            onContentSizeChange={() =>
              scrollRef.current?.scrollToEnd({ animated: true })
            }
          >
            {messages.map((msg) => (
              <Pressable
                key={msg.id}
                ref={(node) => {
                  bubbleRefs.current[msg.id] = node;
                }}
                collapsable={false}
                delayLongPress={300}
                onLongPress={() => openMenu(msg)}
                accessibilityRole="button"
                accessibilityLabel={`${senderName(msg)}: ${msg.text}`}
                accessibilityHint="Long press for message options"
                style={({ pressed }) => [
                  styles.messageBubble,
                  msg.fromSelf
                    ? styles.messageFromSelf
                    : styles.messageFromOther,
                  msg.reaction ? styles.bubbleWithReaction : null,
                  pressed && styles.bubblePressed,
                  // The lifted copy in the overlay takes this message's place
                  selected?.msg.id === msg.id && styles.bubbleHidden,
                ]}
              >
                <BubbleBody msg={msg} />
                {msg.reaction && (
                  <View
                    style={[
                      styles.reactionBadge,
                      msg.fromSelf
                        ? styles.reactionBadgeSelf
                        : styles.reactionBadgeOther,
                    ]}
                  >
                    <Text style={styles.reactionBadgeText}>{msg.reaction}</Text>
                  </View>
                )}
              </Pressable>
            ))}
          </ScrollView>

          {contextTarget && (
            <View style={styles.contextBar}>
              <View style={styles.contextAccent} />
              <View style={styles.contextInfo}>
                <Text style={styles.contextTitle} numberOfLines={1}>
                  {editingId
                    ? "Editing message"
                    : `Replying to ${senderName(contextTarget)}`}
                </Text>
                <Text style={styles.contextText} numberOfLines={1}>
                  {contextTarget.text}
                </Text>
              </View>
              <Pressable
                style={styles.contextClose}
                onPress={cancelContext}
                hitSlop={8}
                accessibilityRole="button"
                accessibilityLabel="Cancel"
              >
                <AppIcon name="cancel" size={18} color={colors.textMuted} />
              </Pressable>
            </View>
          )}

          <View
            style={[
              styles.inputContainer,
              contextTarget && styles.inputContainerNoBorder,
            ]}
          >
            <Pressable
              style={styles.attachButton}
              onPress={handleAttach}
              accessibilityRole="button"
              accessibilityLabel="Attach media"
            >
              <AppIcon
                name="paperclip"
                size={22}
                color={colors.textMuted}
                strokeWidth={1.5}
              />
            </Pressable>
            <TextInput
              ref={inputRef}
              style={styles.textInput}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Type a message..."
              placeholderTextColor={colors.textMuted}
              onSubmitEditing={handleSend}
              returnKeyType="send"
            />
            <Pressable
              style={[
                styles.actionButton,
                canSend && styles.actionButtonActive,
              ]}
              onPress={canSend ? handleSend : handleMic}
              accessibilityRole="button"
              accessibilityLabel={
                canSend ? "Send message" : "Record voice message"
              }
            >
              <AppIcon
                name={canSend ? "send" : "mic"}
                size={20}
                color={canSend ? "#FFFFFF" : colors.text}
              />
            </Pressable>
          </View>
        </KeyboardAvoidingView>
        {renderOverlay()}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    backgroundColor: colors.primarySoft,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  avatarText: {
    fontSize: typography.sm,
    fontWeight: "700",
    color: colors.primary,
  },
  headerInfo: {
    flex: 1,
    minWidth: 0,
  },
  headerName: {
    fontSize: typography.md,
    fontWeight: "700",
    color: colors.text,
  },
  headerStatus: {
    fontSize: 11,
    color: colors.textMuted,
  },
  moreButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  messageList: {
    flex: 1,
  },
  messageContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    gap: spacing.md,
  },
  messageBubble: {
    maxWidth: "80%",
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: 6,
    borderRadius: 18,
  },
  // No scale here: the long press fires while pressed, and a scaled bubble
  // would be measured slightly smaller than it really is.
  bubblePressed: {
    opacity: 0.85,
  },
  bubbleWithReaction: {
    marginTop: 10,
  },
  bubbleHidden: {
    opacity: 0,
  },
  messageFromSelf: {
    alignSelf: "flex-end",
    backgroundColor: colors.primary,
    borderBottomRightRadius: 4,
  },
  messageFromOther: {
    alignSelf: "flex-start",
    backgroundColor: colors.surface,
    borderBottomLeftRadius: 4,
    ...shadows.card,
  },
  messageText: {
    fontSize: typography.sm,
    lineHeight: 20,
    color: colors.text,
  },
  messageTextSelf: {
    color: "#FFFFFF",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    gap: 4,
    marginTop: 2,
  },
  messageTime: {
    fontSize: 10,
    lineHeight: 14,
    color: colors.textMuted,
  },
  messageTimeSelf: {
    color: "rgba(255,255,255,0.75)",
  },
  ticks: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: -2,
    color: "rgba(255,255,255,0.75)",
  },

  // Reply quote inside a bubble
  quote: {
    marginBottom: 6,
    paddingLeft: spacing.sm,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  quoteSelf: {
    borderLeftColor: "rgba(255,255,255,0.7)",
  },
  quoteName: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.primary,
  },
  quoteNameSelf: {
    color: "#FFFFFF",
  },
  quoteText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  quoteTextSelf: {
    color: "rgba(255,255,255,0.85)",
  },

  // Reaction badge on a bubble
  reactionBadge: {
    position: "absolute",
    top: -12,
    minWidth: 26,
    height: 26,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.background,
    ...shadows.card,
  },
  reactionBadgeSelf: {
    left: -8,
  },
  reactionBadgeOther: {
    right: -8,
  },
  reactionBadgeText: {
    fontSize: 13,
  },

  // Long-press overlay
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  // Focused message: stronger shadow so it clearly floats above the blur
  bubbleLifted: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 12,
  },
  lifted: {
    position: "absolute",
    gap: GAP,
  },
  reactionBar: {
    height: BAR_H,
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    paddingHorizontal: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.full,
    ...shadows.card,
  },
  reactionButton: {
    width: 38,
    height: 38,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
  },
  reactionActive: {
    backgroundColor: colors.primarySoft,
  },
  reactionEmoji: {
    fontSize: 22,
  },
  menu: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    overflow: "hidden",
    ...shadows.card,
  },
  menuRow: {
    height: ITEM_H,
    justifyContent: "center",
    paddingHorizontal: spacing.md,
  },
  menuRowDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  menuRowPressed: {
    backgroundColor: colors.surfaceSecondary,
  },
  menuRowText: {
    fontSize: typography.md,
    color: colors.text,
  },
  menuRowTextDanger: {
    color: colors.danger,
  },

  // Reply / edit bar above the input
  contextBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
  contextAccent: {
    width: 3,
    alignSelf: "stretch",
    borderRadius: 2,
    backgroundColor: colors.primary,
  },
  contextInfo: {
    flex: 1,
    minWidth: 0,
  },
  contextTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.primary,
  },
  contextText: {
    fontSize: typography.sm,
    color: colors.textSecondary,
  },
  contextClose: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
  inputContainerNoBorder: {
    borderTopWidth: 0,
  },
  textInput: {
    flex: 1,
    height: 44,
    paddingHorizontal: spacing.md,
    fontSize: typography.md,
    color: colors.text,
    backgroundColor: colors.surface,
    borderRadius: radius.full,
    ...shadows.card,
  },
  attachButton: {
    width: 44,
    height: 44,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    ...shadows.card,
  },
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceSecondary,
    alignItems: "center",
    justifyContent: "center",
    ...shadows.card,
  },
  actionButtonActive: {
    backgroundColor: colors.primary,
  },
});
