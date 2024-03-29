import { getFeaturedProducts } from '../utils/shopify';
import Link from 'next/link';
import ProductCard from './components/ProductCard';
import Image from 'next/image';

export default async function Home() {
  const products = await getFeaturedProducts();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className='hero-image-container relative'>
        <div className='text-box absolute'>
          <h1>Unlock the <br />Magic of Winter</h1>
          <p>Discover Your Perfect Snowboard Here</p>
        </div>
        <Image src='/hero-image.jpeg' width="1980" height="1280" alt="a woman rest with snowboard on the mountain" />
      </div>

      <section className='p-24'>
        <h2 className='text-center py-4'>Featured Products</h2>
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-6">
          {
            products.edges.map((item) => {
              return (
                <div key={item.node.handle}>
                <ProductCard item={item} />
                </div>
              )
            })
          }
        </div>
      </section>
    </main>
  )
}

