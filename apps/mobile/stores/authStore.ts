import { create } from "zustand";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase/client";

interface AuthState {
  session: Session | null;
  user: User | null;
  loading: boolean;
  setSession: (session: Session | null) => void;
  initialize: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  user: null,
  loading: true,

  setSession: (session) => {
    set({
      session,
      user: session?.user ?? null,
      loading: false,
    });
  },

  initialize: async () => {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      set({ loading: false });
      throw error;
    }

    set({
      session: data.session,
      user: data.session?.user ?? null,
      loading: false,
    });
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;

    set({
      session: null,
      user: null,
      loading: false,
    });
  },
}));
