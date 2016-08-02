import React, { Component } from 'react'

import DropdownMenu from './DropdownMenu'
import Header from './Header'
import Features from './Features'

require('styles/_webshopPage/webshop.css')

export default class Webshop extends Component {

  render() {
    return (
      <div>
        <Header></Header>

        <DropdownMenu></DropdownMenu>

        <Features></Features>
      </div>
    )
  }
}
