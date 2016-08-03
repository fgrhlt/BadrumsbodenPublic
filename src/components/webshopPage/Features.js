import React, { Component } from 'react'

require('styles/_webshopPage/features.css')

export default class Features extends Component {

  render() {
    return (
      <div className="features">

        <h2>Trygg handel hos oss</h2>

          <section>
            <div>
              <div className="circle">
                <img src="assets/icons/webshop/shipping.svg" />
              </div>

              <p>Fraktas inom 5 arbetsdagar</p>
            </div>

            <div>
              <div className="circle">
                <img src="assets/icons/webshop/warranty.svg" />
              </div>

              <p>Garanti på alla varor</p>
            </div>

            <div>
              <div className="circle">
                <img src="assets/icons/webshop/payment.svg" />
              </div>

              <p>Säkra betalningsmetoder</p>
            </div>

            <div>
              <div className="circle">
                <img src="assets/icons/webshop/service.svg"></img>
              </div>

              <h3>hej</h3>
              <p>Pålitlig service</p>
            </div>
          </section>
      </div>
    )
  }
}
