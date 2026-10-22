'use client';

import { useEffect } from 'react';
import { useCartStore } from '@/app/store/cartStore';

export function CartHydration() {
  useEffect(() => {
    Promise.resolve(useCartStore.persist.rehydrate()).catch(() => {});
  }, []);

  return null;
}
