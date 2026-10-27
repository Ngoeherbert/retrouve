import { create } from 'zustand';

interface SavedState {
  savedIds: string[];
  toggleSaved: (id: string) => void;
  isSaved: (id: string) => boolean;
}

export const useSavedStore = create<SavedState>((set, get) => ({
  savedIds: [],

  toggleSaved: (id) =>
    set((state) => ({
      savedIds: state.savedIds.includes(id)
        ? state.savedIds.filter((savedId) => savedId !== id)
        : [...state.savedIds, id],
    })),

  isSaved: (id) => get().savedIds.includes(id),
}));
