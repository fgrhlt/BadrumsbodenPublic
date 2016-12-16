import React, { Component } from 'react'
require('styles/_webshopPage/faq.css')
import { browserHistory } from 'react-router'

import Checkout from './Checkout'
import Payment from './Payment'

export default class Checkoutpage extends Component {

  componentWillMount() {
    this.state = {
      showCheckout: true,
      showPayment: false
    }
  }

  showPayment() {
    browserHistory.push('/webshop/payment')

    // this.setState({
    //   showCheckout: false,
    //   showPayment: true
    // })

  }

  showCheckout() {
    browserHistory.push('/webshop/checkout')

    // this.setState({
    //   showCheckout: true,
    //   showPayment: false
    // })
  }

  collectData(data) { this.state = {data} }

  render() {
    return (
      <div id="checkout">
        <section>
          Dina uppgifter är trygga, säkra och krypterade.<br /><br />

          <h4>Kontakt</h4>
          Telefon: 08-72 00 797<br/>
          vardagar 08-12 & 13-16.<br />
          info@badrumsboden.se<br /><br />

          Vi använder Payson som samarbetspartner vid betalningar. <br />
          Payson erbjuder en full service vid lagring av adressuppgifter och kontokort.<br /><br />
          Känn dig säker med Payson!
        </section>

        <section>
          {this.state.showCheckout?
            <div>
              <Checkout collectData={this.collectData.bind(this)}/>
              <div className="paysonBtn" onClick={this.showPayment.bind(this)}>
              </div>
            </div>
          :''}

          {this.state.showPayment?
            <div>
              <Payment data={this.state.data}/>
              <div className="paysonBtnBack" onClick={this.showCheckout.bind(this)}>
              </div>
            </div>
          :''}
        </section>
      </div>
    )
  }
}
