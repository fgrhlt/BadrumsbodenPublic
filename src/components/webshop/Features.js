import React, { Component } from 'react'

require('../../styles/_features/features.css')

export default class Features extends Component {

  render() {
    return (
      <div id="features">

        <h2>Trygg handel hos oss</h2>

          <section id="four">
            <div>
              <div className="circle">
                <figure className="shipping" />
              </div>

              <p>Fraktas inom 5 arbetsdagar</p>
            </div>

            <div>
              <div className="circle">
                <figure className="warranty" />
              </div>

              <p>Garanti på alla varor</p>
            </div>

            <div>
              <div className="circle">
                <figure className="payment"/>
              </div>

              <p>Säkra betalningsmetoder</p>
            </div>

            <div>
              <div className="circle">
                <figure className="service" />
              </div>

              <p>Pålitlig service</p>
            </div>
          </section>
      </div>
    )
  }
}
