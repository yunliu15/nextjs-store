import React from 'react';
import { getAllProducts, searchProducts } from '@/utils/shopify';
import PaginatedItems from '@/app/components/PaginatedItems';

const itemsPerPage = 9;
export default async function Products({searchParams}) {
    const searchTerm = searchParams.q;
    let products = [];
    if (searchTerm) {
        const productsData = await searchProducts(searchTerm);
        products = productsData.edges;
    } else {
        const productsData = await getAllProducts();
        products = productsData.edges;
    }
    
    
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">        
            <PaginatedItems 
             items={products}
             itemsPerPage={itemsPerPage}
            />
        </main>
    )
}
