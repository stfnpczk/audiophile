import { RelatedProduct } from '@/app/types/product';
import { Button } from '@/app/shared/Button';
import { ProductImage } from '@/app/shared/ProductImage';
import { getCategoryBySlug } from '@/app/utils/products';

export function ProductRecommendations({
  others,
}: {
  others: RelatedProduct[];
}) {
  if (others.length === 0) {
    return null;
  }
  return (
    <div className='py-24'>
      <h2 className='mb-10 text-center text-2xl font-bold tracking-wider uppercase md:text-3xl'>
        You may also like
      </h2>
      <ul className='flex flex-col gap-14 md:flex-row md:gap-3 xl:gap-7.5'>
        {others.map((other) => {
          const category = getCategoryBySlug(other.slug);
          if (!category) return null;

          return (
            <li key={other.slug} className='flex-1'>
              <ProductImage
                images={other.image}
                alt={other.name}
                sizes='(max-width: 1024px) 90vw, 30vw'
                className='aspect-[2.4] md:aspect-213/318'
              />
              <div className='flex flex-col items-center justify-center'>
                <h3 className='my-8 text-2xl font-bold tracking-[1.71px] uppercase'>
                  {other.name}
                </h3>
                <Button href={`/${category}/${other.slug}`}>See Product</Button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
