import React, { Component } from 'react'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as firebaseActions from '../../actions/firebaseActions'

require('styles/_webshopPage/webshop.css')

class Webshop extends Component {

  postRequest() {
    const { NOODLIO_PAY_API_URL, NOODLIO_PAY_API_KEY, TEST_MODE } = this.state

    var instance = axios.create({
      baseURL: NOODLIO_PAY_API_URL,
      timeout: 5000,
      headers: {
        'X-Mashape-Key': NOODLIO_PAY_API_KEY,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      }
    })

    let reqData = {
          cvc: '123',
          exp_month: '12',
          exp_year: '2020',
          number: '4242424242424242',
          test: TEST_MODE
    }

    instance.post(NOODLIO_PAY_API_URL + '/tokens/create', reqData)
    .then( (response) => {
      console.log(response)
    })
    .catch( (error) => {
      console.log(error)
    })
  }

  onToken(token) {

    axios({
      method: 'post',
      url: 'https://api.stripe.com/v1/charges',
      timeout: 5000,
      headers: {
        'Authorization': 'Bearer sk_test_WKlyb8ZTxMTpVWaL1Uvv6rUY',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
          amount: '2000',
          currency: 'eur',
          source: token.id,
          description: 'Test charge'
      }
    })

    // var instance = axios.create({
    //   baseURL: 'https://api.stripe.com/v1',
    //   timeout: 5000,
    //   headers: {
    //     'Authorization': 'Bearer sk_test_WKlyb8ZTxMTpVWaL1Uvv6rUY',
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   },
    // })
    //
    // let reqData = {
    //   amount: '2000',
    //   currency: 'eur',
    //   source: token.id,
    //   description: 'Test charge'
    // }
    //
    // instance.post('/charges', reqData)
    // .then( (response) => {
    //   console.log(response)
    // })
    // .catch( (error) => {
    //   console.log(error)
    // })

    }

  render() {
    return (
      <StripeCheckout
        token={this.onToken}
        stripeKey="pk_test_fIT3T4pAmisM8mJT3UtcvZEG"
        allowRememberMe={false}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(Webshop)
