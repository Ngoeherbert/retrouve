import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import type { Item } from "../../types/item";
import StatusBadge from "./StatusBadge";
import { colors, radius, spacing, shadows } from "../../constants/theme";
import { AppIcon } from "./AppIcons";

interface ItemCardProps {
  item: Item;
  onPress: () => void;
  hasCamera?: boolean;
}

export default function ItemCard({
  item,
  onPress,
  hasCamera = false,
}: ItemCardProps) {
  const { width: windowWidth } = useWindowDimensions();
  const isLost = item.status === "lost";

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { width: windowWidth - 32 },
        pressed && styles.pressed,
      ]}
    >
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.image} />
      ) : (
        <View style={[styles.image, styles.imagePlaceholder]}>
          <Text style={styles.placeholderText}>No photo</Text>
          {hasCamera && (
            <View style={styles.cameraOverlay}>
              <AppIcon name="camera" size={28} color="white" strokeWidth={2} />
            </View>
          )}
        </View>
      )}

      <View style={styles.content}>
        <StatusBadge status={item.status} />

        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>

        {!!item.location && (
          <Text style={styles.location} numberOfLines={1}>
            {item.location}
          </Text>
        )}

        {!!item.date && <Text style={styles.date}>{item.date}</Text>}

        <Text
          style={[
            styles.action,
            { color: isLost ? colors.danger : colors.success },
          ]}
        >
          {isLost ? "Help find this item" : "Could this be yours?"}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    overflow: "hidden",
    ...shadows.card,
  },
  image: {
    width: "100%",
    height: 180,
    backgroundColor: colors.surfaceSecondary,
  },
  imagePlaceholder: { alignItems: "center", justifyContent: "center" },
  placeholderText: { color: colors.textMuted, fontSize: 13 },
  content: { padding: spacing.md, gap: spacing.sm },
  title: { color: colors.text, fontSize: 17, fontWeight: "700" },
  location: { color: colors.textSecondary, fontSize: 13 },
  date: { color: colors.textMuted, fontSize: 12 },
  action: { fontSize: 13, fontWeight: "700", marginTop: 2 },
  pressed: { opacity: 0.85 },
  cameraOverlay: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: radius.full,
    padding: 4,
  },
});
