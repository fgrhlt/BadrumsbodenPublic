import React, { Component } from 'react'
import GalleryElements from './GalleryElements'

import firebase from 'firebase/app'
require('firebase/database')
//require('firebase/auth')//TODO: byt ut dessa sedan

require('styles/_galleryPage/gallery.css')

export default class Admin extends Component {

  componentWillMount() {
    var config = {
      apiKey: 'AIzaSyBeGWRwqSxQ3gyK48cgfStz1xJuPoN7YZE',
      authDomain: 'badrumsboden.firebaseapp.com',
      databaseURL: 'https://badrumsboden.firebaseio.com',
      storageBucket: 'badrumsboden.appspot.com'
    }

    this.state = {
      items: []
    }

    firebase.initializeApp(config)
    this.loadFromDB()
  }

  componentDidMount() {
    this.uploadtoStorage()
  }

  // componentWillUnmount() {
  //     this.firebaseRef.off()
  //   }

  uploadtoStorage() {
    var fileButton = document.getElementById('fileButton')
    //Listen for selection
    fileButton.addEventListener('change', (e) => {
      var file = e.target.files[0]

      // Create a root reference
      var storageRef = firebase.storage().ref()

      //Point to child folder of root and its filename
      var uploadTask = storageRef.child('images/' + file.name)
      //Upload file (and metadata)
      var task = uploadTask.put(file)

      console.log('Uploading file', file.name )

      task.on('state_changed', (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // See below for more detail
      }, (error) => {
        // Handle unsuccessful uploads
      }, () => {
        // Handle successful uploads on complete
        console.log('Upload successful!')

        //Push URL to database
        console.log('Uploading imageURLs to DB', file.name )

        firebase.database().ref().child('imageURLs')
          .push({
            url: task.snapshot.downloadURL,
            name: file.name
          })
      })
    })
  }

  loadFromDB() {
    var ref = firebase.database().ref('imageURLs')
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

          this.setState({
            items: items
          })
        })
    }

  deleteElement(entry, entries, i) {

    if (!confirm('Vill du ta bort bilden?')) {
      return
    }

    //Storage for assets; images, videos etc.
    var storageFolder = 'images'
    var storageKey = entry.name

    //Storage for JSON data; tree-structured textfiles.
    var databaseFolder = 'imageURLs'
    var databaseKey = Object.keys(this.state.entries)[i]

    console.log('Deleting storageKey', storageKey)
    // Create a reference to the file to delete file
    var storageRef = firebase.storage().ref()
    var storageFolderRef = storageRef.child(storageFolder)
    storageFolderRef
      .child(storageKey)
      .delete()
      .then(() => {

      // File deleted successfully
      var databaseRef = firebase.database().ref() // ./
      var databaseFolderRef = databaseRef.child(databaseFolder) // ./imageURLs/
      console.log('Deleting databaseKey', databaseKey)

      databaseFolderRef
        .child(databaseKey) // ./imageURLs/key
        .remove()

      console.log('File deleted!')
    }).catch( (error) => {
      console.error()
    })
  }

  updateDescription(entry, entries, i) {

    //Storage for JSON data; tree-structured textfiles.
    var databaseFolder = 'imageURLs'
    var databaseKey = Object.keys(this.state.entries)[i]
    var description = 'descriptionInput'

    console.log('Updating description at', databaseKey)

    var databaseRef = firebase.database().ref() // ./
    var databaseFolderRef = databaseRef.child(databaseFolder) // ./imageURLs/
    console.log('Deleting databaseKey', databaseKey)

    //Pusha upp data

  }


  render() {
    return (
      <div>
        <div>
          <input value="" style={{backgroundColor: 'lightgrey'}} type="file" id="fileButton"></input>
        </div>

        <GalleryElements items={this.state.items}/>

      </div>
    )
  }
}
