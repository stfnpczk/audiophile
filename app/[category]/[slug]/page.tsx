import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  getProductBySlug,
  getAllProductParams,
  isValidCategory,
} from '@/app/utils/products';
import { ProductCategories } from '@/app/shared/ProductCategories';
import { AudioGearInfo } from '@/app/components/home/AudioGearInfo';
import { GoBack } from '@/app/shared/GoBack';
import { ProductHero } from '@/app/components/product/ProductHero';
import { Features } from '@/app/components/product/Features';
import { ProductGallery } from '@/app/components/product/ProductGallery';
import { ProductRecommendations } from '@/app/components/product/ProductRecommendations';

export async function generateStaticParams() {
  return getAllProductParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  return {
    title: product.name,
    description: product.description,
  };
}

async function ProductDetails({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;

  // Validate category
  if (!isValidCategory(category)) {
    notFound();
  }

  // Fetch product data
  const product = getProductBySlug(slug);

  // Validate product exists and matches the category route
  if (!product || product.category !== category) {
    notFound();
  }

  return (
    <>
      <GoBack fallback={`/${category}`} />
      <ProductHero product={product} />
      <Features features={product.features} includes={product.includes} />
      <ProductGallery gallery={product.gallery} productName={product.name} />
      <ProductRecommendations others={product.others} />
    </>
  );
}

export default function ProductPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  return (
    <div className='page-container'>
      <Suspense fallback={<div className='min-h-screen' />}>
        <ProductDetails params={params} />
      </Suspense>
      <ProductCategories />
      <AudioGearInfo />
    </div>
  );
}
