import './globals.css'
import { Inter } from 'next/font/google'
import { CartProvider } from '@/context/Store';
import Minicart from './components/minicart';

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
          <nav className='py-4 px-3'>
            <Minicart />
          </nav>
          {children}
        </body>
      </CartProvider>
    </html>
  )
}
