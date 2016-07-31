import React, { Component } from 'react'
require('styles/_galleryPage/main.css')

export default class Gallery extends Component {
  render() {
    return (
      <div>
        <div id="header">
            <div id="left">
              <span>
                <img src="assets/arrows/small_backarrow.svg" />
                Tillbaka till portalen
              </span>

              <img id="logo" src="assets/logo/logo_small.svg" />
            </div>

            <div id="right">
              <div>
                <img src="assets/icons/email_icon.svg" />
                <h4>E-post</h4>
                Klicka för att skicka epost
              </div>

              <div>
                <img src="assets/icons/phone_icon.svg" />
                <div className="text">
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

Gallery.defaultProps = {
}
