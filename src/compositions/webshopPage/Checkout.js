import React, { Component } from 'react'
import axios from 'axios'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as shoppingcartActions from '../../actions/shoppingcartActions'

require('styles/_webshopPage/webshop.css')

class Checkout extends Component {

  componentWillMount() {
    this.state = {
      data: []
    }
  }

  postRequest() {

    // // Send a POST request
    // axios({
    //   method: 'post',
    //   url: 'https://shrouded-plateau-50284.herokuapp.com/payment',
    //   data: {"firstName":"Alfred", "lastName": "Chang", "email": "support@mlab.com"}
    // })

    // Send a POST request
    axios({
      method: 'post',
      url: 'https://shrouded-plateau-50284.herokuapp.com/email',
      data: {"firstName":"Alfred", "lastName": "Chang", "email": "support@mlab.com"}
    })

    // // Send a POST request
    // axios({
    //   method: 'post',
    //   url: 'https://shrouded-plateau-50284.herokuapp.com/contacts',
    //   data: {"firstName":"Alfred", "lastName": "Chang", "email": "support@mlab.com"}
    // })
  }

  testShoppingcart() {
    let productExample = {
      price: 120,
      articleNr: '123123123',
      productName: 'Badkar Stort',
      quantity: 10
    }
    this.props.addToShoppingcart(productExample)
  }

  testShoppingcartQ() {
    this.props.updateQuantity('123123123', 10)
  }

  testShoppingcartR() {
    this.props.deleteProduct('123123123')
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: this.props.shoppingcartReducer
    })
  }

  render() {
    return (
      <div >
        <button onClick={this.postRequest.bind(this)} type="button" name="button">Send req</button>

        <button onClick={this.testShoppingcart.bind(this)} type="button" name="button">add product</button>
        <button onClick={this.testShoppingcartQ.bind(this)} type="button" name="button">update q</button>
        <button onClick={this.testShoppingcartR.bind(this)} type="button" name="button">remove product</button>

      </div>
    )
  }
}


function mapStateToProps(state) {
  console.log(state.shoppingcartReducer);
  return {
    shoppingcartReducer: state.shoppingcartReducer
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(shoppingcartActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
