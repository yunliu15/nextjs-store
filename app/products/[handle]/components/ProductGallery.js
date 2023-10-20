"use client"

import * as React from "react";
import ImageGallery from "react-image-gallery";

// eslint-disable-next-line react/display-name
const ProductGallery = React.forwardRef(({images}, ref) => {
    return ( 
        <>
        {
            images.length <= 1
            ? <img
            src={images[0]? images[0].url : '/notfound.png'}
            alt={images[0]? images[0].altText : `image nof found for ${product.title}`}
            className='object-center object-cover'
            width='850'
            height='850'
            />
            : <ImageGallery 
            ref={ref}
            items={images} 
            showIndex={true} 
            />
        }
        </>
     );
});

export default ProductGallery;