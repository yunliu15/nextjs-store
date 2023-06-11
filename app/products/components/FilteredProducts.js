"use client"
import { useState } from 'react';
import PaginatedItems from '@/app/components/PaginatedItems';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

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
    },

    {
        'title': 'Tag',
        'options': [
            {
                name: 'Accessory',
                value: 'Accessory'

            },
            {
                name: 'Sport',
                value: 'Sport'
            },
            {
                name: 'Premium',
                value: 'Premium'
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
        console.log(title + value)
        const newFilters = currentFilters.filter(f => f.title !== title || f.value !==value);
        console.log(newFilters)
        setCurrentFilters(newFilters);
    }

    const clearAll = () => {
        setCurrentFilters([]);
    }

    const filterProducts = (productsToFilter, title, value) => {
        switch (title) {
            case 'Price':
              const minPrice = parseInt(value.split('-')[0]);
              const maxPrice = parseInt(value.split('-')[1]);
              return productsToFilter.filter((item) => {
                let price = item.node.priceRange.minVariantPrice.amount;
                return price >= minPrice && price <= maxPrice
              });
              break;
            case 'Tag':
                return productsToFilter.filter((item) => {
                    return item.node.tags.some(t => t === value)
                });
                break;
            default:
              console.log('invalid filter');              
              return productsToFilter
        }
    }

    const getFilteredProducts = () => {
        let resultProducts = [...products];
        let uniqueProducts = [];
        
        let currentTitle = '';
        let productsToFilter = [];
        currentFilters.forEach((filter) => {
            if (filter.title === currentTitle) {             
                let p = filterProducts(productsToFilter, filter.title, filter.value);
                resultProducts = [...resultProducts, ...p];
            } else {
                currentTitle = filter.title;
                productsToFilter = [...resultProducts]
                resultProducts = filterProducts(productsToFilter, filter.title, filter.value);
            }

        })
        uniqueProducts = Array.from(new Set(resultProducts));
        return uniqueProducts
    }
    
    if (!currentFilters.length) {
        filteredProducts= products;
    } else {
        filteredProducts = getFilteredProducts();
    }
    
    return (
        <div className="grid md:grid-cols-12 gap-5 p-4 m-2">
            <aside className="md:col-span-3 md:pt-0 p-2 border-2">
                {
                    currentFilters.length? (
                    <div>
                        <h2 className='uppercase font-bold text-lg py-2'>Filtered By</h2>
                        <ul>
                            {
                                currentFilters.map((filter,index) =>{
                                    return (
                                        <li key={index} className='pt-1'>
                                            <span className='font-bold mr-1'>{filter.title}: </span>
                                            <span>{filter.name}</span>
                                            <button
                                            className='ml-2'
                                            value={filter.value} 
                                            onClick={e => removeFilter(filter.title, e.target.value)}>
                                                remove
                                            </button>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        <button onClick={clearAll}>Clear All</button>
                    </div>
                    ) : ''
                }
                <h2 className='uppercase font-bold text-lg py-2 mt-4'>Shop By</h2>
                <ul>
                    {
                        filters.map((filter, index) => {
                            return (
                                <li key={index}>
                                    <h3 className='font-bold text-lg py-2'>{filter.title}</h3>
                                    {
                                        filter.options.map((option, index) => {
                                            return (
                                                <div key={index}>
                                                    
                                                {
                                                   <button
                                                   className='mb-2'
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
