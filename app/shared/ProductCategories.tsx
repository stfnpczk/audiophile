import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import arrow from '@/public/assets/shared/desktop/icon-arrow-right.svg';
import headphones from '@/public/assets/shared/desktop/image-category-thumbnail-headphones.png';
import speakers from '@/public/assets/shared/desktop/image-category-thumbnail-speakers.png';
import earphones from '@/public/assets/shared/desktop/image-category-thumbnail-earphones.png';
import type { ProductCategory } from '@/app/types/product';
import { CATEGORY_LINKS } from '@/app/utils/navigation';

interface ProductCategoriesProps {
  className?: string;
  onLinkClick?: () => void;
}

const CATEGORY_IMAGES: Record<
  ProductCategory,
  {
    image: StaticImageData;
    width: number;
    height: number;
    lgImageClassName: string;
  }
> = {
  headphones: {
    image: headphones,
    width: 128.8,
    height: 124.2,
    lgImageClassName: 'lg:h-[145.3px] lg:w-[150.9px]',
  },
  speakers: {
    image: speakers,
    width: 128.8,
    height: 120.1,
    lgImageClassName: 'lg:h-[140.6px] lg:w-[150.9px]',
  },
  earphones: {
    image: earphones,
    width: 128.8,
    height: 119.8,
    lgImageClassName: 'lg:h-[140.3px] lg:w-[150.9px]',
  },
};

const CATEGORIES = CATEGORY_LINKS.map(({ category, label, href }) => ({
  name: label,
  href,
  ...CATEGORY_IMAGES[category],
}));

export function ProductCategories({
  className = 'mt-24 lg:mt-50',
  onLinkClick,
}: ProductCategoriesProps) {
  return (
    <ul
      className={`flex flex-col gap-16 md:flex-row md:gap-3 xl:gap-7.5 ${className}`}
    >
      {CATEGORIES.map(
        ({ name, href, image, width, height, lgImageClassName }) => (
          <li
            key={href}
            className='relative flex aspect-327/165 w-full flex-col items-center justify-end rounded-lg bg-lightGray pb-6 md:aspect-223/165 lg:aspect-350/204'
          >
            <Image
              src={image}
              alt=''
              width={width}
              height={height}
              className={`absolute -top-11.25 object-contain ${lgImageClassName}`}
            />
            <Link
              className='group flex flex-col items-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange'
              href={href}
              onClick={onLinkClick}
            >
              <span className='text-[15px] font-bold tracking-[1.07px] uppercase lg:text-[18px]'>
                {name}
              </span>
              <div className='mt-4 flex items-center gap-4'>
                <span className='text-[13px] font-medium tracking-[1px] uppercase transition-colors duration-300 can-hover:group-hover:text-orange'>
                  Shop
                </span>
                <Image
                  src={arrow}
                  alt=''
                  aria-hidden='true'
                  width={8}
                  height={12}
                  className='motion-reduce:animate-none can-hover:group-hover:animate-[arrow-bounce_0.8s_ease-in-out_2.5_forwards]'
                />
              </div>
            </Link>
          </li>
        ),
      )}
    </ul>
  );
}
