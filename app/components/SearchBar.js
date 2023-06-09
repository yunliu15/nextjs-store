'use client'

import { useState,FormEvent } from "react"
import { useRouter } from "next/navigation"

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
                className="bg-white p-2 w-80 text-xl rounded-xl"
                placeholder="Search"
            />
            <button type='submit' className="p-2 text-xl rounded-xl bg-slate-300 ml-2 font-bold">Search</button>
        </label>
    </form>
  )
}
