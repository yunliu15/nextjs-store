"use client"

import { useState, useRef } from 'react';
import { formatPrice } from '@/utils/shopify';
import ProductForm from './ProductForm';
import ProductGallery from './ProductGallery';

export default function ProductDetails({product, handle}) {
  const [currentVariant, setCurrentVariant] = useState({
    price: product.variants.edges[0].node.price.amount,
    imageId: product.variants.edges[0].node.image?.id
  });
  const images = product?.images?.edges.map(item => {
    return {
        url: item.node.url,
        altText: item.node.altText,
        original: item.node.url,
        thumbnail: item.node.url,
        originalAlt: item.node.altText,
        id: item.node.id
    }
  }) || [];

  
  const slideRef = useRef();
  const updateImage = (index) => {
    slideRef.current?.slideToIndex(index);
  }
  return (
    <div className='lg:grid lg:grid-cols-7 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16'>
            {/* product image */}
            <div className='lg:col-span-4'>
                <div className='aspect-w-4 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden'>
                    <ProductGallery ref={slideRef} images={images} currentImageId={currentVariant.imageId} />
                </div>
            </div>

            {/* product details */}
            <div className='max-w-2x1 mx-auto mt-14 sm:mt-16 lg:max-w-none lg:mt-0 lg:col-span-3'>
              <div>
                  <h1 className='text-2x1 font-extrabold tracking-tight text-gray-900 dark:text-slate-50 sm:text-3x1'>
                      {product.title}
                  </h1>
              </div>
              <div className="text-xl text-palette-primary font-medium py-4 px-1">
                {formatPrice(currentVariant.price)}
              </div>
              <p className='text-gray-500 dark:text-slate-50 mt-6'>{product.description}</p>
              <ProductForm
              title={product.title}
              handle={handle}
              mainImg={product.images.edges[0]?.node}
              variants={product.variants.edges}
              setCurrentVariant={setCurrentVariant}
              updateImage={updateImage}
              images={images}
              />
          </div>
        </div>
    
  )
}
