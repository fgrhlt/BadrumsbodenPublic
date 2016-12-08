import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { replaceSpecialCharactersURLs, capitalizeFirstLetter } from '../../../utils/Utils'

require('../../../styles/_webshopPage/subCategoryList.css')

export default class SubCategoryList extends Component {

  onClick(subcategory, category) {
      browserHistory.push('/webshop/'+category+'/'+subcategory)
  }

  render() {
    const subcat = this.props.params ? this.props.params.subcategory : null
    return (
      <div id="subCategoryList">
        <ul>
          {this.props.subcatItems.map((item, key) => {
            return <li
              onClick={this.onClick.bind(this, item.key, item.parent)}
              key={key}
              className={subcat == replaceSpecialCharactersURLs(item.key) ? "active" : null}>
              {item.name}</li>
          })}
        </ul>
      </div>
    )
  }
}
