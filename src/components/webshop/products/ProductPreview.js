import React, { Component } from 'react'
import { browserHistory } from 'react-router'
require('../../../styles/_webshopPage/products.css')

export default class ProductPreview extends Component {

  onClick() {
    const { item } = this.props
    const { articleNr, category, subcategory } = item

    browserHistory.push('/webshop/'+category+'/'+subcategory+'/I/I/'+articleNr)
  }

  render() {
    const { item } = this.props
    const { articleNr, supplier, price, productName, url } = item
    let pricePlaceholder = price ? <span>{price }:-</span> : <span style={{fontStyle:'italic'}}>Välj variant</span>

    return (
      <div onClick={this.onClick.bind(this)}>
        <figure style={{backgroundImage: 'url(' + url + ')'}} />
        <h4>{productName}</h4>
        <span>{supplier}</span>
        <p>Art. {articleNr}</p>
        <div className="buy-btn">
          {pricePlaceholder}
          <span>Mer info</span>
        </div>
      </div>
    )
  }
}
