import { useSyncExternalStore } from 'react';
import { z } from 'zod';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { safeStorage } from '@/app/utils/safeStorage';
import { cartItemSchema, cartSchema, type CartItem } from './cartSchema';

interface CartState {
  items: CartItem[];
}

interface CartActions {
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

export type CartStore = CartState & CartActions;

const MAX_QUANTITY = 99;
const MIN_QUANTITY = 1;

let hasRetriedHydration = false;

const clampQuantity = (quantity: number) =>
  Math.min(Math.max(Math.floor(quantity), MIN_QUANTITY), MAX_QUANTITY);

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],

      addItem: (item, quantity = 1) => {
        const validated = cartItemSchema
          .omit({ quantity: true })
          .safeParse(item);
        if (!validated.success) {
          console.error('Invalid cart item:', z.flattenError(validated.error));
          return;
        }

        set((state) => {
          const existing = state.items.find(
            (i) => i.productId === item.productId,
          );
          const requested = clampQuantity(quantity);
          if (existing) {
            const newQuantity = clampQuantity(existing.quantity + requested);
            return {
              items: state.items.map((i) =>
                i.productId === item.productId
                  ? { ...i, quantity: newQuantity }
                  : i,
              ),
            };
          }
          return {
            items: [...state.items, { ...item, quantity: requested }],
          };
        });
      },

      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items:
            quantity < MIN_QUANTITY
              ? state.items.filter((i) => i.productId !== productId)
              : state.items.map((i) =>
                  i.productId === productId
                    ? { ...i, quantity: clampQuantity(quantity) }
                    : i,
                ),
        })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'audiophile-cart',
      skipHydration: true,

      onRehydrateStorage: () => (_state, error) => {
        if (!error || hasRetriedHydration) return;
        hasRetriedHydration = true;
        useCartStore.persist.clearStorage();
        useCartStore.persist.rehydrate();
      },
      storage: createJSONStorage(() => ({
        getItem: (name) => {
          const str = safeStorage.get(name);
          if (!str) return null;

          try {
            const parsed = JSON.parse(str);
            const validated = cartSchema.safeParse(parsed.state?.items);
            if (!validated.success) {
              console.error(
                'Invalid cart data, clearing:',
                z.flattenError(validated.error),
              );
              safeStorage.remove(name);
              return null;
            }
            return str;
          } catch {
            safeStorage.remove(name);
            return null;
          }
        },
        setItem: (name, value) => {
          safeStorage.set(name, value);
        },
        removeItem: (name) => {
          safeStorage.remove(name);
        },
      })),
    },
  ),
);

// Hydration hook
export const useCartHydrated = () =>
  useSyncExternalStore(
    (onChange) => {
      const unsubHydrate = useCartStore.persist.onHydrate(onChange);
      const unsubFinish = useCartStore.persist.onFinishHydration(onChange);
      return () => {
        unsubHydrate();
        unsubFinish();
      };
    },
    () => useCartStore.persist.hasHydrated(),
    () => false,
  );

// Selectors
export const selectCartItems = (state: CartStore) => state.items;

export const selectTotalQuantity = (state: CartStore) =>
  state.items.reduce((sum, item) => sum + item.quantity, 0);

export const selectSubtotal = (state: CartStore) =>
  state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

export const selectIsEmpty = (state: CartStore) => state.items.length === 0;
