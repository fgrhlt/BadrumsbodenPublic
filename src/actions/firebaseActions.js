const FETCH_FIREBASE_DATA = 'FETCH_FIREBASE_DATA'
const DELETE_FIREBASE_DATA = 'DELETE_FIREBASE_DATA'
const UPDATE_DESCRIPTION = 'UPDATE_DESCRIPTION'
const FILTER_AND_FETCH_FIREBASE_PRODUCTS = 'FILTER_AND_FETCH_FIREBASE_PRODUCTS'
const SEARCH_AND_FETCH_FIREBASE_PRODUCTS = 'SEARCH_AND_FETCH_FIREBASE_PRODUCTS'

import firebase from 'firebase/app'

export function fetchFirebaseData(folder) {
  var ref = firebase.database()
  .ref()
  .child(folder)
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
        folder,
        items
      })
    })
  }
}

export function fetchSubcategories(folder) {
  var ref = firebase.database()
  .ref()
  .child(folder)
  return (dispatch) => {
    ref.once('value', (snapshot) => {
      var items = []
      // Loop through {objects} in order
      snapshot.forEach( (childSnapshot) => {
        //Get the key of object and push into object
        let firstLetterToUppercase = childSnapshot.key.charAt(0).toUpperCase() + childSnapshot.key.slice(1)
        items.push(firstLetterToUppercase)
      })
      dispatch({
        type: FETCH_FIREBASE_DATA,
        folder,
        items
      })
    })
  }
}

export function filterAndFetchFirebaseProducts(folder, articleNr) {
  var ref = firebase.database()
  .ref()
  .child(folder)
  .orderByChild('articleNr')
  .equalTo(articleNr)

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
        type: FILTER_AND_FETCH_FIREBASE_PRODUCTS,
        items
      })
    })
  }
}

export function searchAndFetchFirebaseProducts(productName) {
  var ref = firebase.database()
  .ref()
  .child('webshop/produkter')
  // .orderByChild('productName')
  // .equalTo(productName)
  //
  // ref.child('webshop/produkter/badrumsinredning')
  //    .orderByChild('productName')
  //    .equalTo('Katt2')
  //    .on('value', (snapshot) => {
  //       console.log(snapshot.val())
  //     })
  //
  // ref.child("studentList")
  //    .orderByChild("name")
  //    .equalTo("54ca2c11d1afc1612871624a")
  //    .on("child_added", function(snapshot) {
  //       console.log(snapshot.val());
  //     });


  return (dispatch) => {
    ref.once('value', (snapshot) => {
      snapshot.forEach( (childSnapshot) => {
        childSnapshot.forEach( (subchildSnapshot) => {
          var item = subchildSnapshot.val()
        })
      })
      dispatch({
        type: SEARCH_AND_FETCH_FIREBASE_PRODUCTS,
        item
      })
    })
  }
}

export function deleteFirebaseElement(product) {
  var databaseRef = firebase.database()
  .ref(product.folder+'/'+product.key)
  .remove()
  .then(() => {
    console.log('Database: '+product.folder+'/'+product.key, 'deleted!')
    var storageRef = firebase.storage()
    .ref()
    .child(product.folder+'/'+product.filename)
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
