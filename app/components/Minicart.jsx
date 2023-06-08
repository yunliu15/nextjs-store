"use client"

import { useState, useEffect } from 'react';
import { useCartContext, useUpdateCartQuantityContext } from '@/context/Store';
import { getCartSubTotal } from '@/utils/checkout-helpers';
import {formatPrice} from '@/utils/shopify'
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faTimes, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Popover } from '@headlessui/react';

export default function Minicart() {
    const updateCartQuantity = useUpdateCartQuantityContext();
    const cart = useCartContext()[0];
    const checkoutUrl = useCartContext()[1];
    const subtotal = getCartSubTotal(cart);
    console.log(cart);
    let numItems = 0
    cart.forEach(item => {
        numItems += item.variantQuantity
    })

    function updateItem(id, quantity) {
        if (quantity != '' && quantity > 0) {            
            updateCartQuantity(id, quantity)
        }
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

                <Popover.Panel className="bg-white absolute z-10">
                    <div>
                        Subtotal: {formatPrice(subtotal)}
                    </div>
                    <ul className='p-3'>
                        
                        {
                            cart.map((item, index) => {
                                return (
                                    <li key={index} className='p-2'>
                                        <h3>{item.productTitle}</h3>
                                        <p>{item.variantTitle}</p>
                                        <p>{formatPrice(item.variantPrice)}</p>
                                        <input 
                                        name='qty'
                                        type='number'
                                        min="1"
                                        step="1"
                                        value={item.variantQuantity}
                                        onChange={e => updateItem(item.variantId, e.target.value)}
                                        className="text-gray-900 form-input border border-gray-300 w-16 rounded-sm focus:border-palette-light focus:ring-palette-light"
                                        />
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
                    <Link
                    href={checkoutUrl}
                    aria-label="checkout-products"
                    className="bg-gray-900 text-white text-lg font-primary font-semibold pt-2 pb-1 leading-relaxed flex 
                    justify-center items-center focus:ring-1 focus:ring-palette-light focus:outline-none w-full hover:bg-palette-dark rounded-sm"
                    >
                    Check Out
                    <FontAwesomeIcon icon={faArrowRight} className="w-4 ml-2 inline-flex" />
                    </Link>
                </Popover.Panel>
            </Popover>
            
        </div>
    )
}
