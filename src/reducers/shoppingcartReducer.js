import Immutable from 'seamless-immutable'

import { addArticle } from '../actions/shoppingcartActions'
import { createShoppingCart } from '../actions/shoppingcartActions'

const ADD_ARTICLE = 'ADD_ARTICLE'
const CREATE_SHOPPING_CART = 'CREATE_SHOPPING_CART'

const initialState = Immutable({
  sum: 0,
  price: 0
})

export default function shoppingcartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ARTICLE:
      return state
        .set(action.id, addArticle2(action))
    case CREATE_SHOPPING_CART:
      return state
        .set(action.id, createShoppingCart2(action))
  }
  return state
}

function addArticle2(action) {
  return {
    id: action.id,
    article: action.article,
    price: action.price
  }
}

function createShoppingCart2(action) {
  return {
    id: action.id,
  }
}
