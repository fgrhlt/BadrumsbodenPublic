import React, { Component } from 'react'
require('styles/_landingPage/welcomeInfo.css')

export default class WelcomeInfo extends Component {

  render() {
    /* Data from database */
    var styleVar = {
      backgroundImage: 'url(assets/images/landingPage/welcome_bg.png)',
      color: '#fff'
    }

    return (
      <div id="welcomeInfo" style={styleVar}>
        <h1>Välkommen till badrumsboden!</h1>
      </div>
    )
  }
}
