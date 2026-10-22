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
    vat: Math.round(subtotal * VAT_RATE),
    shipping: SHIPPING_COST,
    grandTotal: subtotal + SHIPPING_COST,
  };
}
