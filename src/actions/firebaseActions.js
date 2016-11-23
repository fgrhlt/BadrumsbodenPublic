const FETCH_FIREBASE_DATA = 'FETCH_FIREBASE_DATA'
const DELETE_FIREBASE_DATA = 'DELETE_FIREBASE_DATA'

import firebase from 'firebase/app'

export function fetchFirebaseData(path, query, searchString) {
  var ref
  /* Get products in admin */
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
  else if(path=='gallery'){
    ref = firebase.database()
    .ref()
    .child('gallery')
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

export function deleteFirebaseElement(path, article) {
  var ref

  if(path=='products'){
    ref = firebase.database()
    .ref()
    .child('webshop/produkter/'+article.key)
    .remove()

    .then(() => {
      console.log('Database: deleted!')
      var storageRef = firebase.storage()
      .ref()
      .child('webshop/produkter/'+article.filename)
      .delete()

      console.log('Storage: deleted!')
    })
  } else if(path=='gallery'){
    ref = firebase.database()
    .ref()
    .child('gallery/'+article.key)
    .remove()

    .then(() => {
      console.log('Database: deleted!')
      var storageRef = firebase.storage()
      .ref()
      .child('gallery/'+article.filename)
      .delete()

      console.log('Storage: deleted!')
    })
  }

  return (dispatch) => {
    dispatch({
      type: DELETE_FIREBASE_DATA,
      folder: article.folder,
      productName: article.productName
    })
  }
}
