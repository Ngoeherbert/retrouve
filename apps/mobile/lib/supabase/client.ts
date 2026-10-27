import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import Storage from 'expo-sqlite/kv-store';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Missing Supabase environment variables. Check your .env file.',
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: Storage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
