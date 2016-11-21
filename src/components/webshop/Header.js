import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import SearchBar from './SearchBar'
import ShoppingCart from './ShoppingCart'
import Clipboard from 'clipboard'
import ReactTooltip from 'react-tooltip'

require('Clipboard')
require('../../styles/_headerPage/header.css')

export default class Header extends Component {

handleToCheckoutClick() {
  browserHistory.push('/webshop/checkout')
}
onClickLandingpage() {
  browserHistory.push('/')
}
onClickLogo() {
  browserHistory.push('/webshop')
}
handleClick() {
  ReactTooltip.show(this.refs.emailClick)
}
handleMouseOut() {
  ReactTooltip.hide(this.refs.emailClick)
}

  render() {
    let clipboard= new Clipboard('.copyBtn');
    return (
      <div id="webshopHeader">
        <div id="header">
            <div id="left">
              <span onClick={this.onClickLandingpage.bind(this)}>
                <figure id="backArrow"/>
                Tillbaka till portalen
              </span>

              <figure onClick={this.onClickLogo.bind(this)} id="logo" />
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

              <div>
                <ShoppingCart/>
                <figure id="shoppingCart" />
              </div>

              <div>
                <button
                  onClick={this.handleToCheckoutClick.bind(this)}
                  className="btn greenButton">
                  Till kassan
                </button>
              </div>
            </div>
        </div>

        <SearchBar></SearchBar>
      </div>
    )
  }
}
