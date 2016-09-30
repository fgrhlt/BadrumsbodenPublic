import Immutable from 'seamless-immutable'

import { addToShoppingcart, createShoppingCart } from '../actions/shoppingcartActions'

const ADD_TO_SHOPPINGCART = 'ADD_TO_SHOPPINGCART'
const CREATE_SHOPPING_CART = 'CREATE_SHOPPING_CART'

const initialState = Immutable({
  sum: 0,
  quantity: 0
})

export default function shoppingcartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_SHOPPINGCART:
      return state
        .setIn(['products', action.articleNr], addArticle(action, state))

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

function createCart(action) {
  return {
    id: action.id,
  }
}
