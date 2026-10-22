'use client';

import { useCartStore, selectTotalQuantity } from '@/app/store/cartStore';

export function CartBadge() {
  const totalQuantity = useCartStore(selectTotalQuantity);

  if (totalQuantity === 0) return null;

  return (
    <span className='absolute -top-2 -right-1 flex size-4 items-center justify-center rounded-full bg-orange text-xs font-bold text-white'>
      {totalQuantity > 99 ? '99+' : totalQuantity}
    </span>
  );
}
