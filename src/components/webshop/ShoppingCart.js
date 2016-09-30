import React, { Component } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as shoppingcartActions from '../../actions/shoppingcartActions'

class ShoppingCart extends Component {

  componentWillMount() {
    this.state = {
      shoppingcartReducer: []
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      shoppingcartReducer: nextProps.shoppingcartReducer ? nextProps.shoppingcartReducer : ''
    })
  }

  render() {
    const { shoppingcartReducer } = this.props
    const { sum, quantity } = shoppingcartReducer

    return (
      <div className="shoppingCart">
          <ul>
            <li>Summa: {sum} :-</li>
            <li>Antal varor: {quantity}</li>
          </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log('shoppingcartReducer', state.shoppingcartReducer);
  return {
    shoppingcartReducer: state.shoppingcartReducer
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(shoppingcartActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart)
