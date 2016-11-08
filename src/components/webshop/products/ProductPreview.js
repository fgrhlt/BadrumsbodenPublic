import React, { Component } from 'react'
import { browserHistory } from 'react-router'
require('styles/_webshopPage/products.css')

export default class ProductPreview extends Component {

  onClick() {
    const { item } = this.props
    const { folder, articleNr, category, subcategory } = item

    let path = ''
    browserHistory.listen( (event) => {
      path = event.pathname
    })
    console.log('/webshop/'+category+'/'+subcategory+'/'+articleNr);
    browserHistory.push('/webshop/'+category+'/'+subcategory+'/'+articleNr)


    //browserHistory.push(category+'/'+subcategory+'/'+articleNr)
  }

  render() {
    const { item } = this.props
    const { articleNr, price, description, productName, supplier, url } = item

    return (
      <div onClick={this.onClick.bind(this)}>
        <figure style={{backgroundImage: 'url(' + url + ')'}} />
        <h4>{productName}</h4>
        <p>{description}</p>
        <div className="buy-btn">
          <span>{price}:-</span>
          <span>Mer info</span>
        </div>
      </div>
    )
  }
}
