"use client"

import { useState } from 'react';
import { useCartContext, useAddToCartContext } from '@/context/Store';

function ProductForm({ title, handle, mainImg, variants, setVariantPrice }) {
  const [variantId, setVariantId] = useState(variants[0].node.id);
  const [quantity, setQuantity] = useState(1);
  const addToCart = useAddToCartContext();
  const isLoading = useCartContext()[2];

  const handleVariantChange = (e) => {
    setVariantId(e);
    const selectedVariant = variants.find(v => v.node.id === e);
    setVariantPrice(selectedVariant.node.price.amount);
  }
 
  const updateQuantity = (qty) => {
    if (qty === '') {
      setQuantity('');
    } else if (qty < 1) {
      setQuantity(1);
    } else {
      setQuantity(Math.floor(qty));
    }
  }

  async function handleAddToCart() {
    const variant = variants.find(v => v.node.id === variantId);
    // update store context
    if (quantity !== '') {
      addToCart({
        productTitle: title,
        productHandle: handle,
        productImage: mainImg,
        variantId: variantId,
        variantPrice: variant.node.price.amount,
        variantTitle: variant.node.title,
        variantQuantity: quantity
      })
    }
  }

  return (
    <div className="w-full">
      <div className="max-w-xs mt-5">
          <label className="text-gray-500 text-base">Color</label>
          <select
            id="size-selector"
            name="size-selector"
            onChange={(event) => handleVariantChange(event.target.value)}
            value={variantId}
            className="mt-3 mb-3 form-select border border-gray-300 rounded-sm w-full text-gray-900 focus:border-palette-light focus:ring-palette-light"
          >
            {
              variants.map(item => (
                <option
                  id={item.node.id}
                  key={item.node.id}
                  value={item.node.id}
                  disabled={item.node.availableForSale? false : true}
                >
                  {item.node.title}{item.node.availableForSale? '' : ' (out of stock)'}
                </option>
              ))
            }
          </select>
        </div>
      <div className="flex justify-start space-x-2 w-full">
        <div className="flex flex-col items-start space-y-1 flex-grow-0">
          <label className="text-gray-500 text-base">Qty.</label>
          <input
            type="number"
            inputMode="numeric"
            id="quantity"
            name="quantity"
            min="1"
            step="1"
            value={quantity}
            onChange={(e) => updateQuantity(e.target.value)}
            className="text-gray-900 form-input border border-gray-300 w-16 rounded-sm focus:border-palette-light focus:ring-palette-light"
          />
        </div>
        <button
          className="w-full bg-gray-900 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-500"
          aria-label="cart-button"
          onClick={handleAddToCart}
          disabled={isLoading? true : false}
        >
          Add To Cart         
        </button>
      </div>
      
    </div>
  )
}

export default ProductForm