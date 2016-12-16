import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { replaceSpecialCharactersURLs, capitalizeFirstLetter } from '../../../utils/Utils'

require('../../../styles/_webshopPage/subCategoryList.css')

export default class SubCategoryList extends Component {

  onClick(subcategory, category) {
      browserHistory.push('/webshop/'+category+'/'+subcategory)
  }

  render() {
    const { params, subcatItems } = this.props
    const subcat = params ? params.subcategory : null
    console.log('subcatItems', subcatItems);
    // {
    //   this.props.subcatItems.map((item, key) => {
    //     return <li
    //       onClick={this.onClick.bind(this, item.key, item.parent)}
    //       key={key}
    //       className={subcat == replaceSpecialCharactersURLs(item.key) ? "active" : null}>
    //       {item.name}</li>
    //     })
    // }
    return (
      <div id="subCategoryList">
        <ul>
          {
            subcatItems.forEach((item, key) => {
              return <li
                onClick={this.onClick.bind(this, item, item.parent)}
                key={key}
                className={subcat == replaceSpecialCharactersURLs(item) ? "active" : null}>
                {item.name}</li>
            })
          }
        </ul>
      </div>
    )
  }
}
