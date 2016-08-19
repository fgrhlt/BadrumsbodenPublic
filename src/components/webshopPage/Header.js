import React, { Component } from 'react'

import SearchBar from './SearchBar'
import ShoppingCart from './ShoppingCart'
require('styles/_headerPage/header.css')

export default class Header extends Component {

  render() {
    return (
      <div>
        <div id="header">
            <div id="left">
              <span>
                <img src="assets/arrows/small_backarrow.svg" /> Tillbaka till portalen
              </span>

              <img id="logo" src="assets/logo/logo.svg" />
            </div>

            <div id="right">
              <div>
                <img id="email_icon" src="assets/icons/header/email_icon.svg" />
                <div>
                  <h4>E-post</h4>
                  <p>
                    Klicka för att <br />
                    skicka epost
                  </p>
                </div>
              </div>

              <div>
                <img id="phone_icon"  src="assets/icons/header/phone_icon.svg" />
                <div>
                  070 57 43 373<br />
                  <span>Öppet 08-18</span>
                </div>
              </div>

              <div>
                <img id="shoppingCart" src="assets/icons/header/shoppingCart.svg" />
                <div>
                  Varukorg<br />
                  <p>1337:-</p>
                </div>
                <ShoppingCart/>
              </div>

              <div id="button">
                <button className="btn greenButton">Till kassan</button>
              </div>
            </div>
        </div>

        <SearchBar></SearchBar>
      </div>
    )
  }
}
