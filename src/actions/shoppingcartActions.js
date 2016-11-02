import cookie from 'react-cookie'

const CREATE_SHOPPING_CART = 'CREATE_SHOPPING_CART'
const ADD_PRODUCT = 'ADD_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const UPDATE_QUANTITY = 'UPDATE_QUANTITY'
const SUMMARY = 'SUMMARY'
const FETCH_PRODUCTS = 'FETCH_PRODUCTS'
const FETCH_SUMMARY = 'FETCH_SUMMARY'

export function addProduct(product, quantity) {

  let cookieObj = cookie.load('articles'+[product.articleNr])
  if (!cookieObj) {
    cookieObj = { quantity: 0 }
  }

  let object = {
    price: product.price,
    articleNr: product.articleNr,
    productName: product.productName,
    quantity: parseInt(quantity) + parseInt(cookieObj.quantity)
  }
  console.log('add', object);
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
  console.log('fetch', cookies);
  return {
    type: FETCH_PRODUCTS,
    products: cookies
  }
}

export function updateQuantity(articleNr, quantity) {
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

export function summary(quantity, price) {
  return {
    type: SUMMARY,
    quantity,
    price
  }
}

export function fetchSummary() {
  let cookies = []
  Object.keys(cookie.select(/^articles.*/i)).forEach(name => cookies.push((cookie.load(name))))

  let totSum = 0
  let totQuantity = 0

  cookies.map( product => {
    let price = parseInt(product.price)
    let quantity = parseInt(product.quantity)
    totSum = totSum + (price*quantity)
    totQuantity = totQuantity + quantity
  })

  return {
    type: FETCH_SUMMARY,
    quantity: totQuantity,
    sum: totSum
  }
}

export function addToShoppingcart(product, quantity) {
    return (dispatch) => {
            dispatch( addProduct(product, quantity))
            dispatch( summary(parseInt(quantity), parseInt(product.price)))
    }
}

export function removeFromShoppingcart(product) {
    return (dispatch) => {
            dispatch( deleteProduct(product))
            dispatch( summary(parseInt(product.quantity), parseInt(-product.price)))
    }
}

export function fetchShoppingcart(product) {
    return (dispatch) => {
            dispatch( fetchProducts())
            dispatch( fetchSummary())
    }
}
