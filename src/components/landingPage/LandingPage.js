import React, { Component } from 'react'


import { browserHistory } from 'react-router'

export default class LandingPage extends Component {

onClickWebshop() {
  browserHistory.push('/webshop')
}

onClickGallery() {
  browserHistory.push('/gallery')
}

onClickServices() {
  browserHistory.push('/services')
}

  render() {
    return (
      <div>
        <h3>LandingPage</h3>
        <button onClick={this.onClickWebshop.bind(this)}>Klicka här för webshop</button>
        <button onClick={this.onClickGallery.bind(this)}>Klicka här för galleri</button>
        <button onClick={this.onClickServices.bind(this)}>Klicka här för tjänster</button>
      </div>
    )
  }
}
