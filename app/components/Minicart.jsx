"use client"

import { useState, useEffect } from 'react';
import { useCartContext, useUpdateCartQuantityContext } from '@/context/Store';
import { getCartSubTotal } from '@/utils/checkout-helpers';
import {formatPrice} from '@/utils/shopify'
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Popover } from '@headlessui/react';

export default function Minicart() {
    const updateCartQuantity = useUpdateCartQuantityContext();
    const cart = useCartContext()[0];
    const subtotal = getCartSubTotal(cart);
    console.log(cart);
    let numItems = 0
    cart.forEach(item => {
        numItems += item.variantQuantity
    })

    function updateItem(id, quantity) {
        updateCartQuantity(id, quantity)
    }
    
    return (
        <div>
            <Popover className="relative">
                <Popover.Button>
                <div className='inlne-block pr-5 relative'>
                    <FontAwesomeIcon className="text-palette-primary w-6 m-auto" icon={faShoppingCart} />
                    {
                    numItems === 0 ?
                        null
                        :
                        <div
                        className="absolute top-0 right-0 text-xs bg-yellow-300 text-gray-900 font-semibold rounded-full py-1 px-2 transform -translate-y-3"
                        >
                        {numItems}
                        </div>
                    }
                </div>
                </Popover.Button>

                <Popover.Panel className="absolute z-10">
                    <div>
                        Subtotal: {formatPrice(subtotal)}
                    </div>
                    <ul className='bg-white p-3'>
                        
                        {
                            cart.map((item, index) => {
                                return (
                                    <li key={index} className='p-2'>
                                        <h3>{item.productTitle}</h3>
                                        <p>{item.variantTitle}</p>
                                        <p>{formatPrice(item.variantPrice)}</p>
                                        <p>{item.variantQuantity}</p>
                                        <button
                                        aria-label="delete-item"
                                        className=""
                                        onClick={() => updateItem(item.variantId, 0)}
                                        >
                                        <FontAwesomeIcon icon={faTimes} className="w-8 h-8 text-palette-primary border border-palette-primary p-1 hover:bg-palette-lighter" />
                                        </button>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </Popover.Panel>
            </Popover>
            
        </div>
    )
}
