'use client';

import Image from 'next/image';
import { useCartStore } from '@/app/store/cartStore';
import { formatPrice } from '@/app/utils/formatPrice';
import { QuantitySelector } from '@/app/shared/QuantitySelector';
import type { CartItem as CartItemType } from '@/app/store/cartSchema';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  return (
    <div className='flex items-center gap-4'>
      <div className='relative size-16 shrink-0 overflow-hidden rounded-lg'>
        <Image
          src={item.image}
          alt={item.name}
          fill
          className='object-cover'
          sizes='64px'
        />
      </div>

      <div className='flex flex-1 flex-col'>
        <span className='text-[15px]/6.25 font-bold text-black'>
          {item.shortName}
        </span>
        <span className='text-sm font-bold text-black/50'>
          {formatPrice(item.price)}
        </span>
      </div>

      <QuantitySelector
        value={item.quantity}
        onChange={(quantity) => updateQuantity(item.productId, quantity)}
        min={0}
        size='sm'
        itemName={item.shortName}
      />
    </div>
  );
}
