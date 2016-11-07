import React, { Component } from 'react'
import { browserHistory } from 'react-router'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as firebaseActions from '../../actions/firebaseActions'

require('styles/_servicesPage/galleryPreview.css')

class GalleryPreview extends Component {

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

    let urlsBadrum = this.state.imagesBadrum.map( (item) => {
      return item.url
    })
    let urlsKok = this.state.imagesKok.map( (item) => {
      return item.url
    })

    this.setState({
      urlsBadrum,
      urlsKok
    })
  }

  onClickGallery() {
    browserHistory.push('/gallery')
  }

  render() {
  const { urlsBadrum, urlsKok } = this.state

  let urlsKok1 = urlsKok ? urlsKok : ''
  let urlsBadrum1 = urlsBadrum ? urlsBadrum : ''

    return (
      <div id="galleryPreview">
        <div id="lostGrid" onClick={this.onClickGallery.bind(this)}>

          <h2>Låt dig inspireras av bilder från våra projekt</h2>
          <section>
            <div>
              <div><figure style={{backgroundImage: 'url('+ urlsKok1[0]+')' }} /></div>
            </div>

            <div>
              <div><figure style={{backgroundImage: 'url('+ urlsKok1[1]+')'}} /></div>
              <div><figure style={{backgroundImage: 'url('+ urlsKok1[2]+')'}} /></div>
              <div><figure style={{backgroundImage: 'url('+ urlsKok1[3]+')'}} /></div>
            </div>
          </section>

          <section>
            <figure style={{backgroundImage: 'url('+ urlsBadrum1[0]+')'}} />
          </section>

          <section>
            <div>
              <div><figure style={{backgroundImage: 'url('+ urlsBadrum1[1]+')'}} /></div>
              <div><figure style={{backgroundImage: 'url('+ urlsBadrum1[2]+')'}} /></div>
            </div>

            <div>
              <div><figure style={{backgroundImage: 'url('+ urlsBadrum1[3]+')'}} /></div>
            </div>
          </section>
        </div>

        <a onClick={this.onClickGallery.bind(this)}>Till galleriet <figure /></a>
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log('state',state);
  return {
    firebaseData: state.firebaseReducer.firebaseData
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(firebaseActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GalleryPreview)
