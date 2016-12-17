import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { replaceSpecialCharactersURLs, capitalizeFirstLetter } from '../../../utils/Utils'

require('../../../styles/_webshopPage/subCategoryList.css')

export default class SubCategoryList extends Component {

  onClick(subcategory, category) {
      browserHistory.push('/webshop/'+category+'/'+subcategory)
  }

  renderDivs(subcatItems) {

    // var names = ['Jake', 'Jon', 'Thruster'];
    //
    // var namesList = names.map(function(name){
    //                 return <li>{name}</li>;
    //               })
    //
    // return  <ul>{ namesList }</ul>

      for (var item in subcatItems[0]) {
        console.log('itemss', item);
        console.log('itemss2234', subcatItems[0][item]);

        return <li
          onClick={this.onClick.bind(this, item, subcatItems[0][item].parent)}
          key={key}
          className={subcat == replaceSpecialCharactersURLs(item) ? "active" : null}>
          {subcatItems[0][item].name}</li>
      }

      // subcatItems.forEach((item, key) => {
      //   let objkey = Object.keys(item)
      //   console.log('objs', objkey);
      //   console.log('item', item);
      //   console.log('sdfs', item[objkey]);
      //
      //   return <li
      //     onClick={this.onClick.bind(this, objkey, item[objkey].parent)}
      //     key={key}
      //     className={subcat == replaceSpecialCharactersURLs(objkey) ? "active" : null}>
      //     {item[objkey].name}</li>
      // })
  }

  render() {
    const { params, subcatItems } = this.props
    const subcat = params ? params.subcategory : null
    //item.key => aggregat
    //item.parent => bastu
    //item.name => Aggregat

    // {
    //   this.props.subcatItems.map((item, key) => {
    //     return <li
    //       onClick={this.onClick.bind(this, item.key, item.parent)}
    //       key={key}
    //       className={subcat == replaceSpecialCharactersURLs(item.key) ? "active" : null}>
    //       {item.name}</li>
    //     })
    // }

    // subcatItems.forEach((item, key) => {
    //   let objkey = Object.keys(item)
    //   console.log('objs', objkey);
    //   console.log('item', item);
    //   console.log('sdfs', item[objkey]);
    //
    //   return <li
    //     onClick={this.onClick.bind(this, objkey, item[objkey].parent)}
    //     key={key}
    //     className={subcat == replaceSpecialCharactersURLs(objkey) ? "active" : null}>
    //     {item[objkey].name}</li>
    // })
    return (
      <div id="subCategoryList">
      <ul>
        {this.renderDivs(subcatItems)}
      </ul>
      </div>
    )
  }
}
