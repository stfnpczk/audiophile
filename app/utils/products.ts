import productsData from '@/app/data/data.json';
import {
  Product,
  ProductCategory,
  productsSchema,
  productCategorySchema,
} from '@/app/types/product';

const products: Product[] = productsSchema.parse(productsData);

export const VALID_CATEGORIES = productCategorySchema.options;

export function isValidCategory(category: string): category is ProductCategory {
  return (VALID_CATEGORIES as readonly string[]).includes(category);
}

/**
 * Get a single product by slug
 */
export function getProductBySlug(slug: string): Product | null {
  return products.find((p) => p.slug === slug) ?? null;
}

/**
 * Get products by category (empty array if invalid category)
 */
export function getProductsByCategory(category: string): Product[] {
  if (!isValidCategory(category)) {
    return [];
  }
  return products.filter((p) => p.category === category);
}

/**
 * Generate static params for all valid categories (generateStaticParams)
 */
export function getAllCategoryParams(): { category: string }[] {
  return VALID_CATEGORIES.map((category) => ({ category }));
}

/**
 * Get product category by slug
 */
export function getCategoryBySlug(slug: string): ProductCategory | null {
  return products.find((p) => p.slug === slug)?.category ?? null;
}

/**
 * Generate static params for all products (generateStaticParams)
 */
export function getAllProductParams(): { category: string; slug: string }[] {
  return products.map((p) => ({
    category: p.category,
    slug: p.slug,
  }));
}
