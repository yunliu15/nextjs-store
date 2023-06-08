import { storefront, formatPrice } from '@/utils/index';

export default async function Product({ params: {handle}}) {
    const product = await getProduct(handle);
    console.log(product);
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
            <div className='max-w-2x1 mx-auto mt-14 sm:mt-16 lg:max-w-none lg:mt-0 lg:col-span-3'>
                <div>
                    <h1 className='text-2x1 font-extrabold tracking-tight text-gray-900 sm:text-3x1'>
                        {product.title}
                    </h1>
                </div>
                <p className='text-gray-500 mt-6'>{product.description}</p>
                <div className='mt-10 grid=grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2'>
                    <button
                     type="button"
                     className='w-full bg-gray-900 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-500'
                    >
                        Pay {formatPrice(product.priceRange.minVariantPrice.amount)}
                    </button>

                </div>
            </div>
        </div>
    </main>
  )
}

export async function generateStaticParams() {
    const products = await getAllProducts();
    return products.edges.map(item => {handle: item.node.handle})
}

async function getAllProducts() {
    const {data} = await storefront(
        `
        query Products{
            products(first: 17) {
                edges {
                    node {
                        handle
                    }
                }
            }
        }
        `
    );
    return data.products; 
}

async function getProduct(handle) {
    const {data} = await storefront(
        `
        query Product($handle: String!) {
            productByHandle(handle: $handle) {
              title
              description
              tags
              priceRange {
                minVariantPrice {
                  amount
                }
              }
              images(first: 1) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
            }
          }
        `, {handle: handle}
    );
    return data.productByHandle;
}
