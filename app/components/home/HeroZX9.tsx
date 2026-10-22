import { getImageProps } from 'next/image';
import { Button } from '@/app/shared/Button';
import { PatternCircles } from './PatternCircles';

import mobileZX9Hero from '@/public/assets/home/mobile/image-speaker-zx9.png';
import tabletZX9Hero from '@/public/assets/home/tablet/image-speaker-zx9.png';
import desktopZX9Hero from '@/public/assets/home/desktop/image-speaker-zx9.png';

const SIZES = '(min-width: 1024px) 356px, (min-width: 768px) 224px, 176px';

export function HeroZX9() {
  const common = { alt: '', fill: true as const, sizes: SIZES };

  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({ ...common, src: desktopZX9Hero });
  const {
    props: { srcSet: tabletSrcSet },
  } = getImageProps({ ...common, src: tabletZX9Hero });
  const { props: mobileProps } = getImageProps({
    ...common,
    src: mobileZX9Hero,
  });

  return (
    <div className='relative mt-28 flex flex-col items-center overflow-hidden rounded-md bg-orange py-14 md:h-180 lg:h-140 lg:flex-row lg:gap-[clamp(10rem,15vw,13.5rem)] lg:py-0'>
      <div className='relative z-10 flex justify-center lg:self-end'>
        <div className='absolute top-1/2 left-1/2 -translate-1/2 scale-60 md:scale-100 lg:translate-x-[-38%] lg:translate-y-[-32%] lg:scale-110'>
          <PatternCircles />
        </div>

        <div className='relative h-52 w-44 md:h-60 md:w-56 lg:aspect-5/6 lg:h-auto lg:w-89'>
          <picture>
            <source
              media='(min-width: 1024px)'
              srcSet={desktopSrcSet}
              sizes={SIZES}
            />
            <source
              media='(min-width: 768px)'
              srcSet={tabletSrcSet}
              sizes={SIZES}
            />
            <img
              {...mobileProps}
              alt=''
              className='object-contain lg:translate-x-30 lg:translate-y-4'
            />
          </picture>
        </div>
      </div>

      <div className='relative z-20 mt-8 flex flex-col items-center md:mt-16 lg:items-start'>
        <h2 className='text-center text-4xl/10 font-bold tracking-[1.29px] text-white uppercase md:text-[56px]/14 lg:text-left'>
          ZX9 <br />
          Speaker
        </h2>
        <p className='p-6 text-center text-sm/6 text-white opacity-75 md:max-w-102.5 md:text-[15px]/6.25 lg:max-w-87.5 lg:px-0 lg:text-left'>
          Upgrade to premium speakers that are phenomenally built to deliver
          truly remarkable sound.
        </p>
        <Button href='/speakers/zx9-speaker' variant='secondary'>
          See Product
        </Button>
      </div>
    </div>
  );
}
