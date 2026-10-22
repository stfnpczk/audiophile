import { Metadata } from 'next';
import { CheckoutForm } from '@/app/components/checkout/CheckoutForm';
import { GoBack } from '@/app/shared/GoBack';

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Complete your purchase',
};

export default function CheckoutPage() {
  return (
    <div className='min-h-screen bg-lightGray'>
      <div className='page-container pt-4 pb-24 md:pt-8 lg:pt-20'>
        <GoBack />
        <div className='mt-6 md:mt-8'>
          <CheckoutForm />
        </div>
      </div>
    </div>
  );
}
