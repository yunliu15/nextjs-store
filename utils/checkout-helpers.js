import { storefront } from './shopify'

export function saveLocalData(cart, checkoutId, checkoutUrl) {
  localStorage.setItem(process.env.NEXT_PUBLIC_LOCAL_STORAGE_NAME, JSON.stringify([cart, checkoutId, checkoutUrl]))
}

function getLocalData() {
  return JSON.parse(localStorage.getItem(process.env.NEXT_PUBLIC_LOCAL_STORAGE_NAME))
}

export function setLocalData(setCart, setCheckoutId, setCheckoutUrl) {
  const localData = getLocalData()

  if (localData) {
    if (Array.isArray(localData[0])) {
      setCart([...localData[0]])
    }
    else {
      setCart([localData[0]])
    }
    setCheckoutId(localData[1])
    setCheckoutUrl(localData[2])
  }
}

export async function createShopifyCheckout(newItem) {
  const data = await createCheckout( newItem['variantId'], newItem['variantQuantity'])  
  return data
}

export async function updateShopifyCheckout(updatedCart, checkoutId) {
  const lineItems = updatedCart.map(item => {
    return {
      variantId: item['variantId'],
      quantity: item['variantQuantity']
    }
  })
  await updateCheckout(checkoutId, lineItems)
}

export function getCartSubTotal(cart) {
  if (cart.length === 0) {
    return 0
  }
  else {
    let totalPrice = 0
    cart.forEach(item => totalPrice += parseInt(item.variantQuantity) * parseFloat(item.variantPrice))
    return Math.round(totalPrice * 100) / 100
  }
}


export async function createCheckout(id, quantity) {
    const query =
      `mutation 
        {
          checkoutCreate(input: {
            lineItems: [{ variantId: "${id}", quantity: ${quantity} }]
          }) {
            checkout {
               id
               webUrl
               lineItems(first: 250) {
                 edges {
                   node {
                     id
                     title
                     quantity
                   }
                 }
               }
            }
          }
        }      
      `
    ;
  
    const response = await storefront(query);
  
    const checkout = response.data.checkoutCreate.checkout
      ? response.data.checkoutCreate.checkout
      : [];
  
    return checkout;
  }
  
  export async function updateCheckout(id, lineItems) {  
    const formattedLineItems = lineItems.map(item => {
      return `{
        variantId: "${item.variantId}",
        quantity:${item.quantity}
      }`
    })
  
    const query =
      `mutation 
        {
          checkoutLineItemsReplace(lineItems: [${formattedLineItems}], checkoutId: "${id}") {
            checkout {
               id
               webUrl
               lineItems(first: 250) {
                 edges {
                   node {
                     id
                     title
                     quantity
                   }
                 }
               }
            }
          }
        }      
      `
    ;
  
    const response = await storefront(query);
  
    const checkout = response.data.checkoutLineItemsReplace.checkout
      ? response.data.checkoutLineItemsReplace.checkout
      : [];
  
    return checkout;
  }