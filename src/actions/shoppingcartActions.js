import cookie from 'react-cookie'
import firebase from 'firebase/app'

const ADD_PRODUCT = 'ADD_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const UPDATE_QUANTITY = 'UPDATE_QUANTITY'
const FETCH_SUMMARY = 'FETCH_SUMMARY'

export function addProduct(product, quantity1) {
  let productCookie =  cookie.load('product'+product.articleNr)
  if (!productCookie) {
    productCookie = { articleNr: product.articleNr, quantity: 0 }
  }

  let object = {
    articleNr: product.articleNr,
    quantity: parseInt(quantity1) + parseInt(productCookie.quantity)
  }

  let stringObj=JSON.stringify(object)
  var d = new Date()
  d.setTime(d.getTime() + (2*24*60*60*1000))
  cookie.save('product'+product.articleNr, stringObj, { path: '/', expires: d })

  return {
    type: ADD_PRODUCT,
    info: 'added_product'
  }
}

export function updateArticleQuantity(i, articleNr, quantity) {
  let cookieObj = cookie.load('product'+articleNr)

  let object = {
    quantity: parseInt(cookieObj.quantity) + parseInt(quantity),
    articleNr: articleNr
  }

  let stringObj=JSON.stringify(object)
  var d = new Date()
  d.setTime(d.getTime() + (2*24*60*60*1000))
  cookie.save('product'+articleNr, stringObj, { path: '/', expires: d })

  return {
    type: UPDATE_QUANTITY,
    articleNr,
    quantity: object
  }
}

export function deleteProduct(articleNr) {
  cookie.remove('product'+articleNr, { path: '/'})

  return {
    type: DELETE_PRODUCT,
    info: 'deleted_Product'
  }
}

export function updateSummary(quantity1, price) {
  if (price=='reset') {
    return {
      type: FETCH_SUMMARY,
      quantity: 0,
      sum: 0
    }
  } else {
    price = parseInt(price)
    let cookieObj = cookie.load('summary')
    if (!cookieObj) {
      cookieObj = { quantity: 0, sum: 0 }
    }

    let objQuantity = parseInt(cookieObj.quantity) + quantity1
    let objSum = parseInt(cookieObj.sum) + parseInt(price*quantity1)

    let object = {
      quantity: objQuantity < 0 ? 0 : objQuantity,
      sum: objSum < 0 ? 0 : objSum
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

export function removeFromShoppingcart(product, price) {
  return (dispatch) => {
    dispatch( deleteProduct(product.articleNr))
    dispatch( updateSummary(parseInt(-product.quantity), price))
  }
}

export function updateQuantity(i, product, quantity) {
  return (dispatch) => {
    dispatch( updateArticleQuantity(i, product.articleNr, quantity))
    dispatch( updateSummary(parseInt(quantity), parseInt(product.price)))
  }
}
