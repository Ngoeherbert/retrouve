import { Tabs, router } from 'expo-router';
import { View, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@/components/icon';

function CustomTabBar({ state, navigation }: any) {
  const insets = useSafeAreaInsets();
  const go = (name: string) => {
    if (navigation?.navigate) return navigation.navigate(name);
    return router.navigate(`/(tabs)/${name}` as never);
  };

  const isFocused = (routeName: string) => {
    const route = state.routes[state.index];
    if (routeName === 'index' && route.name === 'index') return true;
    if (routeName === 'search' && route.name === 'search') return true;
    if (routeName === 'messages' && route.name === 'messages') return true;
    if (routeName === 'profile' && route.name === 'profile') return true;
    return false;
  };

  return (
    <View 
      style={{ 
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 16,
        backgroundColor: '#1a1a1a',
        left: 16,
        right: 16,
        bottom: insets.bottom + 12,
        borderRadius: 50,
        height: 65
      }}
    >
      <TouchableOpacity
        onPress={() => go('index')}
        style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}
      >
        <View style={{ width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: isFocused('index') ? '#FFD43B' : 'transparent' }}>
          <Icon name="home" size={20} color={isFocused('index') ? '#000' : '#fff'} />
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity
        onPress={() => go('search')}
        style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}
      >
        <View style={{ width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: isFocused('search') ? '#FFD43B' : 'transparent' }}>
          <Icon name="search" size={20} color={isFocused('search') ? '#000' : '#fff'} />
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity
        onPress={() => router.push('/report/step-1')}
        style={{ width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFD43B' }}
      >
        <Icon name="add" size={24} color="#000" />
      </TouchableOpacity>
      
      <TouchableOpacity
        onPress={() => go('messages')}
        style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}
      >
        <View style={{ width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: isFocused('messages') ? '#FFD43B' : 'transparent' }}>
          <Icon name="chat" size={20} color={isFocused('messages') ? '#000' : '#fff'} />
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity
        onPress={() => go('profile')}
        style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}
      >
        <View style={{ width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: isFocused('profile') ? '#FFD43B' : 'transparent' }}>
          <Icon name="profile" size={20} color={isFocused('profile') ? '#000' : '#fff'} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="search" />
      <Tabs.Screen name="messages" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
