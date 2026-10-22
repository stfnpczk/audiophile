'use client';

import { useFormContext } from 'react-hook-form';
import { TextInput } from '@/app/shared/TextInput';
import type { CheckoutFormValues } from '@/app/utils/checkoutSchema';

export function BillingSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CheckoutFormValues>();

  return (
    <fieldset>
      <legend className='mb-6 text-[13px] font-bold tracking-[0.93px] text-orange uppercase'>
        Billing Details
      </legend>
      <div className='grid gap-4 md:grid-cols-2'>
        <TextInput
          label='Name'
          placeholder='Alexei Ward'
          autoComplete='name'
          error={errors.billing?.name?.message}
          {...register('billing.name')}
        />
        <TextInput
          label='Email Address'
          type='email'
          placeholder='alexei@mail.com'
          autoComplete='email'
          error={errors.billing?.email?.message}
          {...register('billing.email')}
        />
        <TextInput
          label='Phone Number'
          type='tel'
          placeholder='+1 202-555-0136'
          autoComplete='tel'
          error={errors.billing?.phone?.message}
          {...register('billing.phone')}
        />
      </div>
    </fieldset>
  );
}
