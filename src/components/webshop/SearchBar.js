import React, { Component } from 'react'
import { browserHistory } from 'react-router'

require('styles/_webshopPage/searchBar.css')

export default class SearchBar extends Component {

  componentWillMount() {
    this.state = {
      inputText: ''
    }
  }

  onChange(event) {

    this.state = {
      inputText: event.target.value
    }

    this.searchProducts()
  }

  searchProducts() {
    if (this.state.inputText.length>0) {
      browserHistory.push('/webshop/search/'+this.state.inputText)
    }else {
      browserHistory.push('/webshop/search/'+'0')
    }
  }

  render() {
    return (
      <div id="searchBar">
        <div>
          <input
            value={this.state.inputText}
            onChange={this.onChange.bind(this)}
            type="text"
            placeholder="Vad söker du efter?">
          </input>
        </div>

        <div>
          <figure onClick={this.searchProducts.bind(this)}/>
        </div>
      </div>
    )
  }
}
