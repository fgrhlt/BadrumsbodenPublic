import React, { Component } from 'react'
import Clipboard from 'clipboard'
import ReactTooltip from 'react-tooltip'
import { browserHistory } from 'react-router'

require('styles/_footerPage/footer.css')

export default class LandingPageFooter extends Component {
  handleClick() {
    ReactTooltip.show(this.refs.emailClick)
  }
  handleMouseOut() {
    ReactTooltip.hide(this.refs.emailClick)
  }
  onClickFaq() {
    browserHistory.push('/faq')
  }
  render() {
    let clipboard= new Clipboard('.copyBtnFooterLandingPage');
    return (
      <div id="footer">
        <section id="landingPage">
            <div>
              <figure />
              <span>
                Vi använder cookies, för att öka användarvänligheten i enlighet
                med lagen om elektronisk kommunikation.<br /><br />

                Genom att fortsätta använda vår webplats förutsätter vi att du
                godkänner detta. <a onClick={this.onClickFaq.bind(this)}>Läs mer här</a>.
              </span>
            </div>

            <div>
              <h3>Kontakt</h3>
              <p>
                Kabelvägen 8 <br />
                901 33 Umeå <br />
                090 - 13 13 04
              </p>
              <div ref="emailClick" data-tip data-for="emailCopy" />
              <ReactTooltip
                id="emailCopy"
                type='success'
                event="click"
                delayHide={1000}
              >
                <h4>Kopierat!</h4>
              </ReactTooltip>
              <button
                className="copyBtnFooterLandingPage"
                data-clipboard-text="info@badrumsboden.se"
                onClick={this.handleClick.bind(this)}
                onMouseOut={this.handleMouseOut.bind(this)}
              >
                info@badrumsboden.se
              </button>

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
                  VVS med ledorden snabbhet och professionalism.
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
