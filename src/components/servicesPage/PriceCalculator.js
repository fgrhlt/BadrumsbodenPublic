import React, { Component } from 'react'

import ProgressBar from './ProgressBar'

require('styles/_servicesPage/priceCalc.css')

export default class PriceCalculator extends Component {
  render() {

    var styleVar = {
      backgroundImage: 'url(assets/images/services/pricecalc_blue_bg.svg)',
      backgroundPosition: 'right center'
    }

    return (
      <div className="service-form" id="priceCalc" style={styleVar}>

        <section>
          <div className="circle">Svar <br />inom 24h!</div>

          <ProgressBar />
        </section>

        <section>
          <div>
            <h2>Priskalkyl för badrum</h2>
            <p>
              Välkommen att fylla i formuläret,
              så är du ett steg närmare dina drömmars badrum.
            </p>
          </div>

          <div>
            <form>
              <h3>Namn*</h3>
              <input />

              <h3>Telefonnummer*</h3>
              <input />

              <h3>E-post*</h3>
              <input />
            </form>
          </div>

          <div>
            <form>
              <h3>Adress för arbetet*</h3>
              <input />

              <h3>Huset byggår*</h3>
              <input />

              <h3>Rummets bredd*</h3>
              <input />
            </form>
          </div>

          <div><figure className="next"/></div>

        </section>

      </div>
    )
  }
}
