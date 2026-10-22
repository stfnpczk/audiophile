import { getImageProps } from 'next/image';
import { Button } from '@/app/shared/Button';

import mobileZX7Hero from '@/public/assets/home/mobile/image-speaker-zx7.jpg';
import tabletZX7Hero from '@/public/assets/home/tablet/image-speaker-zx7.jpg';
import desktopZX7Hero from '@/public/assets/home/desktop/image-speaker-zx7.jpg';

export function HeroZX7() {
  const common = { alt: '', fill: true as const, sizes: '100vw' };

  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({ ...common, src: desktopZX7Hero });
  const {
    props: { srcSet: tabletSrcSet },
  } = getImageProps({ ...common, src: tabletZX7Hero });
  const { props: mobileProps } = getImageProps({
    ...common,
    src: mobileZX7Hero,
  });

  return (
    <div className='relative my-6 w-full lg:my-12'>
      <div className='relative aspect-375/320 w-full overflow-hidden rounded-md md:aspect-689/320 lg:aspect-1110/320'>
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
          <img {...mobileProps} alt='' className='object-cover object-center' />
        </picture>

        {/* Content overlay */}
        <div className='absolute inset-0 z-10 flex items-center px-8 md:px-16 lg:px-25'>
          <div className='max-w-md text-left'>
            <h2 className='mb-6 text-[28px]/12 font-bold tracking-[1.29px] text-black uppercase'>
              ZX7 Speaker
            </h2>
            <Button href='/speakers/zx7-speaker' variant='outline'>
              See Product
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
