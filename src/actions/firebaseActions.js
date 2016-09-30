const FETCH_FIREBASE_DATA = 'FETCH_FIREBASE_DATA'
const DELETE_FIREBASE_DATA = 'DELETE_FIREBASE_DATA'
const UPDATE_DESCRIPTION = 'UPDATE_DESCRIPTION'
const FILTER_AND_FETCH_FIREBASE_PRODUCTS = 'FILTER_AND_FETCH_FIREBASE_PRODUCTS'

import firebase from 'firebase/app'

// require('firebase/database')
// require('firebase/storage')

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

export function filterAndFetchFirebaseProducts(folder, product) {
  var ref = firebase.database()
  .ref()
  .child(folder)
  .orderByChild('articleNr')
  .equalTo(product)

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
        type: FILTER_AND_FETCH_FIREBASE_PRODUCTS,
        items
      })
    })
  }
}

export function deleteFirebaseElement(folder, key, name) {
  return (dispatch) => {
    var DBref = firebase.database()
    .ref(folder+key)
    .remove()
    .then(() => {
      console.log('Database: '+folder+key, 'deleted!')
      var storageRef = firebase.storage().ref()
      var storageRef2 = storageRef.child(folder+name)
      storageRef2.delete()
      console.log('Storage: '+folder+name, 'deleted!')
    })
    dispatch({
      type: DELETE_FIREBASE_DATA,
      folder,
      key,
      name
    })
  }
}

export function updateDescription(folder, key, articleNr, supplier, productName, description) {
  return (dispatch) => {

    var updates = {}
    //updates['price'] = price
    //updates['title'] = title
    updates['articleNr'] = articleNr
    updates['supplier'] = supplier
    updates['productName'] = productName
    updates['description'] = description

    var DBref = firebase.database()
    .ref(folder+key)
    .update(updates)

    dispatch({
      type: UPDATE_DESCRIPTION,
    })
  }
}
