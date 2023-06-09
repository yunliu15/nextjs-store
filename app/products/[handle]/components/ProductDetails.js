"use client"

import { useState } from 'react';
import { formatPrice } from '@/utils/shopify';
import ProductForm from './ProductForm';

export default function ProductDetails({product, handle}) {
  const [variantPrice, setVariantPrice] = useState(product.variants.edges[0].node.price.amount)
  return (
    <div className='max-w-2x1 mx-auto mt-14 sm:mt-16 lg:max-w-none lg:mt-0 lg:col-span-3'>
        <div>
            <h1 className='text-2x1 font-extrabold tracking-tight text-gray-900 sm:text-3x1'>
                {product.title}
            </h1>
        </div>
        <div className="text-xl text-palette-primary font-medium py-4 px-1">
          {formatPrice(variantPrice)}
        </div>
        <p className='text-gray-500 mt-6'>{product.description}</p>
        <ProductForm
        title={product.title}
        handle={handle}
        mainImg={product.images.edges[0]?.node}
        variants={product.variants.edges}
        setVariantPrice={setVariantPrice}
        />
    </div>
  )
}
