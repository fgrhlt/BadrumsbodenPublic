import React, { Component } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as shoppingcartActions from '../../actions/shoppingcartActions'

class ShoppingCart extends Component {

  componentWillMount() {
    this.props.createShoppingCart()
  }

  clicked(article, price) {
    
    this.props.addArticle(article, price)
  }
  render() {

    return (
      <div className="shoppingCart">
        <p>
          {this.state || 'loading' }
        </p>

        <button onClick={this.clicked.bind(this, 'hej', '12')}></button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    shoppingcart: state.shoppingcartReducer
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(shoppingcartActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart)
