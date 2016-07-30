import React, { Component } from 'react'
require('normalize.css/normalize.css')
require('styles/Main.css')
require('styles/Gallery.css')

export default class Gallery extends Component {
  render() {
    return (
      <div id="header">
          <div id="left">
            <span>
              <img src="images/arrows/small_backarrow.svg" />
              Tillbaka till portalen
            </span>

            <img id="logo" src="images/logo/logo_small.svg" />
          </div>

          <div id="right">
            <div>
              <img src="images/icons/email_icon.svg" />
              <h4>E-post</h4>
              Klicka för att skicka epost
            </div>

            <div>
              <img src="images/icons/phone_icon.svg" />
              <div className="text">
                070 57 43 373<br />
                <span>Öppet 08-18</span>
                </div>
            </div>
          </div>
      </div>
    )
  }
}

Gallery.defaultProps = {
}
