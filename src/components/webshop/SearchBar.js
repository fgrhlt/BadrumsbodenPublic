import React, { Component } from 'react'
import { browserHistory } from 'react-router'

export default class Webshop extends Component {

searchProducts() {
  console.log('this', this);

  let inputText = 'katt1'

  if (inputText) {
    browserHistory.push('/webshop/searchQuery/'+inputText)
  }
}

  render() {
    return (
      <div className="searchBar">
        <input type="text" placeholder="Vad söker du efter?"></input>
        <img onClick={this.searchProducts.bind(this)} src="assets/buttons/search_button.svg"></img>
      </div>
    )
  }
}

// Man skriver input
//   onClick
//     spara input i this.state
//     browserHistory.push(searchQuery/input)
//
//     Product renderas med params = :category/:subcategory
//
//       Product.js
//         searchAndFetchFirebaseProducts(subcategory)
