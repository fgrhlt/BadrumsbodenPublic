import React, { Component } from 'react'

import Header from './Header'
import Features from './Features'
import Footer from './Footer'

require('styles/_servicesPage/services.css')

export default class Services extends Component {

  render() {
    return (
      <div>
        <Header></Header>

        <Features></Features>

        <Footer></Footer>
      </div>
    )
  }
}
