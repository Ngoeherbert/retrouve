import { create } from 'zustand';
import { mockItems } from '../data/mockItems';
import type { Item } from '../types/item';

interface ItemsState {
  items: Item[];
  addItem: (newItem: Omit<Item, 'id' | 'date'> & {
    id?: string;
    date?: string;
  }) => void;
  updateItem: (id: string, updates: Partial<Item>) => void;
  resolveItem: (id: string) => void;
  removeItem: (id: string) => void;
}

export const useItemsStore = create<ItemsState>((set) => ({
  items: mockItems as Item[],

  addItem: (newItem) =>
    set((state) => ({
      items: [
        {
          ...newItem,
          id: newItem.id ?? `item-${Date.now()}`,
          date: newItem.date ?? new Date().toISOString().slice(0, 10),
        },
        ...state.items,
      ],
    })),

  updateItem: (id, updates) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      ),
    })),

  resolveItem: (id) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, status: 'resolved' } : item
      ),
    })),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
}));
