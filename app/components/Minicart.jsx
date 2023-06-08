"use client"

import { useState, useEffect } from 'react';
import { useCartContext } from '@/context/Store';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

export default function Minicart() {
    const cart = useCartContext()[0];
    const [cartItems, setCartItems] = useState(0);

    useEffect(() => {
        let numItems = 0
        cart.forEach(item => {
          numItems += item.variantQuantity
        })
        setCartItems(numItems)
    }, [cart])
    
    return (
        <div>
            <Link
            href="/cart"
            className=" relative" aria-label="cart"
          >
            <FontAwesomeIcon className="text-palette-primary w-6 m-auto" icon={faShoppingCart} />
            {
            cartItems === 0 ?
                null
                :
                <div
                className="absolute top-0 right-0 text-xs bg-yellow-300 text-gray-900 font-semibold rounded-full py-1 px-2 transform translate-x-10 -translate-y-3"
                >
                {cartItems}
                </div>
            }
          </Link>
        </div>
    )
}
