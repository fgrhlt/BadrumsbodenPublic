import React, { Component } from 'react'


import { browserHistory } from 'react-router'

export default class LandingPage extends Component {

onClickWebshop() {
  browserHistory.push('/webshop')
}

onClickGallery() {
  browserHistory.push('/gallery')
}

  render() {
    return (
      <div>
        <h3>LandingPage</h3>
        <button onClick={this.onClickWebshop.bind(this)}>Klicka här för webshop</button>
        <button onClick={this.onClickGallery.bind(this)}>Klicka här för galleri</button>
      </div>
    )
  }
}
