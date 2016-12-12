import React, { Component } from 'react'
import Clipboard from 'clipboard'
import ReactTooltip from 'react-tooltip'
import { browserHistory } from 'react-router'

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
    let clipboard= new Clipboard('.copyBtnFooterServicesPage');
    return (
      <div id="footer">
        <section>

            <div>
              <figure />
              <span>
                Vi använder cookies, för att öka användarvänligheten i enlighet
                med lagen om elektronisk kommunikation.<br /><br />

                Genom att fortsätta använda vår webplats förutsätter vi att du
                godkänner detta. <a onClick={this.onClickFaq.bind(this)}>Läs mer här</a>.
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
                className="copyBtnFooterServicesPage"
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
                <a href="">Vanliga frågor</a> <br />
                <a href="">Betalning</a> <br />
                <a href="">Frakt och leverans</a> <br />
                <a href="">Retur och ångerrätt</a> <br />
                <a href="">Garanti och reklamation</a> <br />
                <a>Cookies</a><br />
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
