import { ProductImage } from '@/app/shared/ProductImage';

const BEST_GEAR_IMAGES = {
  mobile: '/assets/shared/mobile/image-best-gear.jpg',
  tablet: '/assets/shared/tablet/image-best-gear.jpg',
  desktop: '/assets/shared/desktop/image-best-gear.jpg',
};

export function AudioGearInfo() {
  return (
    <div className='my-30 lg:my-50 lg:flex lg:flex-row-reverse lg:items-center lg:gap-[clamp(5rem,8vw,7.5rem)]'>
      <ProductImage
        images={BEST_GEAR_IMAGES}
        alt='Man wearing headphones, enjoying music'
        className='aspect-375/300 rounded-md md:aspect-689/300 lg:aspect-540/588 lg:w-1/2'
        sizes='(max-width: 1023px) 100vw, 50vw'
      />
      <div className='md:px-10 lg:w-1/2 lg:px-0'>
        <h2 className='mt-10 text-center text-[28px] font-bold tracking-[1.29px] text-black uppercase md:mt-16 md:text-[40px]/11 md:tracking-[1.43px] lg:mt-0 lg:max-w-110.75 lg:text-left'>
          Bringing you the <span className='text-orange'>best</span> audio gear
        </h2>
        <p className='pt-8 text-center text-[15px]/6.25 text-black opacity-50 lg:max-w-110.75 lg:text-left'>
          Located at the heart of New York City, Audiophile is the premier store
          for high end headphones, earphones, speakers, and audio accessories.
          We have a large showroom and luxury demonstration rooms available for
          you to browse and experience a wide range of our products. Stop by our
          store to meet some of the fantastic people who make Audiophile the
          best place to buy your portable audio equipment.
        </p>
      </div>
    </div>
  );
}
