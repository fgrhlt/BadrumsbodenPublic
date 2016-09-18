import React, { Component } from 'react'

import ProductPreview from './ProductPreview'
require('styles/_webshopPage/products.css')

export default class GalleryElements extends Component {

  render() {
    return (
      <div>

        {this.props.items.map( (item) => {
          return <ProductPreview key={item.key} item={item}/>
        })}

      </div>
    )
  }
}
