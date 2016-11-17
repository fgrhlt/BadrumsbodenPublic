import React, { Component } from 'react'
import { browserHistory } from 'react-router'

require('styles/_landingPage/welcomeInfo.css')

export default class WelcomeInfo extends Component {
  goWebshop() {
    browserHistory.push('/webshop')
  }
  goServices() {
    browserHistory.push('/services')
  }
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
            <div className="heading" onClick={this.goWebshop.bind(this)}><h3>Webbshop</h3></div>
            <div className="content">
              <p>
                Vi erbjuder webbshop med produkter för hemmafixaren och för proffset.
                Här hittar ni exempelvis badkar, blandare, och vvs-artiklar.
              </p>
              <br />
              <p>Vi levererar inom 5 arbetsdagar och snabbare inom Umeå.</p>
              <br />
              <p>Välkommen in för att se om ni hittar något som passar er!</p>

              <div className="arrowButton webshop" onClick={this.goWebshop.bind(this)}>
                <h3>Till Webbshop</h3>
                <div><figure /></div>
              </div>
            </div>
          </div>

          <div>
            <div className="heading" onClick={this.goServices.bind(this)}><h3>Tjänster</h3></div>
            <div className="content">
              <div className="subHeading"><figure /><h4>Badrumsrenovering</h4></div>
              <p>
                Vi utför badrumsrenovering till ditt hem inom branschens alla regler.
                Kolla gärna in våra kampanjer.
              </p><br/>

              <div className="subHeading"><figure className="green" /><h4>VVS-service</h4></div>
              <p>
                Har du problem med vattnet eller övrig VVS?
                Vi installerar även värmepumpar till förmånliga priser!
              </p>

              <div className="arrowButton services" onClick={this.goServices.bind(this)}>
                <h3>Till tjänster</h3>
                <div><figure /></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}
