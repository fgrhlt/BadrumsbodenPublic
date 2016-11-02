import React, { Component } from 'react'
import GalleryElements from './GalleryElements'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as firebaseActions from '../../actions/firebaseActions'

require('firebase/storage')
require('styles/_galleryPage/gallery.css')

  class PhotoGrid extends Component {

  componentWillMount() {
    const { fetchFirebaseData } = this.props

    fetchFirebaseData('gallery', 'category', 'badrum')
    fetchFirebaseData('gallery', 'category', 'kok')

    this.state = {
      imagesBadrum: [],
      imagesKok: []
    }
  }

  componentWillReceiveProps(nextProps) {
    const { firebaseData } = nextProps

    this.setState({
      imagesBadrum: firebaseData['gallery/badrum'] ? firebaseData['gallery/badrum'].items : [],
      imagesKok: firebaseData['gallery/kok'] ? firebaseData['gallery/kok'].items : [],
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
          <GalleryElements items={this.state.imagesBadrum}/>

          <h3>Kök</h3>
          <GalleryElements items={this.state.imagesKok}/>
        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    firebaseData: state.firebaseReducer.firebaseData
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(firebaseActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoGrid)
