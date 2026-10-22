'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useFocusTrap } from '@/app/hooks/useFocusTrap';
import { useCartStore, selectTotalQuantity } from '@/app/store/cartStore';
import { CartBadge } from './CartBadge';
import { CartContent } from './CartContent';
import { CartErrorBoundary } from './CartErrorBoundary';

interface CartPopoverProps {
  onCheckout?: () => void;
}

export function CartPopover({ onCheckout }: CartPopoverProps) {
  const popoverRef = useRef<HTMLDialogElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const totalQuantity = useCartStore(selectTotalQuantity);

  // Close popover when route changes
  useEffect(() => {
    popoverRef.current?.hidePopover();
  }, [pathname]);

  // Track popover open/close state via toggle event
  useEffect(() => {
    const popover = popoverRef.current;
    if (!popover) return;

    const handleToggle = (event: Event) => {
      const newState = (event as ToggleEvent).newState;
      setIsOpen(newState === 'open');
    };

    popover.addEventListener('toggle', handleToggle);
    return () => {
      popover.removeEventListener('toggle', handleToggle);
    };
  }, []);

  useFocusTrap(contentRef, isOpen);

  const closePopover = () => {
    popoverRef.current?.hidePopover();
  };

  const handleCheckoutClick = () => {
    closePopover();
    onCheckout?.();
  };

  return (
    <>
      <button
        type='button'
        popoverTarget='cart-popover'
        className='relative flex cursor-pointer items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange'
        aria-label={`${isOpen ? 'Close' : 'Open'} cart, ${
          totalQuantity === 1 ? '1 item' : `${totalQuantity} items`
        } in cart`}
        aria-expanded={isOpen}
        aria-controls='cart-popover'
      >
        <Image
          src='/assets/shared/desktop/icon-cart.svg'
          alt=''
          width={23}
          height={20}
          aria-hidden='true'
        />
        <CartBadge />
      </button>

      <dialog
        ref={popoverRef}
        id='cart-popover'
        popover='auto'
        aria-label='Shopping cart'
        className='m-0 border-none bg-transparent p-0'
      >
        <div className='cart-popover-content pointer-events-none fixed top-[calc(var(--header-height)+24px)] right-0 left-0'>
          <div className='page-container flex justify-center md:justify-end'>
            <div ref={contentRef} className='pointer-events-auto'>
              <CartErrorBoundary>
                <CartContent onCheckoutClick={handleCheckoutClick} />
              </CartErrorBoundary>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
