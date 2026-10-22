import { getImageProps } from 'next/image';
import { Button } from '@/app/shared/Button';

import mobileHeaderHero from '@/public/assets/home/mobile/image-header.jpg';
import tabletHeaderHero from '@/public/assets/home/tablet/image-header.jpg';
import desktopHeaderHero from '@/public/assets/home/desktop/image-hero.jpg';

export function HeroXX99() {
  const common = {
    alt: '',
    fill: true as const,
    sizes: '100vw',
    priority: true,

    fetchPriority: 'high' as const,
  };

  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({ ...common, src: desktopHeaderHero });
  const {
    props: { srcSet: tabletSrcSet },
  } = getImageProps({ ...common, src: tabletHeaderHero });
  const { props: mobileProps } = getImageProps({
    ...common,
    src: mobileHeaderHero,
  });

  return (
    <div className='bg-charcoalBlack'>
      <div className='relative mx-auto w-full max-w-360'>
        <div className='relative aspect-375/510 max-h-157.5 w-full md:aspect-768/639 md:max-h-none lg:aspect-1440/632'>
          <picture>
            <source
              media='(min-width: 1024px)'
              srcSet={desktopSrcSet}
              sizes='100vw'
            />
            <source
              media='(min-width: 768px)'
              srcSet={tabletSrcSet}
              sizes='100vw'
            />

            <img
              {...mobileProps}
              alt=''
              className='object-cover object-bottom'
            />
          </picture>
        </div>

        {/* Content Overlay */}
        <div className='page-container absolute inset-0 z-10 flex items-center justify-center py-16 md:py-24 lg:justify-start lg:py-32'>
          <div className='text-center text-white lg:text-left'>
            <p className='text-sm tracking-[10px] uppercase opacity-50'>
              NEW PRODUCT
            </p>
            <h1 className='my-4 text-4xl font-bold md:text-5xl lg:text-[56px]/14.5'>
              XX99 MARK II
              <br />
              HEADPHONES
            </h1>
            <p className='mx-auto mb-8 max-w-md opacity-75 md:max-w-98.75'>
              Experience natural, lifelike audio and exceptional build quality
              made for the passionate music enthusiast.
            </p>
            <Button href='/headphones/xx99-mark-two-headphones'>
              See Product
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
