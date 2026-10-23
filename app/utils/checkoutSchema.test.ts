import { describe, expect, it } from 'vitest';
import { checkoutFormSchema, type CheckoutFormValues } from './checkoutSchema';

const validCash: CheckoutFormValues = {
  billing: {
    name: 'Alexei Ward',
    email: 'alexei@mail.com',
    phone: '+1 202-555-0136',
  },
  shipping: {
    address: '1137 Williams Avenue',
    zipCode: '10001',
    city: 'New York',
    country: 'United States',
  },
  paymentMethod: 'cash-on-delivery',
  payment: { eMoneyNumber: '', eMoneyPin: '' },
};

const validEMoney: CheckoutFormValues = {
  ...validCash,
  paymentMethod: 'e-money',
  payment: { eMoneyNumber: '238521993', eMoneyPin: '6891' },
};

function errorPaths(values: unknown) {
  const result = checkoutFormSchema.safeParse(values);
  return result.success ? [] : result.error.issues.map((i) => i.path.join('.'));
}

describe('checkoutFormSchema', () => {
  it('accepts a valid cash on delivery order', () => {
    expect(errorPaths(validCash)).toEqual([]);
  });

  it('accepts a valid e-Money order', () => {
    expect(errorPaths(validEMoney)).toEqual([]);
  });

  it('rejects a badly formatted email', () => {
    expect(
      errorPaths({
        ...validCash,
        billing: { ...validCash.billing, email: 'alexei@' },
      }),
    ).toEqual(['billing.email']);
  });

  it('reports every missing field', () => {
    const empty = {
      billing: { name: '', email: '', phone: '' },
      shipping: { address: '', zipCode: '', city: '', country: '' },
      paymentMethod: 'e-money',
      payment: { eMoneyNumber: '', eMoneyPin: '' },
    };
    expect(errorPaths(empty)).toEqual(
      expect.arrayContaining([
        'billing.name',
        'billing.email',
        'billing.phone',
        'shipping.address',
        'shipping.zipCode',
        'shipping.city',
        'shipping.country',
        'payment.eMoneyNumber',
        'payment.eMoneyPin',
      ]),
    );
  });

  it('requires a 9-digit e-Money number and 4-digit PIN', () => {
    expect(
      errorPaths({
        ...validEMoney,
        payment: { eMoneyNumber: '12345', eMoneyPin: '12a4' },
      }),
    ).toEqual(['payment.eMoneyNumber', 'payment.eMoneyPin']);
  });

  it('ignores e-Money fields for cash on delivery', () => {
    expect(
      errorPaths({
        ...validCash,
        payment: { eMoneyNumber: 'abc', eMoneyPin: 'x' },
      }),
    ).toEqual([]);
  });
});
