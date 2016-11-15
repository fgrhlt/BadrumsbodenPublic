import React, { Component } from 'react'

import ProductElements from './ProductElements'
require('../../../styles/_webshopPage/topSellers.css')

export default class TopSellers extends Component {

  render() {
    return (
      <div id="topSellers">
        <h4>Toppsäljare</h4>

        <div id="topSellersProducts">
          <ProductElements items={this.props.items}/>
        </div>
      </div>
    )
  }
}
