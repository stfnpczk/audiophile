import { z } from 'zod';

export const responsiveImageSchema = z.object({
  mobile: z.string(),
  tablet: z.string(),
  desktop: z.string(),
});

export const includedItemSchema = z.object({
  quantity: z.number(),
  item: z.string(),
});

/** Product gallery images */
export const productGallerySchema = z.object({
  first: responsiveImageSchema,
  second: responsiveImageSchema,
  third: responsiveImageSchema,
});

/** Related product reference shown in recommendations */
export const relatedProductSchema = z.object({
  slug: z.string(),
  name: z.string(),
  image: responsiveImageSchema,
});

export const productCategorySchema = z.enum([
  'headphones',
  'speakers',
  'earphones',
]);

export const productSchema = z.object({
  id: z.number(),
  slug: z.string(),
  name: z.string(),
  image: responsiveImageSchema,
  category: productCategorySchema,
  categoryImage: responsiveImageSchema,
  new: z.boolean(),
  price: z.number(),
  description: z.string(),
  features: z.string(),
  includes: z.array(includedItemSchema),
  gallery: productGallerySchema,
  others: z.array(relatedProductSchema),
});

export const productsSchema = z.array(productSchema);

export type ResponsiveImage = z.infer<typeof responsiveImageSchema>;
export type IncludedItem = z.infer<typeof includedItemSchema>;
export type ProductGallery = z.infer<typeof productGallerySchema>;
export type RelatedProduct = z.infer<typeof relatedProductSchema>;
export type ProductCategory = z.infer<typeof productCategorySchema>;
export type Product = z.infer<typeof productSchema>;
