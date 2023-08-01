"use client"

import * as React from "react";
import ImageGallery from "react-image-gallery";
import Image from 'next/image';

export default function ProductGallery({product}) {
    const slideRef = React.useRef();console.log(slideRef)
    const images = product?.images?.edges.map(item => {
        return {
            original: item.node.url,
            thumbnail: item.node.url,
            originalAlt: item.node.altText,
            id: item.node.id
        }
    }) || [];

    const renderCustomControls = () => {

        return (
            <span>slideRef.current.getCurrentIndex()</span>
        )
    }
    return ( 
        <>
        {
            images.length <= 1
            ? <Image
            src={images[0]? images[0].url : '/notfound.png'}
            alt={images[0]? images[0].altText : `image nof found for ${product.title}`}
            className='object-center object-cover'
            width='850'
            height='850'
            />
            : <ImageGallery 
            ref={slideRef}
            renderCustomControls={renderCustomControls}
            items={images} 
            showIndex={true} 
            />
        }
        </>
     );
}