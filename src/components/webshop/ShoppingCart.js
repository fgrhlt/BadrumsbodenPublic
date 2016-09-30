import React, { Component } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as shoppingcartActions from '../../actions/shoppingcartActions'

class ShoppingCart extends Component {

  componentWillMount() {
    this.state = {
      summary: []
    }
    this.state = {
      summary: this.props.shoppingcartReducer.summary ? this.props.shoppingcartReducer.summary : ''
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      summary: nextProps.shoppingcartReducer.summary ? nextProps.shoppingcartReducer.summary : ''
    })
  }

  render() {
    const { summary } = this.state
    
    return (
      <div className="shoppingCart">
          <ul>
            <li>Summa: {summary.sum} :-</li>
            <li>Antal varor: {summary.quantity}</li>
          </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    shoppingcartReducer: state.shoppingcartReducer
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(shoppingcartActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart)
