import React, { Component } from 'react'

require('../../styles/_servicesPage/overlay.css')

export default class OverlayMessages extends Component {

  render() {
    return (
      <div id="serviceOverlay">
        {this.props.response == 'error' ?
          <div className="error">
            <div className="close" onClick={this.props.exitOverlay.bind(this)}/>
            <h3>Det verkar som att något gick snett!</h3>
            <p>Försök igen eller skicka ett mail till info@badrumsboden.se med din förfrågan</p>
          </div>
        : '' }

        {this.props.response == 'message' ?
          <div className="message">
            <div className="close" onClick={this.props.exitOverlay.bind(this)}/>
            <h1>Tack!</h1>
            <h3>Ditt mail har skickats</h3>
          </div>
        : '' }
      </div>
    )}
}
