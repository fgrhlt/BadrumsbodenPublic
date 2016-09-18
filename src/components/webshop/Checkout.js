import React, { Component } from 'react'

require('styles/_webshopPage/checkout.css')

export default class Checkout extends Component {

  render() {
    return (
      <div id="checkout">
        <section>
          <h2>Kassa</h2>
          <p>
            Dina uppgifter är trygga, säkra och krypterade.<br /><br />

            Kontakt<br />
            Telefon: 08-72 00 797, vardagar 08-12 & 13-16.<br />
            info@badrumsboden.se<br /><br />

            Vi använder Klarna som samarbetspartner vid betalningar. <br />
            Klarna erbjuder en full service vid lagring av adressuppgifter och kontokort.<br /><br />
            Känn dig säker med Klarna!
          </p>
        </section>


      </div>
    )
  }
}
