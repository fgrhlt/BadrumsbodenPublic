import React, { Component } from 'react'
import ComponentTitle from '../ComponentTitle'
import ProductMenu from './ProductMenu'
import ProductTable from './ProductTable'

require('styles/_adminSimon/products/products.css')

export default class Products extends Component {

  render() {
    return (
      <div id="products">
        <ComponentTitle />

        <div id="container">
          <div>
            <ProductMenu />
          </div>

          <div>
            <ProductTable />
          </div>
        </div>
      </div>
    )
  }
}
