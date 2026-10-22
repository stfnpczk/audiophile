import { getImageProps } from 'next/image';
import { ResponsiveImage } from '@/app/types/product';

interface ProductImageProps {
  images: ResponsiveImage;
  alt: string;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  className?: string;
  sizes?: string;
}

export function ProductImage({
  images,
  alt,
  priority = false,
  loading,
  className = 'aspect-327/352 md:aspect-689/352 lg:aspect-540/560',
  sizes = '(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 50vw',
}: ProductImageProps) {
  const common = {
    alt,
    fill: true as const,
    sizes,
    priority,
    loading,
    fetchPriority: priority ? ('high' as const) : undefined,
  };

  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({ ...common, src: images.desktop });
  const {
    props: { srcSet: tabletSrcSet },
  } = getImageProps({ ...common, src: images.tablet });
  const { props: mobileProps } = getImageProps({
    ...common,
    src: images.mobile,
  });

  return (
    <div className={`relative w-full overflow-hidden rounded-lg ${className}`}>
      <picture>
        <source
          media='(min-width: 1024px)'
          srcSet={desktopSrcSet}
          sizes={sizes}
        />
        <source
          media='(min-width: 768px)'
          srcSet={tabletSrcSet}
          sizes={sizes}
        />
        <img
          {...mobileProps}
          alt={alt}
          className='object-cover object-center'
        />
      </picture>
    </div>
  );
}
