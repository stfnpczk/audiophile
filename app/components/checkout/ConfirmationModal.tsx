'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/app/shared/Button';
import { formatPrice } from '@/app/utils/formatPrice';
import type { CartItem } from '@/app/store/cartSchema';

interface ConfirmationModalProps {
  isOpen: boolean;
  items: CartItem[];
  grandTotal: number;
  onDismiss: () => void;
}

export function ConfirmationModal({
  isOpen,
  items,
  grandTotal,
  onDismiss,
}: ConfirmationModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [showAllItems, setShowAllItems] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }

    const handleCancel = (event: Event) => {
      event.preventDefault();
      onDismiss();
    };
    dialog.addEventListener('cancel', handleCancel);
    return () => dialog.removeEventListener('cancel', handleCancel);
  }, [isOpen, onDismiss]);

  // Close if hidden by navigation (cacheComponents)
  useEffect(() => {
    const dialog = dialogRef.current;
    return () => {
      if (dialog?.open) dialog.close();
    };
  }, [isOpen]);

  if (!isOpen || items.length === 0) return null;

  const firstItem = items[0];
  const remainingItems = items.slice(1);
  const remainingCount = remainingItems.length;

  const renderItem = (item: CartItem) => (
    <li key={item.productId} className='flex items-center gap-4'>
      <Image
        src={item.image}
        alt={item.name}
        width={50}
        height={50}
        className='size-12.5 rounded-lg object-cover'
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
  );

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby='confirmation-title'
      className='m-auto w-full max-w-135 rounded-lg bg-white p-8 backdrop:bg-black/40 backdrop:backdrop-blur-sm md:p-12'
    >
      <div className='flex flex-col gap-6 md:gap-8'>
        <Image
          src='/assets/checkout/icon-order-confirmation.svg'
          alt=''
          width={64}
          height={64}
        />

        <div className='flex flex-col gap-4'>
          <h2
            id='confirmation-title'
            className='text-2xl/7 font-bold tracking-[0.86px] uppercase md:text-[32px]/9 md:tracking-[1.14px]'
          >
            Thank you
            <br />
            for your order
          </h2>
          <p className='text-[15px] text-black/50'>
            You will receive an email confirmation shortly.
          </p>
        </div>

        <div className='flex flex-col overflow-hidden rounded-lg md:flex-row'>
          <div className='flex flex-1 flex-col bg-lightGray p-6'>
            <ul className='flex flex-col gap-4'>{renderItem(firstItem)}</ul>

            {remainingCount > 0 && (
              <>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out motion-reduce:transition-none ${
                    showAllItems ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className='overflow-hidden'>
                    <ul className='flex flex-col gap-4 pt-4'>
                      {remainingItems.map(renderItem)}
                    </ul>
                  </div>
                </div>

                <hr className='mt-3 border-black/10' />
                <button
                  type='button'
                  onClick={() => setShowAllItems(!showAllItems)}
                  aria-expanded={showAllItems}
                  className='mt-3 cursor-pointer text-xs font-bold text-black/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange'
                >
                  {showAllItems
                    ? 'View less'
                    : `and ${remainingCount} other item(s)`}
                </button>
              </>
            )}
          </div>

          <div className='flex flex-col justify-end gap-2 bg-black p-6 md:w-49.5'>
            <span className='text-[15px] text-white/50'>GRAND TOTAL</span>
            <span className='text-lg font-bold text-white'>
              {formatPrice(grandTotal)}
            </span>
          </div>
        </div>

        <Button size='full' onClick={onDismiss}>
          Back to Home
        </Button>
      </div>
    </dialog>
  );
}
