import { beforeEach, describe, expect, it, vi } from 'vitest';
import { selectSubtotal, selectTotalQuantity, useCartStore } from './cartStore';

const headphones = {
  productId: 4,
  slug: 'xx99-mark-two-headphones',
  name: 'XX99 Mark II Headphones',
  shortName: 'XX99 MK II',
  price: 2999,
  image: '/assets/cart/image-xx99-mark-two-headphones.jpg',
};

const speaker = {
  productId: 6,
  slug: 'zx9-speaker',
  name: 'ZX9 Speaker',
  shortName: 'ZX9',
  price: 4500,
  image: '/assets/cart/image-zx9-speaker.jpg',
};

const items = () => useCartStore.getState().items;
const { addItem, updateQuantity, clearCart } = useCartStore.getState();

beforeEach(() => {
  useCartStore.setState({ items: [] });
});

describe('addItem', () => {
  it('adds a new item with quantity 1 by default', () => {
    addItem(headphones);
    expect(items()).toEqual([{ ...headphones, quantity: 1 }]);
  });

  it('increases the quantity of an existing item', () => {
    addItem(headphones, 2);
    addItem(headphones, 3);
    expect(items()).toHaveLength(1);
    expect(items()[0].quantity).toBe(5);
  });

  it('caps the quantity at 99', () => {
    addItem(headphones, 150);
    expect(items()[0].quantity).toBe(99);
    addItem(headphones, 5);
    expect(items()[0].quantity).toBe(99);
  });

  it('clamps invalid quantities for new and existing items', () => {
    addItem(headphones, -3);
    expect(items()[0].quantity).toBe(1);
    addItem(headphones, 2.7);
    expect(items()[0].quantity).toBe(3);
    addItem(headphones, -10);
    expect(items()[0].quantity).toBe(4);
  });

  it('rejects an invalid item', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    addItem({ ...headphones, price: -1 });
    expect(items()).toEqual([]);
    expect(error).toHaveBeenCalled();
    error.mockRestore();
  });
});

describe('updateQuantity', () => {
  it('sets the quantity of an item', () => {
    addItem(headphones);
    updateQuantity(headphones.productId, 4);
    expect(items()[0].quantity).toBe(4);
  });

  it('removes the item when the quantity drops below 1', () => {
    addItem(headphones);
    addItem(speaker);
    updateQuantity(headphones.productId, 0);
    expect(items()).toEqual([{ ...speaker, quantity: 1 }]);
  });

  it('caps the quantity at 99 and floors fractions', () => {
    addItem(headphones);
    updateQuantity(headphones.productId, 500);
    expect(items()[0].quantity).toBe(99);
    updateQuantity(headphones.productId, 2.9);
    expect(items()[0].quantity).toBe(2);
  });
});

describe('selectors and clearCart', () => {
  it('computes total quantity and subtotal', () => {
    addItem(headphones, 2);
    addItem(speaker);
    const state = useCartStore.getState();
    expect(selectTotalQuantity(state)).toBe(3);
    expect(selectSubtotal(state)).toBe(2 * 2999 + 4500);
  });

  it('empties the cart', () => {
    addItem(headphones);
    clearCart();
    expect(items()).toEqual([]);
  });
});
