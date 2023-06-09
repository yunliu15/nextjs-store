import React from 'react';
import { getAllProducts, formatPrice } from '@/utils/shopify';
import PaginatedItems from '@/app/components/PaginatedItems';

const itemsPerPage = 9;
export default async function Products() {
    const products = await getAllProducts();

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">        
            <PaginatedItems 
             items={products.edges}
             itemsPerPage={itemsPerPage}
            />
        </main>
    )
}
