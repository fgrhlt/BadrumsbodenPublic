import React, { Component } from 'react'
require('Clipboard')
import Clipboard from 'clipboard'
require('styles/_headerPage/header.css')

export default class LandingPageHeader extends Component {

  render() {
    let clipboard= new Clipboard('.copyBtn');

    return (
        <div id="header">
            <div id="left">
              <figure id="logo" />
            </div>

            <div id="right">
              <div>
                <figure id="email_icon" />
                <div>
                  <h4>E-post</h4>
                  <p>
                    Klicka för att kopiera<br />
                    epost-address
                    <button
                      style={{backgroundColor:'red', width:25}}
                      className="copyBtn"
                      data-clipboard-text="test123">
                    </button>
                  </p>
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
    )
  }
}
