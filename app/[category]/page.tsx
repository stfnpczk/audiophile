import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { CategoryHeader } from '@/app/components/category/CategoryHeader';
import { ProductListing } from '@/app/components/category/ProductListing';
import { ProductCategories } from '@/app/shared/ProductCategories';
import { AudioGearInfo } from '@/app/components/home/AudioGearInfo';
import {
  getProductsByCategory,
  getAllCategoryParams,
  isValidCategory,
} from '@/app/utils/products';

export async function generateStaticParams() {
  return getAllCategoryParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  if (!isValidCategory(category)) return {};

  const title = category.charAt(0).toUpperCase() + category.slice(1);
  return {
    title,
    description: `Browse our range of ${category} and find your perfect audio gear.`,
  };
}

async function CategoryContent({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  // Validate category
  if (!isValidCategory(category)) {
    notFound();
  }

  // Fetch products for this category
  const products = getProductsByCategory(category);

  return (
    <>
      <CategoryHeader category={category} />
      <div className='page-container pt-16 pb-30 lg:pt-40'>
        <ProductListing products={products} />
      </div>
    </>
  );
}

export default function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  return (
    <>
      <Suspense fallback={<div className='min-h-screen' />}>
        <CategoryContent params={params} />
      </Suspense>
      <div className='page-container'>
        <ProductCategories />
        <AudioGearInfo />
      </div>
    </>
  );
}
