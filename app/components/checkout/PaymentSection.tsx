'use client';

import Image from 'next/image';
import { useFormContext } from 'react-hook-form';
import { TextInput } from '@/app/shared/TextInput';
import { RadioInput } from '@/app/shared/RadioInput';
import type { CheckoutFormValues } from '@/app/utils/checkoutSchema';

export function PaymentSection() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<CheckoutFormValues>();

  const paymentMethod = watch('paymentMethod');
  const isEMoney = paymentMethod === 'e-money';

  return (
    <fieldset className='flex flex-col gap-6'>
      <legend className='mb-6 text-[13px] font-bold tracking-[0.93px] text-orange uppercase'>
        Payment Details
      </legend>

      <div className='grid gap-4 md:grid-cols-2'>
        <span
          id='payment-method-label'
          className='text-xs font-bold text-black'
        >
          Payment Method
        </span>

        <div
          role='radiogroup'
          aria-labelledby='payment-method-label'
          className='flex flex-col gap-4'
        >
          <RadioInput
            label='e-Money'
            value='e-money'
            {...register('paymentMethod')}
          />
          <RadioInput
            label='Cash on Delivery'
            value='cash-on-delivery'
            {...register('paymentMethod')}
          />
        </div>
      </div>

      {isEMoney && (
        <div className='grid gap-x-4 gap-y-6 md:grid-cols-2'>
          <TextInput
            label='e-Money Number'
            placeholder='238521993'
            inputMode='numeric'
            autoComplete='off'
            error={errors.payment?.eMoneyNumber?.message}
            {...register('payment.eMoneyNumber')}
          />
          <TextInput
            label='e-Money PIN'
            placeholder='6891'
            inputMode='numeric'
            autoComplete='off'
            error={errors.payment?.eMoneyPin?.message}
            {...register('payment.eMoneyPin')}
          />
        </div>
      )}

      {!isEMoney && (
        <div className='flex items-center gap-8'>
          <Image
            src='/assets/checkout/icon-cash-on-delivery.svg'
            alt=''
            width={48}
            height={48}
            className='shrink-0'
          />
          <p className='text-[15px]/6.25 text-black/50'>
            The &apos;Cash on Delivery&apos; option enables you to pay in cash
            when our delivery courier arrives at your residence. Just make sure
            your address is correct so that your order will not be cancelled.
          </p>
        </div>
      )}
    </fieldset>
  );
}
