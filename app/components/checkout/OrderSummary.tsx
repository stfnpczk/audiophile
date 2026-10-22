'use client';

import Image from 'next/image';
import {
  useCartStore,
  selectCartItems,
  selectSubtotal,
} from '@/app/store/cartStore';
import { formatPrice } from '@/app/utils/formatPrice';
import { getOrderTotals } from '@/app/utils/orderTotals';
import { Button } from '@/app/shared/Button';

interface OrderSummaryProps {
  isSubmitting: boolean;
}

export function OrderSummary({ isSubmitting }: OrderSummaryProps) {
  const items = useCartStore(selectCartItems);
  const subtotal = useCartStore(selectSubtotal);

  const { vat, shipping, grandTotal } = getOrderTotals(subtotal);

  return (
    <div className='flex h-fit flex-col gap-8 rounded-lg bg-white p-6 md:p-8'>
      <h2 className='text-lg font-bold tracking-[1.29px] uppercase'>Summary</h2>

      <ul className='flex flex-col gap-6'>
        {items.map((item) => (
          <li key={item.productId} className='flex items-center gap-4'>
            <Image
              src={item.image}
              alt={item.name}
              width={64}
              height={64}
              className='size-16 rounded-lg object-cover'
            />
            <div className='flex flex-1 flex-col'>
              <span className='text-[15px] font-bold'>{item.shortName}</span>
              <span className='text-sm font-bold text-black/50'>
                {formatPrice(item.price)}
              </span>
            </div>
            <span className='text-[15px] font-bold text-black/50'>
              x{item.quantity}
            </span>
          </li>
        ))}
      </ul>

      <div className='flex flex-col gap-2'>
        <div className='flex items-center justify-between'>
          <span className='text-[15px] text-black/50'>TOTAL</span>
          <span className='text-lg font-bold'>{formatPrice(subtotal)}</span>
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-[15px] text-black/50'>SHIPPING</span>
          <span className='text-lg font-bold'>{formatPrice(shipping)}</span>
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-[15px] text-black/50'>VAT (INCLUDED)</span>
          <span className='text-lg font-bold'>{formatPrice(vat)}</span>
        </div>
        <div className='mt-4 flex items-center justify-between'>
          <span className='text-[15px] text-black/50'>GRAND TOTAL</span>
          <span className='text-lg font-bold text-orange'>
            {formatPrice(grandTotal)}
          </span>
        </div>
      </div>

      <Button
        type='submit'
        size='full'
        loading={isSubmitting}
        disabled={items.length === 0}
      >
        Continue & Pay
      </Button>
    </div>
  );
}
