import React, { Component } from 'react'

import Header from './Header'
import DropdownMenu from './DropdownMenu'
import Campaign from './Campaign'
import TopSellers from './TopSellers'
import Features from './Features'

require('styles/_webshopPage/webshop.css')

export default class Webshop extends Component {

  render() {
    return (
      <div>
        <Header></Header>
        <DropdownMenu></DropdownMenu>

        <Campaign></Campaign>

        <TopSellers></TopSellers>
        <Features></Features>
      </div>
    )
  }
}
