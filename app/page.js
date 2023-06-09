import { getFeaturedProducts, formatPrice } from '../utils/shopify';
import Link from 'next/link';
import ProductCard from './components/ProductCard';

export default async function Home() {
  const products = await getFeaturedProducts();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Store</h1>

      <section>
        <h2>Products</h2>
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-6">
          {
            products.edges.map((item) => {
              return (
                <ProductCard item={item} />
              )
            })
          }
        </div>
      </section>
    </main>
  )
}

