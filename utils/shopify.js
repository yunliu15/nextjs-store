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
        console.log(err.message);
        throw new Error('err.message');
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

export async function getAllProducts() {
  const {data} = await storefront(
  `
  {products(first: 170) {
    edges {
      node {
        title
        handle
        priceRange {
          minVariantPrice {
            amount
          }
          maxVariantPrice {
            amount
          }
        }
        variants(first: 15) {
          edges {
            node {             
              availableForSale
            }
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
  }}
  `
  );
  return data.products; 
}

export async function getProduct(handle) {
    const {data} = await storefront(
        `
         {
            productByHandle(handle: "${handle}") {
              title
              description
              tags
              variants(first: 15) {
                edges {
                  node {
                    id
                    title
                    availableForSale
                    price {
                        amount
                    }
                  }
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
        `
    );
    return data.productByHandle;
}