import React, { Component } from 'react'
import { browserHistory } from 'react-router'
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
  toHome() {
    browserHistory.push('/services')
  }
  render() {
    let clipboard= new Clipboard('.copyBtn');
    return (
      <div id="servicePageHeader">
        <div id="header">
            <div id="left">
              <span onClick={this.toHome.bind(this)}>
                <figure id="backArrow"/> Tillbaka till föregående sida
              </span>
              <figure onClick={this.toHome.bind(this)} id="logo" />
            </div>

            <div id="right">
              <div id="emailDiv">
                <figure />
                <div>
                  <button
                    className="copyBtn"
                    data-clipboard-text="info@badrumsboden.se"
                    onClick={this.handleClick.bind(this)}
                    onMouseOut={this.handleMouseOut.bind(this)}
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
                090-13 13 04<br />
                <span>Öppet 11-17</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
