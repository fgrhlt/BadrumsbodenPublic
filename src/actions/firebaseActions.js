const FETCH_FIREBASE_DATA = 'FETCH_FIREBASE_DATA'
const DELETE_FIREBASE_DATA = 'DELETE_FIREBASE_DATA'
const UPDATE_DESCRIPTION = 'UPDATE_DESCRIPTION'

import firebase from 'firebase/app'

export function fetchFirebaseData(path, query, searchString) {
  var ref

  if(path=='products'){
    ref = firebase.database()
    .ref()
    .child('webshop/produkter')
    .orderByChild(query)
    .equalTo(searchString)
  }
  else if(path=='categories'){
    ref = firebase.database()
    .ref()
    .child('webshop/categories')
    .orderByChild(query)
    .equalTo(searchString)

    path = path+'/'+searchString
  }
  else {
    ref = firebase.database()
    .ref()
    .child(path)
  }

  return (dispatch) => {
    ref.once('value', (snapshot) => {
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
        folder: path,
        items
      })
    })
  }
}

export function deleteFirebaseElement(product) {
  console.log(product.key);
  var databaseRef = firebase.database()
  .ref()
  .child('webshop/produkter/'+product.key)
  .remove()

  .then(() => {
    console.log('Database: '+product.folder+'/'+product.key, 'deleted!')
    var storageRef = firebase.storage()
    .ref()
    .child('webshop/produkter/'+product.filename)
    .delete()

    console.log('Storage: '+product.folder+'/'+product.filename, 'deleted!')
  })

  return (dispatch) => {
    dispatch({
      type: DELETE_FIREBASE_DATA,
      folder: product.folder,
      productName: product.productName
    })
  }
}
