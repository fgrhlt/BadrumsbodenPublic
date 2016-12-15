import React, { Component } from 'react'

require('../../styles/_servicesPage/overlay.css')

export default class OverlayMessages extends Component {

  render() {
    return (
      <div id="overlay">
        {this.props.responseType == 'error' ?
          <div className="error">
            <div className="close" onClick={this.props.exitOverlay.bind(this)}/>
            <h3>Det verkar som att något gick snett!</h3>
            <p>{this.props.errorMessage}</p>
          </div>
        : '' }

        {this.props.responseType == 'message' ?
          <div className="message">
            <div className="close" onClick={this.props.exitOverlay.bind(this)}/>
            <h1>Tack!</h1>
            <h3>Ditt svar har skickats</h3>
          </div>
        : '' }
      </div>
    )}
}
