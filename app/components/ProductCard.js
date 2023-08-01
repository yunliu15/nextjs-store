import React from 'react';
import { formatPrice } from '@/utils/shopify';
import Link from 'next/link';

export default function ProductCard({item}) {    
    const product = item.node;
    const image = product.images.edges[0]?.node;
    const isAvailable = product.variants.edges.some(v => v.node.availableForSale); 
    return (
        <Link href={`/products/${product.handle}`} className="group">
            <div className="w-full aspect-square rounded-lg overflow-hidden bg-white">
            <img
                src={image? image.url : '/notfound.png'}
                alt={image? image.altText : `image not found for ${product.title}`}
                className="h-full m-auto abject-center abject-cover group-hover:opacity-75"
            />
            </div>
            <div className='mt-4 flex items-start justify-between text-base font-medium text-gray-900 dark:text-slate-50'>
            <h3 className='font-bold'>
                {product.title}

                {
                    isAvailable? '' : (<p className='text-red-700'>Out of Stock</p>)
                }
            </h3>
            <p>{formatPrice(product.priceRange.minVariantPrice.amount)}</p>
            </div>
        </Link>
    )
}
