import cookie from 'react-cookie'

const CREATE_SHOPPING_CART = 'CREATE_SHOPPING_CART'
const ADD_PRODUCT = 'ADD_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const UPDATE_QUANTITY = 'UPDATE_QUANTITY'
const SUMMARY = 'SUMMARY'

export function addProduct(product) {

  let object = {
    price: product.price,
    articleNr: product.articleNr,
    productName: product.productName,
    quantity: product.quantity
  }

  let stringObj=JSON.stringify(object)
  cookie.save([product.articleNr], stringObj, { path: '/' })

  return {
    type: ADD_PRODUCT,
    product: cookie.load([product.articleNr])
  }
}

export function updateQuantity(articleNr, quantity) {
  let cookieQnt = parseInt(cookie.load([articleNr].quantity))

  let parsedQuantity
  if (cookieQnt < quantity) {
    parsedQuantity = quantity
  } else if(cookieQnt == quantity) {
    parsedQuantity = 0
  } else {
    parsedQuantity = -quantity
  }

  cookie.save([articleNr].quantity, quantity, { path: '/' })

  return {
    type: UPDATE_QUANTITY,
    articleNr,
    quantity: parsedQuantity
  }
}

export function deleteProduct(articleNr) {
  cookie.remove([articleNr], { path: '/' })

  return {
    type: DELETE_PRODUCT,
    articleNr
  }
}

export function summary(quantity, price) {
  return {
    type: SUMMARY,
    quantity,
    price
  }
}

export function addToShoppingcart(product) {
    return (dispatch) => {
            dispatch( addProduct(product))
            dispatch( summary(product.quantity, product.price))
    }
}

export function removeFromShoppingcart(product) {
    return (dispatch) => {
            dispatch( deleteProduct(product))
            dispatch( summary(product.quantity, -product.price))
    }
}
