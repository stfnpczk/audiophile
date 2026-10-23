import { describe, expect, it } from 'vitest';
import { getOrderTotals } from './orderTotals';

describe('getOrderTotals', () => {
  it('adds flat shipping to the subtotal', () => {
    const totals = getOrderTotals(5396);
    expect(totals.subtotal).toBe(5396);
    expect(totals.shipping).toBe(50);
    expect(totals.grandTotal).toBe(5446);
  });

  it('reports VAT as 20% of the subtotal, rounded', () => {
    expect(getOrderTotals(5396).vat).toBe(1079);
    expect(getOrderTotals(2999).vat).toBe(600);
  });

  it('does not add VAT to the grand total because prices include it', () => {
    const { subtotal, shipping, vat, grandTotal } = getOrderTotals(2999);
    expect(grandTotal).toBe(subtotal + shipping);
    expect(grandTotal).not.toBe(subtotal + shipping + vat);
  });
});
