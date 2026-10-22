'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { safeStorage } from '@/app/utils/safeStorage';

const PREV_PATH_KEY = 'audiophile-prev-path';
export const INTERNAL_NAV_KEY = 'audiophile-internal-nav';

export function NavigationTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const previousPath = safeStorage.get(PREV_PATH_KEY, 'session');
    if (previousPath && previousPath !== pathname) {
      safeStorage.set(INTERNAL_NAV_KEY, 'true', 'session');
    }
    safeStorage.set(PREV_PATH_KEY, pathname, 'session');
  }, [pathname]);

  return null;
}
