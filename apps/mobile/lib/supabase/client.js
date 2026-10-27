import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import * as SQLite from 'expo-sqlite';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Missing Supabase environment variables. Check your .env file.'
  );
}

const storage = SQLite.createAsyncStorage('retrouve-auth');

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
