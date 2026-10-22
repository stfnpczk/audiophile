import { z } from 'zod';

const billingSchema = z.object({
  name: z.string().min(2, 'Name is required').max(50, 'Name is too long'),
  email: z.string().min(1, 'Email is required').email('Wrong format'),
  phone: z
    .string()
    .min(1, 'Phone is required')
    .regex(/^\+?[\d\s\-()]{7,}$/, 'Wrong format'),
});

const shippingSchema = z.object({
  address: z
    .string()
    .min(5, 'Address is required')
    .max(100, 'Address is too long'),
  zipCode: z
    .string()
    .min(1, 'ZIP Code is required')
    .regex(/^[\dA-Za-z\s\-]{3,10}$/, 'Wrong format'),
  city: z.string().min(2, 'City is required').max(50, 'City is too long'),
  country: z
    .string()
    .min(2, 'Country is required')
    .max(50, 'Country is too long'),
});

const paymentMethodSchema = z.enum(['e-money', 'cash-on-delivery']);

const paymentSchema = z.object({
  eMoneyNumber: z.string(),
  eMoneyPin: z.string(),
});

export const checkoutFormSchema = z
  .object({
    billing: billingSchema,
    shipping: shippingSchema,
    paymentMethod: paymentMethodSchema,
    payment: paymentSchema,
  })
  .superRefine((data, ctx) => {
    if (data.paymentMethod === 'e-money') {
      // Validate eMoneyNumber
      if (!data.payment.eMoneyNumber) {
        ctx.addIssue({
          code: 'custom',
          path: ['payment', 'eMoneyNumber'],
          message: 'e-Money Number is required',
        });
      } else if (!/^\d{9}$/.test(data.payment.eMoneyNumber)) {
        ctx.addIssue({
          code: 'custom',
          path: ['payment', 'eMoneyNumber'],
          message: 'Must be 9 digits',
        });
      }

      // Validate eMoneyPin
      if (!data.payment.eMoneyPin) {
        ctx.addIssue({
          code: 'custom',
          path: ['payment', 'eMoneyPin'],
          message: 'e-Money PIN is required',
        });
      } else if (!/^\d{4}$/.test(data.payment.eMoneyPin)) {
        ctx.addIssue({
          code: 'custom',
          path: ['payment', 'eMoneyPin'],
          message: 'Must be 4 digits',
        });
      }
    }
  });

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;
