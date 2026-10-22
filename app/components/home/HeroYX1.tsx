import { Button } from '@/app/shared/Button';
import { ProductImage } from '@/app/shared/ProductImage';

const YX1_IMAGES = {
  mobile: '/assets/home/mobile/image-earphones-yx1.jpg',
  tablet: '/assets/home/tablet/image-earphones-yx1.jpg',
  desktop: '/assets/home/desktop/image-earphones-yx1.jpg',
};

export function HeroYX1() {
  return (
    <div className='md:flex md:gap-2.75 lg:gap-6'>
      <ProductImage
        images={YX1_IMAGES}
        alt='YX1 wireless earphones in charging case'
        className='mb-6 aspect-327/200 rounded-md md:mb-0 md:aspect-339/320 md:w-1/2 lg:aspect-540/320'
        sizes='(max-width: 767px) 100vw, 50vw'
      />

      <div className='rounded-md bg-lightGray p-6 md:flex md:aspect-339/320 md:w-1/2 md:flex-col md:justify-center md:px-14 lg:aspect-540/320 lg:px-25'>
        <h2 className='mb-6 text-[28px]/12 font-bold text-black uppercase'>
          YX1 Earphones
        </h2>
        <Button
          href='/earphones/yx1-earphones'
          variant='outline'
          className='lg:max-w-75'
        >
          See Product
        </Button>
      </div>
    </div>
  );
}
