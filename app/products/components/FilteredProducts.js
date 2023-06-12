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
                name: 'Less than $100',
                value: '0-100'
            },
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
        const filterGroup = currentFilters.find(f=> f.title === title);
        if (filterGroup) {
            const optionExists = filterGroup.options.some(o => o.value === value);
            if (!optionExists) {
                const newOptions = [...filterGroup.options, {name: name, value: value}];
                setCurrentFilters([...currentFilters.filter(f=> f.title !== title), {title: title, options: newOptions} ])
            }
        } else {console.log(title, name, value)
            setCurrentFilters([...currentFilters, {title:title, options: [{name: name, value, value}]}]);
        }
    }

    const removeFilter = (title, value) => {
        const filterGroup = currentFilters.find(f=> f.title === title);
        if (filterGroup) {
            const newOptions = filterGroup.options.filter(o => o.value !== value);
            if (newOptions.length) {               
                setCurrentFilters([...currentFilters.filter(f=> f.title !== title), {title: title, options:newOptions} ]);
            } else {
                setCurrentFilters(currentFilters.filter(f=> f.title !== title))
            }
        }
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
        let productsToFilter = [...products];
        currentFilters.forEach((filter) => {console.log(filter)
            let mergedProducts = [];
            if (filter.options.length) {                
                filter.options.forEach(option => {
                    mergedProducts = [...mergedProducts, ...filterProducts(productsToFilter, filter.title, option.value)];
                })
                resultProducts = Array.from(new Set(mergedProducts));
                productsToFilter = [...resultProducts];
            }
        })
        
        return resultProducts
    }
    
    if (!currentFilters.length) {
        filteredProducts = products;
    } else {
        filteredProducts = getFilteredProducts();
    }
    
    return (
        <div className="width-full grid md:grid-cols-12 gap-5 p-4 m-2">
            <aside className="md:col-span-3 md:pt-0 p-2 border-2">
                {
                    !!currentFilters.length && (
                    <div>
                        <h2 className='uppercase font-bold text-lg py-2'>Filtered By</h2>
                        <ul>
                            {
                                currentFilters.map((filter,index) =>{
                                    return (
                                        <li key={index} className='pt-1'>
                                            <span className='font-bold mr-1'>{filter.title}: </span>
                                            {
                                                filter.options.map((o, index) => {
                                                    return (
                                                        <div key={index}>
                                                            <span>{o.name}</span>
                                                            <button
                                                            className='ml-2'
                                                            value={o.value} 
                                                            onClick={e => removeFilter(filter.title, e.target.value)}>
                                                                remove
                                                            </button>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        <button onClick={clearAll}>Clear All</button>
                    </div>
                    )
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
