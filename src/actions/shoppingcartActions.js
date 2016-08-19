let nextTodoId = 0

const ADD_ARTICLE = 'ADD_ARTICLE'
const CREATE_SHOPPING_CART = 'CREATE_SHOPPING_CART'

export function addArticle(article, price) {
  return {
    type: ADD_ARTICLE,
    article,
    price
  }
}

export function createShoppingCart() {
  return {
    type: CREATE_SHOPPING_CART,
    id: 'productNr:'+nextTodoId++,
  }
}
