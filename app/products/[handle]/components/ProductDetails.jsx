import React from 'react';
import { formatPrice } from '@/utils/shopify';

export default function ProductDetails({product}) {
  return (
    <div className='max-w-2x1 mx-auto mt-14 sm:mt-16 lg:max-w-none lg:mt-0 lg:col-span-3'>
        <div>
            <h1 className='text-2x1 font-extrabold tracking-tight text-gray-900 sm:text-3x1'>
                {product.title}
            </h1>
        </div>
        <p className='text-gray-500 mt-6'>{product.description}</p>
        <div className='mt-10 grid=grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2'>
            <button
                type="button"
                className='w-full bg-gray-900 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-500'
            >
                Pay {formatPrice(product.priceRange.minVariantPrice.amount)}
            </button>

        </div>
    </div>
  )
}
