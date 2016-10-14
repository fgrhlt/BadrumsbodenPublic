import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import Clipboard from 'clipboard'
import ReactTooltip from 'react-tooltip'
require('Clipboard')
require('styles/_headerPage/header.css')

export default class Header extends Component {

  onClickLandingpage() {
    browserHistory.push('/services')
  }
  handleClick() {
    ReactTooltip.show(this.refs.emailClick)
  }
  render() {
    let clipboard= new Clipboard('.copyBtn');
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
                <figure id="email_icon" />
                <button className="copyBtn" data-clipboard-text="info@badrumsboden.se" onClick={this.handleClick.bind(this)}/>
                <div ref="emailClick" data-tip data-for="emailCopy">
                  <h4>E-post</h4>
                  <p>
                    Klicka för att kopiera<br />
                    epost-address
                  </p>
                </div>
                <ReactTooltip
                  id="emailCopy"
                  type='success'
                  event="click"
                  eventOff="mouseout"
                  delayHide={1100}
                >
                  <h4>Kopierat!</h4>
                </ReactTooltip>
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
