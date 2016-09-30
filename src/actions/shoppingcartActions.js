let nextTodoId = 0

const CREATE_SHOPPING_CART = 'CREATE_SHOPPING_CART'
const ADD_PRODUCT = 'ADD_PRODUCT'
const ADD_SUMMARY = 'ADD_SUMMARY'

export function addProduct(product) {
  return {
    type: ADD_PRODUCT,
    articleNr: product.articleNr,
    product: product,
  }
}

export function addSummary(product) {
  return {
    type: ADD_SUMMARY,
    product: product
  }
}

export function addToShoppingcart(product) {
    return (dispatch) => {
            dispatch( addProduct(product))
            dispatch( addSummary(product))
    }
}

export function fetchFirebaseData(folder, articleNr) {
  var ref = firebase.database()
  .ref()
  .child(folder)
  return (dispatch) => {
    ref.on('value', (snapshot) => {
      var items = []
      // Loop through {objects} in order
      snapshot.forEach( (childSnapshot) => {
        //The object
        var item = childSnapshot.val()
        //Get the key of object and push into object
        item['key'] = childSnapshot.key
        //Push object to array with items
        items.push(item)
      })
      dispatch({
        type: FETCH_FIREBASE_DATA,
        folder,
        items
      })
    })
  }
}
