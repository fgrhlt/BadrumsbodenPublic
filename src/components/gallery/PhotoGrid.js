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
              Låt dig inspireras av några av de badrum vi renoverat.
              Allt är utfört av vår egen personal, såväl VVS-arbeten som kakelsättning och mattläggning.
              Inredningen är naturligtvis från vår webbshop.
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
