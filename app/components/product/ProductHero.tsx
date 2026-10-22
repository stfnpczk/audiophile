import { Product } from '@/app/types/product';
import { ProductImage } from '@/app/shared/ProductImage';
import { ProductContent } from '@/app/shared/ProductContent';
import { AddToCartButton } from '@/app/shared/AddToCartButton';
import { formatPrice } from '@/app/utils/formatPrice';

export function ProductHero({ product }: { product: Product }) {
  return (
    <div className='md:flex md:items-center md:gap-17'>
      <div className='md:w-1/2'>
        <ProductImage
          images={product.image}
          alt={product.name}
          priority
          className='aspect-square md:aspect-281/480 lg:aspect-540/560'
        />
      </div>
      <div className='mt-8 md:mt-0 md:w-1/2'>
        <ProductContent
          name={product.name}
          category={product.category}
          description={product.description}
          isNew={product.new}
          alignment='left'
          as='h1'
        />

        <div className='mb-8 text-xl font-bold tracking-[1.29px] text-black'>
          {formatPrice(product.price)}
        </div>

        <AddToCartButton product={product} />
      </div>
    </div>
  );
}
