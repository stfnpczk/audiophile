import { ProductCategory } from '@/app/types/product';

export function CategoryHeader({ category }: { category: ProductCategory }) {
  return (
    <div className='bg-charcoalBlack py-8 text-white lg:py-25'>
      <h1 className='text-center text-3xl font-bold tracking-[2px] uppercase lg:text-[40px]'>
        {category}
      </h1>
    </div>
  );
}
