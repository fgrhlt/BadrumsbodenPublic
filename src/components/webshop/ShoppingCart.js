import React, { Component } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as shoppingcartActions from '../../actions/shoppingcartActions'

class ShoppingCart extends Component {

  componentWillMount() {
    const { shoppingcartReducer } = this.props
    this.props.fetchSummary()

    this.state = {
      summary: shoppingcartReducer.summary ? shoppingcartReducer.summary : ''
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
        <div>
          Antal varor:<br/>
          Summa:
        </div>

        <div>
          {summary.quantity}<br/>
          {summary.sum}:-
        </div>
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
