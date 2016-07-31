import React, { Component } from 'react'
require('normalize.css/normalize.css')
require('styles/Main.css')
require('styles/Gallery.css')

export default class Gallery extends Component {
  render() {
    return (
      <div>
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

        <div id="text">
          You’ll probably want to change those defaults and have some control over the bounds of a font size.
          The best way to do this is with a new shorthand syntax in font-size, and a new property called font-range.
          Font range specifies the viewport widths between which the font size is
          fluid, outside of this range the font sizes are set to min/max values.
        </div>
      </div>
    )
  }
}

Gallery.defaultProps = {
}
