import React, { Component } from 'react'
import GalleryElements from './GalleryElements'

import axios from 'axios'

require('firebase/storage')
require('../../styles/_galleryPage/gallery.css')

export default  class PhotoGrid extends Component {

    componentWillMount() {
      this.state = {
        itemsbadrum: [],
        itemskok: []
      }

      this.fetchData('badrum')
      this.fetchData('kok')
    }

    fetchData(type) {
      let path = 'items'+type

      axios.get('/gallery/'+type)
      .then(function (response) {
        let urls = response.data.map( (item) => {
          return item.url
        })

        this.setState({
          [path]: urls
        })
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      })
    }

  render() {
    const { itemsbadrum, itemskok } = this.state

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
          <h2>Badrum</h2>
          <GalleryElements items={itemsbadrum}/>
        </div>

        <div className="container">
          <h2>Kök</h2>
          <GalleryElements items={itemskok}/>
        </div>
      </div>
    )
  }
}
