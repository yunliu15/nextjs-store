'use client'

import { useState,FormEvent } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function SearchBar() {
    const [search, setSearch] = useState('')
    const router = useRouter()

    const handleSubmit = (e) => {
        e.preventDefault()
        
        setSearch('')
        router.push(`/products?q=${search}`);
    }
  return (
    <form className="w-50 flex justify-center md:justify-between text-gray-900" 
    onSubmit={handleSubmit}>
        <label aria-label="search">
            <input 
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-white px-2 py-1 w-80 rounded-md"
                placeholder="Search"
            />
            <button type='submit' className="p-2 ml-2 text-white">
                <span className="sr-only">Search</span>
                <FontAwesomeIcon icon={ faMagnifyingGlass } className="w-4 inline-flex" />
            </button>
        </label>
    </form>
  )
}
