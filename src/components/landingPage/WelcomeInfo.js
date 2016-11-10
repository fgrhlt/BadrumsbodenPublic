import React, { Component } from 'react'
require('styles/_landingPage/welcomeInfo.css')

export default class WelcomeInfo extends Component {

  render() {
    /* Data from database */
    var styleVar = {
      backgroundImage: 'url(assets/images/landingPage/welcome_bg.png)',
      color: '#fff'
    }

    return (
      <div id="welcomeInfo" style={styleVar}>
        <h2>Välkommen till Badrumsboden!</h2>

        <section name="lostContainer">
          <div>
            <div className="heading"><h3>Webshop</h3></div>
            <p>
              Vi erbjuder webbshop med produkter för hemmafixaren och för proffset.<br/>
              Välkommen in för att se om ni hittar något som passar er!
            </p>
          </div>

          <div>
            <div className="heading"><h3>Badrumsrenovering</h3></div>
            <p>
            Vi utför badrumsrenovering och gör massa andra grejer också. <br/>
            Kolla gärna in våra kampanjer.
            </p>
          </div>

          <div>
            <div className="heading"><h3>VVS-service</h3></div>
            <p>
              Har du problem med vattnet eller övrig VVS? <br/>
              Vi installerar även värmepumpar till förmånliga priser!
            </p>
          </div>
        </section>


      </div>
    )
  }
}
