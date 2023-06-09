'use client'

import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import ProductCard from '@/app/components/ProductCard';

function Items({ currentItems }) {
  return (
    <>
      {currentItems?
        currentItems.map((item) => (
          <div key={item.node.handle} >
            <ProductCard item={item} />
          </div>
        ))
        : (<p>No Products Found</p>)
      }
    </>
  );
}

export default function PaginatedItems({items, itemsPerPage}) {
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);
    const startItem = itemOffset + 1;
    const endItem = itemOffset + currentItems.length;

    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % items.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };
  return (
    <>
      {
      !currentItems? '': currentItems.length > 1? (
        <p>Products {startItem} - {endItem} of {items.length}</p>
      ) : <p> Product 1 of 1 </p>
      
      }
     
      <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3">
      <Items currentItems={currentItems} />
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </>
  )
}
