'use client';

import { useRouter } from 'next/navigation';
import { INTERNAL_NAV_KEY } from '@/app/shared/NavigationTracker';
import { safeStorage } from '@/app/utils/safeStorage';

interface GoBackProps {
  fallback?: string;
}

export function GoBack({ fallback = '/' }: GoBackProps) {
  const router = useRouter();

  const handleClick = () => {
    if (safeStorage.get(INTERNAL_NAV_KEY, 'session')) {
      router.back();
    } else {
      router.push(fallback);
    }
  };

  return (
    <button
      type='button'
      className='cursor-pointer border border-transparent pt-5 pb-7 text-[15px] text-black/50 transition-colors duration-300 hover:text-black/75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange md:pt-9'
      onClick={handleClick}
      aria-label='Go back to the previous page'
    >
      Go Back
    </button>
  );
}
