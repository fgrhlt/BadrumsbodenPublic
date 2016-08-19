import React, { Component } from 'react'

require('styles/_footerPage/footer.css')

export default class LandingPageFooter extends Component {

  render() {
    return (
      <div id="footer">
        <section id="landingPage">
            <div>
              <figure />
              <span>
                Vi använder cookies, för att öka användarvänligheten i enlighet
                med lagen om elektronisk kommunikation.<br /><br />

                Genom att fortsätta använda vår webplats förutsätter vi att du
                godkänner detta. <a href="">Läs mer här</a>.
              </span>
            </div>

            <div>
              <h3>Kontakt</h3>
              <p>
                Kabelvägen 8 <br />
                901 33 Umeå <br />
                090 - 13 13 04 <br />
                <a href="">info@badrumsboden.se</a><br />
              </p>

              <h3>Öppettider</h3>
              <p>
                Vardagar: 11.00 - 17.00 <br />
                Lör-Sön: Stängt <br />
              </p>
            </div>

            <div>
              <div>
                <h3>Om Badrumsboden</h3>
                <p className="info">
                  Badrumsboden startades år 2013 av Mats Hammarberg och Jonny Johansson.<br /><br />
                  Målet med badrumsboden är att erbjuda snabb och enkel service inom
                  VVS med ledordet snabbhet och proffesinalism.
                </p>
              </div>

              <div>
                <div>
                  <div className="staffImg" style={{backgroundImage: 'url(assets/images/landingPage/mats.jpg)'}}></div>
                  <p>Mats Hammarberg</p>
                </div>

                <div>
                  <div className="staffImg" style={{backgroundImage: 'url(assets/images/landingPage/jonny.jpg)'}}></div>
                  <p>Jonny Johansson</p>
                </div>
              </div>
            </div>
        </section>
      </div>
    )
  }
}
