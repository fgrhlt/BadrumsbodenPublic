import Immutable from 'seamless-immutable'

import { addToShoppingcart, createShoppingCart } from '../actions/shoppingcartActions'

const CREATE_SHOPPING_CART = 'CREATE_SHOPPING_CART'
const ADD_PRODUCT = 'ADD_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const UPDATE_QUANTITY = 'UPDATE_QUANTITY'
const FETCH_PRODUCTS = 'FETCH_PRODUCTS'
const FETCH_SUMMARY = 'FETCH_SUMMARY'

const initialState = Immutable({
  summary: {
    sum: 0,
    quantity: 0
  }
})

export default function shoppingcartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT:
      return state
        .set(('info'), action.info)

    case FETCH_PRODUCTS:
      return state
        .set(('products'), action.products)

    case DELETE_PRODUCT:
      return state
        .setIn(['products', /*action.articleNr*/], /*undefined*/)

    case FETCH_SUMMARY:
      return state
        .set('summary', fetchSum(action, state))

    case CREATE_SHOPPING_CART:
      return state
        .set(action.id, createCart(action))

    case UPDATE_QUANTITY:
      return state.
        set('summary', fetchSum(action, state))
  }
  return state
}

function addArticle(action) {
  return {
    product: action.product
  }
}

function fetchSum(action, state) {
  return {
      sum: action.sum,
      quantity: action.quantity
  }
}

function createCart(action) {
  return {
    id: action.id,
  }
}
