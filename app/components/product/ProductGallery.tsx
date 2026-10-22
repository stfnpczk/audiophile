import { ProductGallery as ProductGalleryType } from '@/app/types/product';
import { ProductImage } from '@/app/shared/ProductImage';

interface ProductGalleryProps {
  gallery: ProductGalleryType;
  productName: string;
}

export function ProductGallery({ gallery, productName }: ProductGalleryProps) {
  return (
    <section
      aria-labelledby='gallery-heading'
      className='grid grid-cols-1 gap-5 md:grid-cols-[0.411fr_0.589fr] md:grid-rows-[1fr_1fr] md:gap-x-4.5 md:gap-y-5 lg:gap-x-7.5 lg:gap-y-8'
    >
      {/* Visually hidden heading for screen readers */}
      <h2 id='gallery-heading' className='sr-only'>
        {productName} Gallery
      </h2>

      {/* First Image - Top Left */}
      <div className='md:h-full md:[grid-area:1/1/2/2]'>
        <ProductImage
          images={gallery.first}
          alt={`${productName} detail view 1`}
          loading='lazy'
          className='aspect-327/174 md:aspect-445/280 md:h-full'
        />
      </div>

      {/* Second Image - Bottom Left */}
      <div className='md:h-full md:[grid-area:2/1/3/2]'>
        <ProductImage
          images={gallery.second}
          alt={`${productName} detail view 2`}
          loading='lazy'
          className='aspect-327/174 md:aspect-445/280 md:h-full'
        />
      </div>

      {/* Third Image - Right Side (spans both rows) */}
      <div className='md:h-full md:[grid-area:1/2/3/3]'>
        <ProductImage
          images={gallery.third}
          alt={`${productName} detail view 3`}
          loading='lazy'
          className='aspect-327/368 md:aspect-635/592 md:h-full'
        />
      </div>
    </section>
  );
}
