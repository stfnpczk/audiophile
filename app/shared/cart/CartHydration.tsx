'use client';

import { useEffect } from 'react';
import { useCartStore } from '@/app/store/cartStore';

export function CartHydration() {
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  return null;
}
