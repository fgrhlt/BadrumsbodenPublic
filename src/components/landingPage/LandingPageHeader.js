import React, { Component } from 'react'
import Clipboard from 'clipboard'
import ReactTooltip from 'react-tooltip'
require('styles/_headerPage/header.css')

export default class LandingPageHeader extends Component {
  handleClick() {
    ReactTooltip.show(this.refs.emailClick)
    setTimeout(function() {
      ReactTooltip.hide(this.refs.emailClick)
    }.bind(this), 900);
  }

  render() {
    let clipboard= new Clipboard('.copyBtn');
    return (
      <div id="landingPageHeader">
        <div id="header">
          <div id="left">
            <figure id="logo" className="alone" />
          </div>

          <div id="right">
            <div id="emailDiv">
              <figure />
              <div>
                <button
                  className="copyBtn"
                  id="copyBtn1"
                  data-clipboard-text="info@badrumsboden.se"
                  onClick={this.handleClick.bind(this)}
                />
                <div ref="emailClick" data-tip data-for="emailCopy">
                  <h4>E-post</h4>
                  Klicka för att kopiera<br />
                  epost-address
                </div>
                <ReactTooltip
                  id="emailCopy"
                  type='success'
                  event="click"
                  delayHide={1000}
                >
                  <h4>Kopierat!</h4>
                </ReactTooltip>
              </div>
            </div>

            <div id="phoneDiv">
              <figure />
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
