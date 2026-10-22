import { Product } from '@/app/types';
import { Button } from '@/app/shared/Button';
import { ProductImage } from '@/app/shared/ProductImage';
import { ProductContent } from '@/app/shared/ProductContent';

interface ProductListingProps {
  products: Product[];
}

export function ProductListing({ products }: ProductListingProps) {
  const displayProducts = [...products].sort(
    (a, b) => Number(b.new) - Number(a.new) || b.id - a.id,
  );

  return (
    <ul className='flex flex-col gap-32 lg:gap-40'>
      {displayProducts.map((product, index) => (
        <li
          key={product.id}
          className={`flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-32 ${
            index % 2 === 1 ? 'lg:flex-row-reverse' : ''
          }`}
        >
          <div className='lg:flex-1'>
            <ProductImage
              images={product.categoryImage}
              alt={product.name}
              priority={index === 0}
            />
          </div>

          <div className='lg:flex-1'>
            <ProductContent
              name={product.name}
              category={product.category}
              description={product.description}
              isNew={product.new}
              alignment='center'
            />

            <div className='mt-6 text-center lg:text-left'>
              <Button href={`/${product.category}/${product.slug}`}>
                See Product
              </Button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
