
const ADD_ARTICLE = 'ADD_ARTICLE'

export function loadFirebaseData(article, price) {
  return {
    type: ADD_ARTICLE,
    article,
    price
  }
}
