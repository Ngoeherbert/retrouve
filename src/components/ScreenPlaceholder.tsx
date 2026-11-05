import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter, useSegments } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ScreenPlaceholderProps {
  title: string;
}

export function ScreenPlaceholder({ title }: ScreenPlaceholderProps) {
  const router = useRouter();
  const segments = useSegments() as string[];
  const insets = useSafeAreaInsets();
  
  // Hide back button on tab roots
  const isTabRoot = segments[0] === '(tabs)';
  
  const showBackButton = !isTabRoot;

  const currentPath = '/' + segments.join('/');

  return (
    <View 
      className="flex-1 items-center justify-center px-4" 
      style={{ backgroundColor: '#F1F2F7', paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      {showBackButton && (
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute w-10 h-10 rounded-full bg-black items-center justify-center"
          style={{ top: insets.top + 16, left: 16 }}
        >
          <Text className="text-white text-lg">←</Text>
        </TouchableOpacity>
      )}
      
      <Text className="text-2xl font-bold mb-2" style={{ color: '#0B0F14' }}>
        {title}
      </Text>
      <Text className="text-sm" style={{ color: '#666' }}>
        {currentPath}
      </Text>
    </View>
  );
}

export default ScreenPlaceholder;
