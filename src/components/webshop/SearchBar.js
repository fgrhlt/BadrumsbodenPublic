import React, { Component } from 'react'
import { browserHistory } from 'react-router'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as firebaseActions from '../../actions/firebaseActions'


require('styles/_webshopPage/searchBar.css')

class SearchBar extends Component {

  componentWillMount() {
    this.state = {
      inputText: ''
    }
  }

  onChange(event) {
    this.setState({
      inputText: event.target.value
    })
  }

  onKey(event) {
    if (event.keyCode==13) {
      this.searchProducts()
    }
  }

  searchProducts() {
    const { inputText } = this.state
    if (inputText.length>0 && this.state.inputText.match(/[0-9]/g)) {
      this.props.selectSearchType('articleNr')
    }else if (inputText.length>0){
      this.props.selectSearchType('productName')
    }
    browserHistory.push('/webshop/search/'+this.state.inputText.toLowerCase())
  }

  render() {
    return (
      <div id="searchBar">
        <div>
          <input
            value={this.state.inputText}
            onChange={this.onChange.bind(this)}
            onKeyUp={this.onKey.bind(this)}
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

function mapStateToProps(state) {
  return {
    firebaseData: state.firebaseReducer.firebaseData
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(firebaseActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
