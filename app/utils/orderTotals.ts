import { SHIPPING_COST, VAT_RATE } from './constants';

export interface OrderTotals {
  subtotal: number;
  vat: number;
  shipping: number;
  grandTotal: number;
}

export function getOrderTotals(subtotal: number): OrderTotals {
  return {
    subtotal,
    // Product prices already include VAT, so it's shown for information only
    // and not added to the grand total (matches the design's "VAT (INCLUDED)").
    vat: Math.round(subtotal * VAT_RATE),
    shipping: SHIPPING_COST,
    grandTotal: subtotal + SHIPPING_COST,
  };
}
