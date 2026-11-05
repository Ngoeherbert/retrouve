import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter, useSegments } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon } from '@/components/icon';
import { Brand as brand } from '@/constants/theme';

interface ScreenPlaceholderProps {
  title: string;
}

export function ScreenPlaceholder({ title }: ScreenPlaceholderProps) {
  const router = useRouter();
  const segments = useSegments() as string[];
  const insets = useSafeAreaInsets();

  const isTabRoot = segments[0] === '(tabs)';
  const showBackButton = !isTabRoot;
  const currentPath = '/' + segments.join('/');

  return (
    <View
      className="flex-1 items-center justify-center px-4"
      style={{ backgroundColor: brand.bg, paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      {showBackButton && (
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={() => router.back()}
          activeOpacity={0.8}
          className="absolute left-4 w-11 h-11 rounded-full bg-white items-center justify-center"
          style={{ top: insets.top + 12 }}
        >
          <Icon name="back" size={22} color={brand.ink} strokeWidth={2} />
        </TouchableOpacity>
      )}

      <Text className="text-2xl font-bold mb-2" style={{ color: brand.ink }}>
        {title}
      </Text>
      <Text className="text-sm" style={{ color: brand.muted }}>
        {currentPath}
      </Text>
    </View>
  );
}

export default ScreenPlaceholder;
