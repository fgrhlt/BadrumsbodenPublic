import React, { Component } from 'react'

import ProductPreview from './ProductPreview'
require('styles/_webshopPage/products.css')

export default class ProductElements extends Component {

  render() {

    console.log('items',this.props.items);
    return (
      <div id="productlist1">

        {this.props.items.map((item) => {
          return <ProductPreview key={item.key} item={item}/>
        })}

      </div>
    )
  }
}
