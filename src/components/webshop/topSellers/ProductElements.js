import React, { Component } from 'react'

import TopSellerProduct from './TopSellerProduct'
require('../../../styles/_webshopPage/products.css')

export default class ProductElements extends Component {

  render() {
    return (
      <div id="productListTopSellers">
        {this.props.items.map((item) => {
          return <TopSellerProduct
            key={item.key}
            item={item}
            />
        })}
      </div>
    )
  }
}
