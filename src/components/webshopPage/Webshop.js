import React, { Component } from 'react'

import Header from './Header'
import DropdownMenu from './DropdownMenu'
import Campaign from './Campaign'
import TopSellers from './TopSellers'
import InfoBank from './InfoBank'
import ProductView from './ProductView'
import Products from './Products'
import Banner from './Banner'
import Features from './Features'
import Checkout from './Checkout'
import Footer from './Footer'

require('styles/_webshopPage/webshop.css')

export default class Webshop extends Component {

  render() {
    return (
      <div>
        <Header></Header>
        <DropdownMenu></DropdownMenu>

        <Campaign></Campaign>
        {/* }<TopSellers></TopSellers> {*/}
        {/* }<InfoBank></InfoBank>{*/}
        {/* }<ProductView></ProductView>{*/}
        <Products></Products>
        {/* }<Checkout></Checkout>{*/}

        <Banner></Banner>

        <Features></Features>

        <Footer></Footer>
      </div>
    )
  }
}
