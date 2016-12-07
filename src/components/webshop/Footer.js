import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import Clipboard from 'clipboard'
import ReactTooltip from 'react-tooltip'

require('../../styles/_footerPage/footer.css')

export default class Footer extends Component {

  onClickFaq() {
    browserHistory.push('/faq')
  }
  handleClick() {
    ReactTooltip.show(this.refs.emailClick)
  }
  handleMouseOut() {
    ReactTooltip.hide(this.refs.emailClick)
  }
  render() {
    let clipboard= new Clipboard('.copyBtnFooterWebshopPage');
    return (
      <div id="footer">
        <section>
            <div>
              <figure />
              <span>
                Vi använder cookies, för att öka användarvänligheten i enlighet
                med lagen om elektronisk kommunikation.<br /><br />

                Genom att fortsätta använda vår webplats förutsätter vi att du
                godkänner detta. <a href="">Läs mer här</a>.
              </span>
              <a title="Payson internetbetalningar" href="https://www.payson.se/" target="_blank">
                <img src="https://www.payson.se/sites/all/files/images/external/payson150x55_n.png"
                  alt="Payson logo"
                  className="paysonLogo">
                </img>
              </a>
            </div>

            <div>
              <h3>Kontakt</h3>
              <p>
                Kabelvägen 8 <br />
                901 33 Umeå <br />
                090 - 13 13 04 <br />
              </p>
              <div ref="emailClick" data-tip data-for="emailCopy">
              </div>
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
            </div>

            <div onClick={this.onClickFaq.bind(this)}>
              <h3>Information</h3>
              <p>
                <a>Vanliga frågor</a><br />
                <a>Betalning</a><br />
                <a>Frakt och leverans</a><br />
                <a>Retur och ångerrätt</a><br />
                <a>Garanti, reklamation</a><br />
              </p>
            </div>

            <div>
              <h3>Öppettider</h3>
              <p>
                Vardagar: 11.00 - 17.00 <br />
                Lör-Sön: Stängt <br />
              </p>
            </div>

        </section>
      </div>
    )
  }
}
