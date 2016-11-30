import React, { Component } from 'react'
require('styles/_webshopPage/infoBank.css')

import Checkout from './Checkout'
import Payment from './Payment'

export default class Checkoutpage extends Component {

  componentWillMount() {
    this.state = {
      showCheckout: true,
      showPayment: false
    }
  }

  toggleView() {
    this.setState({
      showCheckout: !this.state.showCheckout,
      showPayment: !this.state.showPayment
    })
  }

  collectData(data) {
    this.setState({
      data
    })
  }

  render() {
    return (
      <div  id="checkout">
        <section>
          Dina uppgifter är trygga, säkra och krypterade.<br /><br />

          <h4>Kontakt</h4>
          Telefon: 08-72 00 797<br/>
          vardagar 08-12 & 13-16.<br />
          info@badrumsboden.se<br /><br />

          Vi använder Stripe som samarbetspartner vid betalningar. <br />
          Stripe erbjuder en full service vid lagring av adressuppgifter och kontokort.<br /><br />
          Känn dig säker med Stripe!
        </section>

        <section>
          {this.state.showCheckout?
            <div>
              <Checkout collectData={this.collectData.bind(this)}/>
              <div onClick={this.toggleView.bind(this)}>
                Till betalning ->
              </div>
            </div>
          :''}

          {this.state.showPayment?
            <div>
              <div onClick={this.toggleView.bind(this)}>
                Tillbaka (avbryt betalning)
              </div>
              <Payment data={this.state.data}/>
            </div>
          :''}
        </section>
      </div>
    )
  }
}
