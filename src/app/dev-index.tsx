import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function DevIndex() {
  const insets = useSafeAreaInsets();
  
  const screens = [
    { name: 'Welcome', path: '/' },
    { name: 'Sign in', path: '/(auth)/sign-in' },
    { name: 'Sign up', path: '/(auth)/sign-up' },
    { name: 'Forgot password', path: '/(auth)/forgot-password' },
    { name: 'Verify phone', path: '/(auth)/verify-phone' },
    { name: 'Location permission', path: '/(auth)/location-permission' },
    { name: 'Home', path: '/(tabs)' },
    { name: 'Search results', path: '/(tabs)/search' },
    { name: 'Search empty state', path: '/(tabs)/search/empty' },
    { name: 'Map view', path: '/(tabs)/search/map' },
    { name: 'Filters (modal)', path: '/filters' },
    { name: 'Item detail', path: '/item/123' },
    { name: 'What happened?', path: '/report/step-1' },
    { name: 'Where was it?', path: '/report/step-2' },
    { name: 'Hide private details', path: '/report/step-3' },
    { name: 'Looks good?', path: '/report/step-4' },
    { name: 'Report published', path: '/report/published' },
    { name: 'Matches', path: '/report/matches' },
    { name: 'Prove it is yours', path: '/claim/123/prove' },
    { name: 'Your claim', path: '/claim/123/status' },
    { name: 'Review claim (finder view)', path: '/claim/123/review' },
    { name: 'Item returned and rating', path: '/handover/123' },
    { name: 'Messages list', path: '/(tabs)/messages' },
    { name: 'Chat thread', path: '/messages/123' },
    { name: 'Notifications inbox', path: '/notifications' },
    { name: 'Activity', path: '/activity' },
    { name: 'Saved searches', path: '/saved-searches' },
    { name: 'My profile', path: '/(tabs)/profile' },
    { name: 'Public profile', path: '/user/123' },
    { name: 'Ratings and reviews', path: '/ratings' },
    { name: 'Rate user (modal)', path: '/rate/123' },
    { name: 'Settings hub', path: '/settings' },
    { name: 'Edit profile', path: '/settings/edit-profile' },
    { name: 'Password security', path: '/settings/password-security' },
    { name: 'ID and phone verification', path: '/settings/verification' },
    { name: 'Notifications settings', path: '/settings/notifications' },
    { name: 'Privacy location', path: '/settings/privacy-location' },
    { name: 'Language', path: '/settings/language' },
    { name: 'Delete account', path: '/settings/delete-account' },
    { name: 'Terms privacy', path: '/settings/terms-privacy' },
    { name: 'Help center', path: '/settings/help-center' },
    { name: 'My report', path: '/my-report/123' },
    { name: 'Report this post (modal)', path: '/report-post/123' },
  ];
  
  return (
    <ScrollView 
      className="flex-1" 
      style={{ backgroundColor: '#F1F2F7' }}
      contentContainerStyle={{ paddingTop: insets.top + 20, paddingBottom: insets.bottom + 20, paddingHorizontal: 16 }}
    >
      <Text className="text-2xl font-bold mb-6" style={{ color: '#0B0F14' }}>Dev Index</Text>
      {screens.map((screen, index) => (
        <Link key={index} href={screen.path as any} asChild>
          <TouchableOpacity className="py-3 px-4 mb-2 bg-white rounded-lg">
            <Text style={{ color: '#0B0F14' }}>{screen.name}</Text>
            <Text className="text-xs mt-1" style={{ color: '#666' }}>{screen.path}</Text>
          </TouchableOpacity>
        </Link>
      ))}
    </ScrollView>
  );
}
