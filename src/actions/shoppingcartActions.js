let nextTodoId = 0

const ADD_TO_SHOPPINGCART = 'ADD_TO_SHOPPINGCART'
const CREATE_SHOPPING_CART = 'CREATE_SHOPPING_CART'

export function addToShoppingcart(product) {
  return {
    type: ADD_TO_SHOPPINGCART,
    articleNr: product.articleNr,
    product: product,
  }
}

export function createShoppingCart() {
  return {
    type: CREATE_SHOPPING_CART,
    id: 'productNr:'+nextTodoId++,
  }
}
