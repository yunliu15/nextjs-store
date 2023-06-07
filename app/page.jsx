import Image from 'next/image'
import { storefront } from '../utils/index'

export default async function Home() {
  const products = await getProducts();
  console.log(products.edges[0].node.title)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Store</h1>
    </main>
  )
}

async function getProducts() {
  const {data} = await storefront(productsQuery);
  return data.products
}



const productsQuery = `
query Products {
  products(first: 6) {
    edges {
      node {
        title
        handle
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
  }
}
`