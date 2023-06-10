"use client"
import { useState } from 'react';
import PaginatedItems from '@/app/components/PaginatedItems';

const filters = [
    {
        'title': 'Price',
        'options': [
            {
                name: '$100 to $700',
                value: '100-700'
            },
            {
                name: '$701 to $1000',
                value: '701-1000'
            },
            {
                name: 'more than $1000',
                value: '1000-10000'
            }
        ]
    }
]

const itemsPerPage = 9;
export default function FilteredProducts({products}) {
    const [currentFilters, setCurrentFilters] = useState([]);
    let filteredProducts;

    const addFilter = (title, name, value) => {
        const isDuplicate = currentFilters.some(filter => filter.title === title && filter.value ===value);
        if (!isDuplicate) {          
            setCurrentFilters([...currentFilters, {title: title, name: name, value: value}]);
        }
    }

    const removeFilter = (title, value) => {
        const newFilters = currentFilters.filter(f => f.title !== title || f.value !==value);
        setCurrentFilters(newFilters);
    }

    const filterProducts = (title, value) => {
        switch (title) {
            case 'Price':
              const minPrice = parseInt(value.split('-')[0]);
              const maxPrice = parseInt(value.split('-')[1]);
              return products.filter((item) => {
                let price = item.node.priceRange.minVariantPrice.amount;
                return price >= minPrice && price <= maxPrice
              });
              break;
            
            default:
              console.log('invalid filter');              
              return products
        }
    }

    const getFilteredProducts = () => {
        let mergedProducts = [];
        let uniqueProducts = [];
        
        currentFilters.forEach((filter) => {
            let p = filterProducts(filter.title, filter.value);
            mergedProducts = [...mergedProducts, ...p];

        })
        console.log(mergedProducts)
        uniqueProducts = Array.from(new Set(mergedProducts));
        return uniqueProducts
    }
    filteredProducts = getFilteredProducts();
    if (!filteredProducts.length) {
        filteredProducts= products;
    } 

    return (
        <div className="grid md:grid-cols-12 gap-5 p-4 m-2">
            <aside className="md:col-span-3 md:pt-0 p-2 border-2">
                {
                    currentFilters.length? (
                    <div>
                        <h2>Filtered By</h2>
                        <ul>
                            {
                                currentFilters.map((filter,index) =>{
                                    return (
                                        <li key={index}>
                                            <span>{filter.title}: </span>
                                            <span>{filter.name}</span>
                                            <button value={filter.value} onClick={e => removeFilter(filter.title, e.target.value)}>remove</button>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    ) : ''
                }
                <h2>Filter By</h2>
                <ul>
                    {
                        filters.map((filter, index) => {
                            return (
                                <li key={index}>
                                    <h3>{filter.title}</h3>
                                    {
                                        filter.options.map((option, index) => {
                                            return (
                                                <div key={index}>
                                                    
                                                {
                                                   <button 
                                                   value={option.value}
                                                   onClick={(e) => addFilter(filter.title,option.name, e.target.value)}
                                                   >
                                                    {option.name}
                                                    </button>
                                                }
                                                </div>
                                            )
                                        })
                                    }
                                </li>
                            )
                        })
                    }
                </ul>
            </aside>
            <main className="md:col-span-9 p-4 border-2">
                <PaginatedItems 
                items={filteredProducts}
                itemsPerPage={itemsPerPage}
                />
            </main>
        </div>
    )
}
