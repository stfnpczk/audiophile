'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useCartStore } from '@/app/store/cartStore';
import { getShortName } from '@/app/utils/formatProductName';
import { Button } from './Button';
import { QuantitySelector } from './QuantitySelector';
import type { Product } from '@/app/types';

interface AddToCartButtonProps {
  product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    const shortName = getShortName(product.name);
    addItem(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        shortName,
        price: product.price,
        image: product.image.mobile,
      },
      quantity,
    );
    toast.success(`Added ${shortName} to cart`);
    setQuantity(1);
  };

  return (
    <div className='flex gap-4'>
      <QuantitySelector
        value={quantity}
        onChange={setQuantity}
        min={1}
        max={99}
        itemName={product.name}
      />
      <Button
        onClick={handleAddToCart}
        className='shrink-0 whitespace-nowrap md:max-lg:px-3'
      >
        Add to Cart
      </Button>
    </div>
  );
}
