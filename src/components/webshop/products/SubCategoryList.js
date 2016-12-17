import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { replaceSpecialCharactersURLs, capitalizeFirstLetter } from '../../../utils/Utils'

require('../../../styles/_webshopPage/subCategoryList.css')

export default class SubCategoryList extends Component {

  onClick(subcategory, category) {
      browserHistory.push('/webshop/'+category+'/'+subcategory)
  }

  renderDivs(subcatItems, subcat, category) {

    let categoryList = []
    for (var item in subcatItems) {
      if (item != '_id') {
        if (subcatItems[item].parent==category) {
          categoryList.push(<li
                              onClick={this.onClick.bind(this, item, subcatItems[item].parent)}
                              key={item}
                              className={subcat == replaceSpecialCharactersURLs(item) ? "active" : null}>
                              {subcatItems[item].name}
                            </li>)
        }
      }
    }
    return categoryList
  }

  render() {
    const { params, subcatItems } = this.props
    const { subcategory, category } = params
    const subcat = params ? subcategory : null

    return (
      <div id="subCategoryList">
      <ul>
        {this.renderDivs(subcatItems, subcat, category)}
      </ul>
      </div>
    )
  }
}
