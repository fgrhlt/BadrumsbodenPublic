import React, { Component } from 'react'

import PhotoGrid from '../../components/gallery/PhotoGrid'
import Header from '../../components/gallery/Header'

export default class Gallery extends Component {

  render() {
    return (
      <div>
        <Header></Header>
        <PhotoGrid></PhotoGrid>
      </div>
    )
  }
}
