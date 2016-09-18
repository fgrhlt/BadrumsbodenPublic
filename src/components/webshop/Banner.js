import React, { Component } from 'react'

require('styles/_webshopPage/banner.css')

export default class Banner extends Component {

  render() {
    return (
      <div id="banner">
        <div>
          <h3>Köp nu, betala i slutet av augusti! <span>0% ränta</span></h3>
          <p>Endast en erläggningsavgift på 29:- tillkommer</p>
        </div>
      </div>
    )
  }
}
