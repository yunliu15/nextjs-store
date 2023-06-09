import React from 'react';
import { formatPrice } from '@/utils/shopify';
import Link from 'next/link';

export default function ProductCard({item}) {    
    const product = item.node;
    const image = product.images.edges[0]?.node;   
    const isAvailable = product.variants.edges.some(v => v.node.availableForSale); 
    return (
        <Link href={`/products/${product.handle}`} className="group">
            <div className="w-full aspect-w-4 aspect-h-3 rounded-lg overflow-hidden">
            <img
                src={image? image.url : '/notfound.png'}
                alt={image? image.altText : `image not found for ${product.title}`}
                className="w-full h-full abject-center abject-cover group-hover:opacity-75"
            />
            </div>
            <div className='mt-4 flex items-start justify-between text-base font-medium text-gray-900'>
            <h3>
                {product.title}

                {
                    isAvailable? '' : (<p className='text-red'>Out of Stock</p>)
                }
            </h3>
            <p>{formatPrice(product.priceRange.minVariantPrice.amount)}</p>
            </div>
        </Link>
    )
}
