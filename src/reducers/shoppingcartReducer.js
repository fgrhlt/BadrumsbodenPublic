import Immutable from 'seamless-immutable'

import { addToShoppingcart, createShoppingCart } from '../actions/shoppingcartActions'

const CREATE_SHOPPING_CART = 'CREATE_SHOPPING_CART'
const ADD_PRODUCT = 'ADD_PRODUCT'
const ADD_SUMMARY = 'ADD_SUMMARY'

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
        .setIn(['products', action.articleNr], addArticle(action, state))
    case ADD_SUMMARY:
      return state
        .set('summary', calculateSums(action, state))

    case CREATE_SHOPPING_CART:
      return state
        .set(action.id, createCart(action))
  }
  return state
}

function addArticle(action, state) {
  return {
    product: action.product
  }
}

function calculateSums(action, state) {
  return {
      sum: parseInt(state.summary.sum) + parseInt(action.product.price),
      quantity: parseInt(state.summary.quantity)+1
  }
}

function createCart(action) {
  return {
    id: action.id,
  }
}
