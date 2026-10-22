import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';
import { Header } from './shared/Header';
import { Footer } from './shared/Footer';
import { CartHydration } from './shared/cart/CartHydration';
import { NavigationTracker } from './shared/NavigationTracker';

const manrope = Manrope({
  variable: '--font-manrope',
  weight: ['400', '500', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Audiophile e-commerce website',
    template: '%s | Audiophile',
  },
  description:
    'This is a solution to the Audiophile e-commerce web app challenge on Frontend Mentor. Frontend Mentor challenges help you improve your coding skills by building realistic projects.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={manrope.variable}>
      <body className='overflow-x-hidden antialiased'>
        <CartHydration />
        <NavigationTracker />
        <Header />
        <main>{children}</main>
        <Footer />
        <Toaster position='bottom-center' className='font-sans' />
      </body>
    </html>
  );
}
