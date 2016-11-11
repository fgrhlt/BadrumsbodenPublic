import React, { Component } from 'react'

require('styles/_features/features.css')

export default class LandingPageFeatures extends Component {

  render() {
    var styleVar = {
      backgrund: '#F7F7F7',
      backgroundImage: 'url(assets/images/landingPage/welcome_bg_w.png)',
      backgroundPosition: 'bottom center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'
    }
    return (
      <div id="features" style={styleVar}>

        <h2>Varför anlita Badrumsboden?</h2>

          <section id="three">
            <div>
              <div className="circle">
                <img src="assets/icons/landing_page/thumb_orange.svg" />
              </div>

              <h3>Enkelhet</h3>
              <p>Helhetslösningar för kunden <br />med enkla affärsupplägg</p>
            </div>

            <div>
              <div className="circle">
                <img src="assets/icons/landing_page/gauge_orange.svg" />
              </div>

              <h3>Snabbhet</h3>
              <p>
                  Svar inom 24 h för kalkylförfrågan <br />
                  Kundtjänst öppen varje dag
              </p>
            </div>

            <div>
            <div className="circle">
              <img src="assets/icons/landing_page/stars_orange.svg" />
            </div>

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
