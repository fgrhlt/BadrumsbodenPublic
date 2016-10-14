import React, { Component } from 'react'
import { browserHistory } from 'react-router'

require('styles/_headerPage/header.css')

export default class Header extends Component {

  onClickLandingpage() {
    browserHistory.push('/services')
  }

  render() {
    return (
      <div id="galleryPageHeader">
        <div id="header">
            <div id="left">
              <span onClick={this.onClickLandingpage.bind(this)}>
                <figure id="backArrow"/> Tillbaka till tjänster
              </span>
              <figure id="logo" />
            </div>

            <div id="right">
              <div>
                <figure id="email_icon"/>
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
                <figure id="phone_icon" />
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
