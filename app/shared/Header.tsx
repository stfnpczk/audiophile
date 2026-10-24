'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { CartPopover } from './cart/CartPopover';
import { ProductCategories } from './ProductCategories';
import { NAV_LINKS, isActiveLink } from '@/app/utils/navigation';
import { useFocusTrap } from '../hooks/useFocusTrap';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsMenuOpen(false);
  }

  // Close menu on Escape
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  useFocusTrap(headerRef, isMenuOpen, menuRef);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      ref={headerRef}
      className='sticky top-0 z-50 bg-charcoalBlack'
      data-menu-open={isMenuOpen ? 'true' : undefined}
    >
      <div className='page-container flex items-center justify-between py-8'>
        <div className='flex items-center gap-20'>
          <button
            type='button'
            className='cursor-pointer lg:hidden'
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls='mobile-menu'
            onClick={toggleMenu}
          >
            <Image
              src='/assets/shared/tablet/icon-hamburger.svg'
              alt=''
              width={16}
              height={15}
              aria-hidden='true'
            />
          </button>
          <Link href='/'>
            <Image
              src='/assets/shared/desktop/logo.svg'
              alt='Audiophile home'
              width={143}
              height={25}
              priority
            />
          </Link>
        </div>

        <nav className='hidden lg:block' aria-label='Header navigation'>
          <ul className='flex items-center gap-8'>
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  className={`font-bold tracking-[2px] uppercase transition-colors can-hover:hover:text-lightOrange ${
                    isActiveLink(href, pathname) ? 'text-orange' : 'text-white'
                  }`}
                  href={href}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <CartPopover onCheckout={closeMenu} />
      </div>

      {/* Mobile Menu Dialog */}
      <div
        className={`mobile-menu-backdrop ${isMenuOpen ? 'open' : ''}`}
        onClick={closeMenu}
        aria-hidden='true'
      />

      <div
        id='mobile-menu'
        ref={menuRef}
        className={`absolute top-full right-0 left-0 z-50 mx-auto grid max-w-128.75 overflow-hidden transition-[grid-template-rows] duration-500 ease-in-out md:mx-0 md:max-w-none lg:hidden ${
          isMenuOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
        inert={!isMenuOpen}
      >
        <div className='min-h-0'>
          <nav
            className={`max-h-[calc(100dvh-var(--header-height))] touch-pan-y overflow-y-auto overscroll-contain rounded-b-lg bg-white px-6 pt-21 pb-9 transition-transform duration-500 ease-in-out ${
              isMenuOpen ? 'translate-y-0' : '-translate-y-full'
            }`}
            aria-label='Mobile navigation'
          >
            <ProductCategories className='mt-0' onLinkClick={closeMenu} />
          </nav>
        </div>
      </div>
    </header>
  );
}
