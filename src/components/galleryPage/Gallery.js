import React, { Component } from 'react'

// import PhotoGrid from './PhotoGrid'
import Header from './Header.js'

require('styles/_galleryPage/gallery.css')

export default class Gallery extends Component {

  render() {
    return (
      <div>
        <Header></Header>
        // <PhotoGrid></PhotoGrid>
      </div>
    )
  }
}
