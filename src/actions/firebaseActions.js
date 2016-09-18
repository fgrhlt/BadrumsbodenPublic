const FETCH_FIREBASE_DATA = 'FETCH_FIREBASE_DATA'
const DELETE_FIREBASE_DATA = 'DELETE_FIREBASE_DATA'
const UPDATE_DESCRIPTION = 'UPDATE_DESCRIPTION'

require('firebase/database')
require('firebase/storage')

export function fetchFirebaseData(folder) {
  var ref = firebase.database()
  .ref()
  .child(folder)
  .child('imageURLs')

  return (dispatch) => {
    ref.on('value', (snapshot) => {
      var items = []
      // Loop through imageURLs/{objects} in order
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

export function deleteFirebaseElement(folder, key, name) {
  return (dispatch) => {
    var DBref = firebase.database()
    .ref(folder+'imageURLs/'+key)
    .remove()
    .then(() => {
      console.log('Database: '+folder+'imageURLs/'+key, 'deleted!')
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

export function updateDescription(folder, key, name, description, price, title, articleNr) {
  return (dispatch) => {

    var updates = {}
    updates['description'] = description
    updates['price'] = price
    updates['title'] = title
    updates['articleNr'] = articleNr

    var DBref = firebase.database()
    .ref(folder+'imageURLs/'+key)
    .update(updates)

    dispatch({
      type: UPDATE_DESCRIPTION,
    })
  }
}
