import { getAllProductsSlugs, getProduct } from '@/utils/shopify';
import ProductDetails from './components/ProductDetails';
import ProductCard from '@/app/components/ProductCard';
import { getFeaturedProducts } from '@/utils/shopify';

export default async function Product({ params: {handle}}) {
    const product = await getProduct(handle);
    const fetaured = await getFeaturedProducts();
  return (
    <main className="mx-auto pt-14 px-4 sm:pt-24 sm: px-6 lg:max-w-7x1 lg:px-8">
        < ProductDetails product={product} handle={handle} />
        <section className='p-24'>
            <h2 className='text-center py-4'>You May Also Like</h2>
            <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-6">
            {
                fetaured.edges.map((item) => {
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

export async function generateStaticParams() {
    const products = await getAllProductsSlugs();
    return products.edges.map(item => {handle: item.node.handle})
}


