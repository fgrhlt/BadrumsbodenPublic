import cookie from 'react-cookie'

const CREATE_SHOPPING_CART = 'CREATE_SHOPPING_CART'
const ADD_PRODUCT = 'ADD_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const UPDATE_QUANTITY = 'UPDATE_QUANTITY'
const UPDATE_SUMMARY = 'UPDATE_SUMMARY'
const FETCH_PRODUCTS = 'FETCH_PRODUCTS'
const FETCH_SUMMARY = 'FETCH_SUMMARY'

export function addProduct(product, quantity) {

  let object = {
    price: product.price,
    articleNr: product.articleNr,
    productName: product.productName,
    imageUrl: product.url,
    quantity: parseInt(quantity)
  }

  let stringObj=JSON.stringify(object)
  var d = new Date()
  d.setTime(d.getTime() + (2*24*60*60*1000))
  cookie.save('articles'+[product.articleNr], stringObj, { path: '/', expires: d })

  return {
    type: ADD_PRODUCT,
    product: cookie.load('articles'+[product.articleNr])
  }
}

export function fetchProducts() {
  let cookies = []
  Object.keys(cookie.select(/^articles.*/i)).forEach(name => cookies.push((cookie.load(name))))

  return {
    type: FETCH_PRODUCTS,
    products: cookies
  }
}

export function updateArticleQuantity(articleNr, quantity) {
  var d = new Date()
  d.setTime(d.getTime() + (2*24*60*60*1000))

  let cookieQnt = parseInt(cookie.load('articles'+[articleNr].quantity))

  let parsedQuantity
  if (cookieQnt < quantity) {
    parsedQuantity = quantity
  } else if(cookieQnt == quantity) {
    parsedQuantity = 0
  } else {
    parsedQuantity = -quantity
  }

  cookie.save('articles'+[articleNr].quantity, quantity, { path: '/', expires: d})

  return {
    type: UPDATE_QUANTITY,
    articleNr,
    quantity: parsedQuantity
  }
}

export function deleteProduct(articleNr) {
  cookie.remove('articles'+[articleNr], { path: '/'})

  return {
    type: DELETE_PRODUCT,
    articleNr
  }
}

export function updateSummary(quantity, price) {
  let cookieObj = cookie.load('summary')

  if (!cookieObj) {
    cookieObj = { quantity: 0, sum: 0 }
  }

  let object = {
    sum: parseInt(cookieObj.sum) + (price*quantity),
    quantity: parseInt(cookieObj.quantity) + quantity
  }

  let stringObj=JSON.stringify(object)
  var d = new Date()
  d.setTime(d.getTime() + (2*24*60*60*1000))
  cookie.save('summary', stringObj, { path: '/', expires: d })

  return {
    type: FETCH_SUMMARY,
    quantity: object.quantity,
    sum: object.sum
  }
}

export function fetchSummary() {
  let cookieObj = cookie.load('summary')

  if (!cookieObj) {
    cookieObj = { quantity: 0, sum: 0 }
  }

  return {
    type: FETCH_SUMMARY,
    quantity: cookieObj.quantity,
    sum: cookieObj.sum
  }
}

export function addToShoppingcart(product, quantity) {
    return (dispatch) => {
            dispatch( addProduct(product, quantity))
            dispatch( updateSummary(parseInt(quantity), parseInt(product.price)))
    }
}

export function removeFromShoppingcart(product) {
    return (dispatch) => {
            dispatch( deleteProduct(product))
            dispatch( updateSummary(parseInt(product.quantity), parseInt(-product.price)))
    }
}

export function fetchShoppingcart(product) {
    return (dispatch) => {
            dispatch( fetchProducts())
            dispatch( fetchSummary())
    }
}

export function updateQuantity(product) {
    return (dispatch) => {
            dispatch( updateArticleQuantity(product.articleNr, product.quantity))
            dispatch( updateSummary(parseInt(product.quantity), parseInt(product.price)))
    }
}
