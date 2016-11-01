import React, { Component } from 'react'
import GalleryElements from './GalleryElements'
import firebase from 'firebase/app'
require('firebase/storage')
require('styles/_galleryPage/gallery.css')

export default class PhotoGrid extends Component {

  componentWillMount() {
    this.state = {
      items: []
    }
    this.loadFromDB('gallery', 'imageURLs')
  }

  loadFromDB(path1, path2) {
      var ref = firebase.database()
        .ref(path1)
        .child(path2)

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

  render() {
    return (
      <div id="gallery">
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
          <GalleryElements items={this.state.items}/>
        </div>
      </div>
    )
  }
}
