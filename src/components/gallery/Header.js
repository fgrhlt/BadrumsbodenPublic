import React, { Component } from 'react'
import { browserHistory } from 'react-router'

require('styles/_headerPage/header.css')

export default class Header extends Component {

  onClickLandingpage() {
    browserHistory.push('/services')
  }

  render() {
    return (
      <div>

        <div id="header">
            <div id="left">
              <span onClick={this.onClickLandingpage.bind(this)}>
                <img src="assets/arrows/small_backarrow.svg" /> Tillbaka till tjänster
              </span>

              <figure id="logo" />
            </div>

            <div id="right">
              <div>
                <img id="email_icon" src="assets/icons/header/email_icon.svg" />
                <div>
                  <h4>E-post</h4>
                    <a href="mailto:webmaster@example.com">
                      <p>
                        Klicka för att <br />
                        skicka epost
                      </p>
                    </a>
                </div>
              </div>

              <div>
                <img id="phone_icon"  src="assets/icons/header/phone_icon.svg" />
                <div>
                  070 57 43 373<br />
                  <span>Öppet 08-18</span>
                </div>
              </div>

            </div>
        </div>

      </div>
    )
  }
}
