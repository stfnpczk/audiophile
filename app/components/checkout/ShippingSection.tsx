'use client';

import { useFormContext } from 'react-hook-form';
import { TextInput } from '@/app/shared/TextInput';
import type { CheckoutFormValues } from '@/app/utils/checkoutSchema';

export function ShippingSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CheckoutFormValues>();

  return (
    <fieldset>
      <legend className='mb-6 text-[13px] font-bold tracking-[0.93px] text-orange uppercase'>
        Shipping Info
      </legend>
      <div className='grid gap-x-4 gap-y-6 md:grid-cols-2'>
        <TextInput
          label='Address'
          placeholder='1137 Williams Avenue'
          autoComplete='street-address'
          error={errors.shipping?.address?.message}
          containerClassName='md:col-span-2'
          {...register('shipping.address')}
        />
        <TextInput
          label='ZIP Code'
          placeholder='10001'
          autoComplete='postal-code'
          error={errors.shipping?.zipCode?.message}
          {...register('shipping.zipCode')}
        />
        <TextInput
          label='City'
          placeholder='New York'
          autoComplete='address-level2'
          error={errors.shipping?.city?.message}
          {...register('shipping.city')}
        />
        <TextInput
          label='Country'
          placeholder='United States'
          autoComplete='country-name'
          error={errors.shipping?.country?.message}
          {...register('shipping.country')}
        />
      </div>
    </fieldset>
  );
}
