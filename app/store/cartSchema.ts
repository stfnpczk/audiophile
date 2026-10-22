import { z } from 'zod';

export const cartItemSchema = z.object({
  productId: z.number().positive(),
  slug: z.string().min(1),
  name: z.string().min(1),
  shortName: z.string().min(1),
  price: z.number().positive(),
  quantity: z.number().int().positive().max(99),
  image: z.string().min(1),
});

export const cartSchema = z.array(cartItemSchema);

export type CartItem = z.infer<typeof cartItemSchema>;
