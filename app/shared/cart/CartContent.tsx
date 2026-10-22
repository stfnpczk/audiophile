'use client';

import {
  useCartStore,
  selectCartItems,
  selectSubtotal,
  selectTotalQuantity,
} from '@/app/store/cartStore';
import { formatPrice } from '@/app/utils/formatPrice';
import { Button } from '@/app/shared/Button';
import { CartItem } from './CartItem';

interface CartContentProps {
  onCheckoutClick?: () => void;
}

export function CartContent({ onCheckoutClick }: CartContentProps) {
  const items = useCartStore(selectCartItems);
  const subtotal = useCartStore(selectSubtotal);
  const totalQuantity = useCartStore(selectTotalQuantity);
  const clearCart = useCartStore((state) => state.clearCart);

  const isEmpty = items.length === 0;

  return (
    <div className='flex w-81.75 flex-col gap-8 rounded-lg bg-white p-8 shadow-xl md:w-94.25'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <h2 className='text-lg font-bold tracking-[1.29px] text-black uppercase'>
          Cart {!isEmpty && `(${totalQuantity})`}
        </h2>
        {!isEmpty && (
          <button
            type='button'
            onClick={clearCart}
            className='cursor-pointer text-[15px] font-medium text-black/50 underline transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange can-hover:hover:text-orange'
          >
            Remove all
          </button>
        )}
      </div>

      {/* Items */}
      {isEmpty ? (
        <p className='py-8 text-center text-[15px] font-medium text-black/50'>
          Your cart is empty
        </p>
      ) : (
        <ul className='flex flex-col gap-6'>
          {items.map((item) => (
            <li key={item.productId}>
              <CartItem item={item} />
            </li>
          ))}
        </ul>
      )}

      {/* Total */}
      {!isEmpty && (
        <div className='flex items-center justify-between'>
          <span className='text-[15px] font-medium text-black/50 uppercase'>
            Total
          </span>
          <span className='text-lg font-bold text-black'>
            {formatPrice(subtotal)}
          </span>
        </div>
      )}

      {/* Checkout Button */}
      <Button
        href='/checkout'
        size='full'
        disabled={isEmpty}
        onClick={onCheckoutClick}
      >
        Checkout
      </Button>
    </div>
  );
}
