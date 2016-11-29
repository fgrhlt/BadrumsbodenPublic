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
    return (
      <div id="welcomeInfo">
        <h3>Välkommen till Badrumsboden!</h3>

        <section name="lostContainer">
          <div>
            <div className="heading" onClick={this.goWebshop.bind(this)}><h2>Webbshop</h2></div>
            <div className="content" id="webshop">
              <p>
                Vi erbjuder webbshop med produkter för hemmafixaren och proffset.
                Här hittar ni exempelvis badkar, blandare, bastuprodukter och vvs-artiklar.
                Glöm inte att titta in våra kampanjer.
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
            <div className="heading" onClick={this.goServices.bind(this)}><h2>Tjänster</h2></div>
            <div className="content">
              <div className="subHeading"><figure /><h4>Badrumsrenovering</h4></div>
              <p>
                Låt våra proffs med lång erfarenhet och brett kunnande utföra din badrumsrenovering.
                Hos oss kan du beräkna vad en renovering kan kosta utan att vi är på plats.
              </p><br/><br/>

              <div className="subHeading"><figure className="green" /><h4>VVS-service</h4></div>
              <p>
                Har du problem med vattnet eller värmen? VVS-service inom 5 arbetsdagar. Akutservice, åtgärdas på dagen. All service till fasta priser.
              </p>

              <div className="arrowButton services" onClick={this.goServices.bind(this)}>
                <h3>Till Tjänster</h3>
                <div><figure /></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}
