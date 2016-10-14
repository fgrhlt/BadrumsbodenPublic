import React, { Component } from 'react'
import { browserHistory } from 'react-router'

require('styles/_footerPage/footer.css')

export default class Footer extends Component {

  onClickFaq() {
    browserHistory.push('/faq')
  }

  render() {
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
            </div>

            <div>
              <h3>Kontakt</h3>
              <p>
                Kabelvägen 8 <br />
                901 33 Umeå <br />
                090 - 13 13 04 <br />
                info@badrumsboden.se<br />
              </p>
            </div>

            <div onClick={this.onClickFaq.bind(this)}>
              <h3>Information</h3>
              <p>
                <a href="">Vanliga frågor</a> <br />
                <a href="">Betalning</a> <br />
                <a href="">Frakt och leverans</a> <br />
                <a href="">Retur och ångerrätt</a> <br />
                <a href="">Garanti, reklamation</a> <br />
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
