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

const CATEGORY_IMAGES: Record<ProductCategory, StaticImageData> = {
  headphones,
  speakers,
  earphones,
};

const CATEGORIES = CATEGORY_LINKS.map(({ category, label, href }) => ({
  name: label,
  href,
  image: CATEGORY_IMAGES[category],
}));

export function ProductCategories({
  className = 'mt-24 lg:mt-50',
  onLinkClick,
}: ProductCategoriesProps) {
  return (
    <ul
      className={`flex flex-col gap-[max(4rem,calc(min(100vw-3rem,515px)*0.137+1.25rem))] md:flex-row md:gap-3 xl:gap-7.5 ${className}`}
    >
      {CATEGORIES.map(({ name, href, image }) => (
        <li
          key={href}
          className='@container relative flex aspect-327/165 w-full flex-col items-center justify-end rounded-lg bg-lightGray pb-6 md:aspect-223/165 lg:aspect-350/204'
        >
          <Image
            src={image}
            alt=''
            sizes='(min-width: 1024px) 180px, (min-width: 768px) 170px, 205px'
            className='absolute top-0 h-auto w-[max(128.8px,39.4cqw)] translate-y-[-36%] object-contain md:w-[max(128.8px,57.8cqw)] lg:w-[max(150.9px,43.1cqw)] lg:translate-y-[-31%]'
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
      ))}
    </ul>
  );
}
