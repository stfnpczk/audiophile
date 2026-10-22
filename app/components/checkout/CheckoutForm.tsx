'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useCartStore,
  useCartHydrated,
  selectIsEmpty,
  selectSubtotal,
} from '@/app/store/cartStore';
import {
  checkoutFormSchema,
  type CheckoutFormValues,
} from '@/app/utils/checkoutSchema';
import { getOrderTotals } from '@/app/utils/orderTotals';
import { Button } from '@/app/shared/Button';
import { BillingSection } from './BillingSection';
import { ShippingSection } from './ShippingSection';
import { PaymentSection } from './PaymentSection';
import { OrderSummary } from './OrderSummary';
import { ConfirmationModal } from './ConfirmationModal';
import type { CartItem } from '@/app/store/cartSchema';

interface OrderData {
  items: CartItem[];
  grandTotal: number;
}

export function CheckoutForm() {
  const router = useRouter();
  const isHydrated = useCartHydrated();
  const isEmpty = useCartStore(selectIsEmpty);
  const clearCart = useCartStore((state) => state.clearCart);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  const handleConfirmationDismiss = useCallback(
    () => router.push('/'),
    [router],
  );

  const methods = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    mode: 'onBlur',
    defaultValues: {
      billing: { name: '', email: '', phone: '' },
      shipping: { address: '', zipCode: '', city: '', country: '' },
      paymentMethod: 'e-money',
      payment: { eMoneyNumber: '', eMoneyPin: '' },
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const state = useCartStore.getState();

    if (state.items.length === 0) return;

    setOrderData({
      items: [...state.items],
      grandTotal: getOrderTotals(selectSubtotal(state)).grandTotal,
    });

    // Clear cart and show confirmation
    clearCart();
    setShowConfirmation(true);
  };

  // Show loading state while cart hydrates from localStorage
  if (!isHydrated) {
    return (
      <div className='grid gap-8 lg:grid-cols-[1fr_350px]'>
        {/* Form skeleton */}
        <div className='flex flex-col gap-8 rounded-lg bg-white p-6 md:gap-14 md:p-8 lg:p-12'>
          {/* Title */}
          <div className='h-8 w-40 animate-pulse rounded bg-lightGray' />

          {/* Billing section */}
          <div className='flex flex-col gap-4'>
            <div className='h-4 w-32 animate-pulse rounded bg-orange/30' />
            <div className='grid gap-4 md:grid-cols-2'>
              <div className='h-14 animate-pulse rounded bg-lightGray' />
              <div className='h-14 animate-pulse rounded bg-lightGray' />
              <div className='h-14 animate-pulse rounded bg-lightGray' />
            </div>
          </div>

          {/* Shipping section */}
          <div className='flex flex-col gap-4'>
            <div className='h-4 w-36 animate-pulse rounded bg-orange/30' />
            <div className='grid gap-4 md:grid-cols-2'>
              <div className='col-span-full h-14 animate-pulse rounded bg-lightGray' />
              <div className='h-14 animate-pulse rounded bg-lightGray' />
              <div className='h-14 animate-pulse rounded bg-lightGray' />
              <div className='h-14 animate-pulse rounded bg-lightGray' />
            </div>
          </div>

          {/* Payment section */}
          <div className='flex flex-col gap-4'>
            <div className='h-4 w-40 animate-pulse rounded bg-orange/30' />
            <div className='grid gap-4 md:grid-cols-2'>
              <div className='h-14 animate-pulse rounded bg-lightGray' />
              <div className='flex flex-col gap-4'>
                <div className='h-14 animate-pulse rounded bg-lightGray' />
                <div className='h-14 animate-pulse rounded bg-lightGray' />
              </div>
            </div>
          </div>
        </div>

        {/* Summary skeleton */}
        <div className='flex h-fit flex-col gap-8 rounded-lg bg-white p-6 md:p-8'>
          <div className='h-6 w-24 animate-pulse rounded bg-lightGray' />

          {/* Cart items */}
          <div className='flex flex-col gap-6'>
            {[1, 2].map((i) => (
              <div key={i} className='flex items-center gap-4'>
                <div className='size-16 animate-pulse rounded-lg bg-lightGray' />
                <div className='flex flex-1 flex-col gap-2'>
                  <div className='h-4 w-20 animate-pulse rounded bg-lightGray' />
                  <div className='h-3 w-16 animate-pulse rounded bg-lightGray' />
                </div>
                <div className='h-4 w-6 animate-pulse rounded bg-lightGray' />
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className='flex flex-col gap-2'>
            {[1, 2, 3].map((i) => (
              <div key={i} className='flex items-center justify-between'>
                <div className='h-4 w-20 animate-pulse rounded bg-lightGray' />
                <div className='h-5 w-24 animate-pulse rounded bg-lightGray' />
              </div>
            ))}
            <div className='mt-4 flex items-center justify-between'>
              <div className='h-4 w-24 animate-pulse rounded bg-lightGray' />
              <div className='h-5 w-28 animate-pulse rounded bg-orange/30' />
            </div>
          </div>

          {/* Button */}
          <div className='h-12 animate-pulse rounded bg-lightGray' />
        </div>
      </div>
    );
  }

  // Show empty cart state if cart is empty (and not showing confirmation)
  if (isEmpty && !showConfirmation) {
    return (
      <div className='flex flex-col items-center justify-center gap-6 rounded-lg bg-white p-12 text-center'>
        <h1 className='text-[28px] font-bold tracking-[1px] uppercase md:text-[32px]'>
          Your cart is empty
        </h1>
        <p className='text-[15px] text-black/50'>
          Add some products to your cart before checking out.
        </p>
        <Button href='/' className='mt-2'>
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='grid gap-8 lg:grid-cols-[1fr_350px]'
        >
          <div className='flex flex-col gap-8 rounded-lg bg-white p-6 md:gap-14 md:p-8 lg:p-12'>
            <h1 className='text-[28px] font-bold tracking-[1px] uppercase md:text-[32px] md:tracking-[1.14px]'>
              Checkout
            </h1>
            <BillingSection />
            <ShippingSection />
            <PaymentSection />
          </div>
          <OrderSummary isSubmitting={isSubmitting} />
        </form>
      </FormProvider>

      {orderData && (
        <ConfirmationModal
          isOpen={showConfirmation}
          items={orderData.items}
          grandTotal={orderData.grandTotal}
          onDismiss={handleConfirmationDismiss}
        />
      )}
    </>
  );
}
