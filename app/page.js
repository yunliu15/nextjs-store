import { getFeaturedProducts, formatPrice } from '../utils/shopify';
import Link from 'next/link';

export default async function Home() {
  const products = await getFeaturedProducts();
  console.log(products.edges[0])
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Store</h1>

      <section>
        <h2>Products</h2>
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-6">
          {
            products.edges.map((item) => {
              const product = item.node;
              const image = product.images.edges[0]?.node;
              return (
                <Link key={product.handle} href={`/products/${product.handle}`} className="group">
                  <div className="w-full aspect-w-4 aspect-h-3 rounded-lg overflow-hidden">
                    <img
                      src={image? image.url : '/notfound.png'}
                      alt={image? image.altText : `image not found for ${product.title}`}
                      className="w-full h-full abject-center abject-cover group-hover:opacity-75"
                    />
                  </div>
                  <div className='mt-4 flex items-center justify-between text-base font-medium text-gray-900'>
                    <h3>{product.title}</h3>
                    <p>{formatPrice(product.priceRange.minVariantPrice.amount)}</p>
                  </div>
                </Link>
              )
            })
          }
        </div>
      </section>
    </main>
  )
}

