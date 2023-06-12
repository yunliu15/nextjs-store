import React from 'react';
import { getAllProducts, searchProducts } from '@/utils/shopify';
import FilteredProducts from './components/FilteredProducts';


export default async function Products({searchParams}) {
    const searchTerm = searchParams.search;
    let products = [];
    if (searchTerm) {
        const productsData = await searchProducts(searchTerm);
        products = productsData.edges;
    } else {
        const productsData = await getAllProducts();
        products = productsData.edges;
    }
    
    return (
        <section className='flex min-h-screen flex-col items-center justify-between max-w-7xl m-auto p-4'>
            <h1 className='text-5xl font-bold'>
                {
                    searchTerm? `Search results for "${searchTerm}":` : 'All Products'
                }
            </h1>   
            <FilteredProducts 
             products={products}
            />
        </section>
    )
}
