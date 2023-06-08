const apiUrl = process.env.NEXT_PUBLIC_API_URL
const storefrontAccessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN


export async function storefront(query, variables = {}) {
    try {        
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
            },
            body: JSON.stringify({query, variables})
        })
        
        return response.json();

    } catch (err) {
        throw new Error(err.message);
    }
}

export function formatPrice(number) {
    return Intl.NumberFormat("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 2}).format(number);
}

export async function getFeaturedProducts() {
    const {data} = await storefront(featuredProductsQuery);
    return data.products
  }
  
  
  
  const featuredProductsQuery = `
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

export async function getAllProductsSlugs() {
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

export async function getProduct(handle) {
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