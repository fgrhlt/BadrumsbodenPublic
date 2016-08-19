import React, { Component } from 'react'
import GalleryElements from './GalleryElements'

import firebase from 'firebase/app'
require('firebase/database')
//require('firebase/auth')//TODO: byt ut dessa sedan

require('styles/_galleryPage/gallery.css')

var counter = 0;
export default class Admin extends Component {

  componentWillMount() {
    var config = {
      apiKey: "AIzaSyBQnvDISWtShRbrtheOm2uvAP_iGie6sGM",
      authDomain: "badrumsboden-c7b46.firebaseapp.com",
      databaseURL: "https://badrumsboden-c7b46.firebaseio.com",
      storageBucket: "badrumsboden-c7b46.appspot.com",
    }

    this.state = {
      galleryItems: [],
      campaignItems: []
    }

    firebase.initializeApp(config)
    var database = firebase.database()
    this.loadFromDBGallery( 'gallery',  'imageURLs')
    this.loadFromDBCampaign('campaign', 'imageURLs')

  }

  componentDidMount() {
    this.uploadFiles('fileButtonGallery', 'gallery/images', 'gallery/imageURLs')
    this.uploadFiles('fileButtonCampaign', 'campaign/images', 'campaign/imageURLs')
    // this.uploadFiles('fileButtonTopSellers', 'topSellers/images', 'topSellers/imageURLs')
    // this.uploadFiles('fileButtonAssortment', 'assortment/images', 'assortment/imageURLs')
  }

  // componentWillUnmount() {
  //     this.firebaseRef.off()
  //   }

  loadFromDBGallery(databaseFolderRoot, databaseFolderChild) {
    var ref = firebase.database()
      .ref(databaseFolderRoot)
      .child(databaseFolderChild)

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
            galleryItems: items
          })

        })
    }

  loadFromDBCampaign(databaseFolderRoot, databaseFolderChild) {
    var ref = firebase.database()
      .ref(databaseFolderRoot)
      .child(databaseFolderChild)

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
            campaignItems: items
          })

        })
    }

  uploadFiles(buttonID, storageFolderPath, databaseFolderPath) {
      var fileButton = document.getElementById(buttonID)
      //Listen for selection
      fileButton.addEventListener('change', (e) => {
        var file = e.target.files[0]

        // Create a root reference
        var storageRef = firebase.storage().ref()
        counter ++
        var filename = file.name+counter
        //Point to child folder of root and its filename
        var uploadTask = storageRef.child(storageFolderPath + filename)
        //Upload file (and metadata)
        var task = uploadTask.put(file)

        console.log('Uploading file', file.name, 'to', storageFolderPath)

        task.on('state_changed', (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // See below for more detail
        }, (error) => {
          // Handle unsuccessful uploads
        }, () => {
          // Handle successful uploads on complete
          console.log('Upload successful!')

          //Push URL to database
          console.log('Uploading imageURL', file.name, 'to', databaseFolderPath )
          console.log('--------------------')
          firebase.database().ref().child(databaseFolderPath)
            .push({
              url: task.snapshot.downloadURL,
              name: file.name,
              description: ''
            })
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

        <div style={{border: 'dotted'}} className="galleryDiv">
          <h1>Gallery</h1>
          <input value="" style={{backgroundColor: 'lightgrey'}} type="file" id="fileButtonGallery"></input>
          <GalleryElements items={this.state.galleryItems}/>
        </div>

        <div style={{border: 'dotted'}} className="galleryDiv">
          <h1>Campaign</h1>
          <input value="" style={{backgroundColor: 'lightgrey'}} type="file" id="fileButtonCampaign"></input>
          <GalleryElements items={this.state.campaignItems}/>
        </div>

      </div>
    )
  }
}
