"use client"

import { useState } from 'react';

function ProductForm({ variants, setVariantPrice }) {
  const [variantId, setVariantId] = useState(variants[0].node.id);
  const [variant, setVariant] = useState(variants[0]);
  const [quantity, setQuantity] = useState(1);

  const handleVariantChange = (e) => {
    setVariantId(e);
    // send back change
    const selectedVariant = variants.find(v => v.node.id === e);
    setVariantPrice(selectedVariant.node.price.amount);

    // update variant
    setVariant(selectedVariant);
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
                >
                  {item.node.title}
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
        
      </div>
      
    </div>
  )
}

export default ProductForm