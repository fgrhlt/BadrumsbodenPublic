import React, { Component } from 'react'
import { browserHistory } from 'react-router'
require('../../../styles/_webshopPage/products.css')

export default class TopSellerProduct extends Component {

  onClick() {
    const { item } = this.props
    const { articleNr, category, subcategory } = item

    browserHistory.push('/webshop/'+category+'/'+subcategory+'/I/I/'+articleNr)
  }

  render() {
    const { item } = this.props
    const { supplier, price, productName, url } = item

    return (
      <div onClick={this.onClick.bind(this)}>
        <figure style={{backgroundImage: 'url(' + url + ')'}} />
        <h4>{productName}</h4>
        <p>{supplier}</p>
        <span>{price}:-</span>
      </div>
    )
  }
}
