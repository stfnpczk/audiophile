'use client';

import { useEffect } from 'react';
import { useCartStore } from '@/app/store/cartStore';

export function CartHydration() {
  useEffect(() => {
    Promise.resolve(useCartStore.persist.rehydrate()).catch(() => {
      useCartStore.persist.clearStorage();
      return useCartStore.persist.rehydrate();
    });
  }, []);

  return null;
}
