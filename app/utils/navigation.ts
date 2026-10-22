import {
  productCategorySchema,
  type ProductCategory,
} from '@/app/types/product';

export const CATEGORY_LINKS = productCategorySchema.options.map((category) => ({
  category,
  label: category.charAt(0).toUpperCase() + category.slice(1),
  href: `/${category}`,
})) satisfies { category: ProductCategory; label: string; href: string }[];

/**
 * Site navigation links, shared by Header and Footer.
 */
export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  ...CATEGORY_LINKS.map(({ label, href }) => ({ label, href })),
];

export function isActiveLink(href: string, pathname: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}
