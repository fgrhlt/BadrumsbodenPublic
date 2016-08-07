import React, { Component } from 'react'

import Modal from 'react-modal'

import firebase from 'firebase/app'
require('firebase/storage')

export default class PhotoGrid extends Component {

  componentWillMount() {
    var config = {
      apiKey: 'AIzaSyBeGWRwqSxQ3gyK48cgfStz1xJuPoN7YZE',
      authDomain: 'badrumsboden.firebaseapp.com',
      databaseURL: 'https://badrumsboden.firebaseio.com',
      storageBucket: 'badrumsboden.appspot.com'
    }
    firebase.initializeApp(config)

    this.state = {
      open: false,
      val: ''
    }

    this.getImages()


    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  openModal () {
    this.setState({open: true})
  }

  closeModal () {
    this.setState({open: false})
  }

  getImages() {
    var storage = firebase.storage()
    var storageRef = storage.ref()
    // Create a reference to the file we want to download
    var starsRef = storageRef.child('images/')
    var imgUrl = ''

    console.log('starsRef', starsRef)
    // Get the download URL
    starsRef.getDownloadURL().then( (url) => {
      // Insert url into an <img> tag to "download"
      this.setState({val: url})

      }).catch(function(error) {
      switch (error.code) {
        case 'storage/object_not_found':
          // File doesn't exist
          break
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break
        case 'storage/canceled':
          // User canceled the upload
          break
        case 'storage/unknown':
          // Unknown error occurred, inspect the server response
          break
      }
    })
  }

  render() {
    return (
      <div>
        <div>
          <Modal
            isOpen={this.state.open}
            onRequestClose={this.closeModal}
            shouldCloseOnOverlayClick={true}
            className="ModalClass"
            overlayClassName="OverlayClass">

            <h1>Basic Modal</h1>
            <button onClick={this.closeModal}>Close</button>


          </Modal>
        </div>

        <div id="info">
          <div>
            <h2>Galleri</h2>
            <p>
              Här kommer ett urval av senaste badrumsrenoveringar och installationer.
              Vi hoppas att ni finner inspiration av dessa produkter och köper allt vi har att erbjuda.
              Bilderna är tagna från google och är inget vi har gjort själv,
              men vi gör förhoppningsvis någonting som är likvärdigt!
            </p>
          </div>
        </div>

        <div className="container">
          <h3>Badrum</h3>
          <section>
            <div>
              <figure>
                <img src={this.state.val || ''} alt="" />
              </figure>
            </div>
          </section>
        </div>

      </div>
    )
  }
}
