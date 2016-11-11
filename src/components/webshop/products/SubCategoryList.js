import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { replaceSpecialCharactersURLs, capitalizeFirstLetter } from '../../../utils/Utils'

require('styles/_webshopPage/products.css')

export default class SubCategoryList extends Component {

  onClick(subcategory, category) {

      subcategory = replaceSpecialCharactersURLs(subcategory)
      browserHistory.push('/webshop/'+category+'/'+subcategory)
  }

  render() {
    return (
      <div id="productlist1">
        <ul>
          {this.props.subcatItems.map((item, key) => {
            return <li
              onClick={this.onClick.bind(this, item.key, item.parent)}
              key={key}>{capitalizeFirstLetter(item.key)}</li>
          })}
        </ul>
      </div>
    )
  }
}
