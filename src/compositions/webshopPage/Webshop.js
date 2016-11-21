import React, { Component } from 'react'

import Header from '../../components/webshop/Header'
import DropdownMenu from '../../components/webshop/DropdownMenu'
import Footer from '../../components/webshop/Footer'

require('styles/_webshopPage/webshop.css')

export default class Webshop extends Component {

  render() {
    return (
      <div>
        <Header></Header>
        <DropdownMenu params={this.props.params}></DropdownMenu>
        { React.cloneElement(this.props.children, this.props) }
        <Footer></Footer>
      </div>
    )
  }
}
