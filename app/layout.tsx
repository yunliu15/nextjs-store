import './globals.css'
import { Inter } from 'next/font/google'
import { CartProvider } from '@/context/Store';
import Minicart from './components/Minicart';
import SearchBar from './components/SearchBar';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <CartProvider>    
        <body className={inter.className}>
          <nav className='fixed w-full bg-gray-900 text-white top-0'>
            <div className='flex items-center justify-between mx-auto max-w-6xl px-6 py-4'>             
              <Link href='/'>SnowBoard Store</Link>
              <Link href='/products'>Shop All</Link>
              <SearchBar />
              <Minicart />
            </div>
          </nav>
          {children}
        </body>
      </CartProvider>
    </html>
  )
}
