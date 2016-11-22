import React, { Component } from 'react'
import Clipboard from 'clipboard'
import ReactTooltip from 'react-tooltip'
require('../../../node_modules/clipboard/lib/clipboard')
require('../../styles/_headerPage/header.css')

export default class Header extends Component {

  handleClick() {
    ReactTooltip.show(this.refs.emailClick)
  }
  handleMouseOut() {
    ReactTooltip.hide(this.refs.emailClick)
  }
  render() {
    let clipboard= new Clipboard('.copyBtn');
    return (
      <div id="galleryPageHeader">
        <div id="header">
            <div id="left" style={{marginTop:25}}>
              <figure id="logo"/>
            </div>

            <div id="right">
              <div>
                <div>
                  <button
                    className="copyBtn"
                    data-clipboard-text="info@badrumsboden.se"
                    onClick={this.handleClick.bind(this)}
                    onMouseOut={this.handleMouseOut.bind(this)}
                  />
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
                    delayHide={1000}
                  >
                    <h4>Kopierat!</h4>
                  </ReactTooltip>
                </div>
                <figure id="email_icon" />
              </div>

              <div>
                <div>
                  070 57 43 373<br />
                  <span>Öppet 08-18</span>
                </div>
                <figure id="phone_icon" />
              </div>
            </div>
        </div>
      </div>
    )
  }
}
