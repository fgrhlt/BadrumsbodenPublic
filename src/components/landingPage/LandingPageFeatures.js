import React, { Component } from 'react'

require('styles/_features/features.css')

export default class LandingPageFeatures extends Component {

  render() {
    return (
      <div id="features" className="landingPageFeatures">

        <h2>Varför anlita Badrumsboden?</h2>
          <section id="three">
            <div className="landingThree">
              <figure className="thumb" />

              <h3>Enkelhet</h3>
              <p>Helhetslösningar för kunden <br />med enkla affärsupplägg</p>
            </div>

            <div className="landingThree">
              <figure className="landingGauge" />
              <h3>Snabbhet</h3>
              <p>
                  Svar inom 24h för när du beställer tjänster av oss
              </p>
            </div>

            <div className="landingThree">
              <figure className="stars" />

              <h3>Professionella hantverkare</h3>
              <p>
                Utbildade i branschens <br />
                regler och rekommendationer
              </p>
            </div>
          </section>
      </div>
    )
  }
}
