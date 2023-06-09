import { getAllProductsSlugs, getProduct } from '@/utils/shopify';
import ProductDetails from './components/ProductDetails';

export default async function Product({ params: {handle}}) {
    const product = await getProduct(handle);
    const image = product.images.edges[0]?.node;
  return (
    <main className="mx-auto pt-14 px-4 sm:pt-24 sm: px-6 lg:max-w-7x1 lg:px-8">
        <div className='lg:grid lg:grid-cols-7 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16'>
            {/* product image */}
            <div className='lg:col-span-4'>
                <div className='aspect-w-4 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden'>
                    <img
                    src={image? image.url : '/notfound.png'}
                    alt={image? image.altText : `image nof found for ${product.title}`}
                    className='object-center object-cover'
                    />
                </div>
            </div>

            {/* product details */}
            <ProductDetails product={product} handle={handle}/>
        </div>
    </main>
  )
}

export async function generateStaticParams() {
    const products = await getAllProductsSlugs();
    return products.edges.map(item => {handle: item.node.handle})
}


