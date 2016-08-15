import React, { Component } from 'react'

require('styles/_webshopPage/checkout.css')

export default class Checkout extends Component {

  render() {
    return (
      <div id="checkout">
        <section>
          <h2>Kassa</h2>
          <p>
            Dina uppgifter är trygga, säkra och krypterade.<br /><br />

            Kontakt<br />
            Telefon: 08-72 00 797, vardagar 08-12 & 13-16.<br />
            info@badrumsboden.se<br /><br />

            Vi använder Klarna som samarbetspartner vid betalningar. <br />
            Klarna erbjuder en full service vid lagring av adressuppgifter och kontokort.<br /><br />
            Känn dig säker med Klarna!
          </p>
        </section>

        <section>
          <h2>Varukorg</h2>

          <div id="cart">
            <div className="item">
              <div className="image"><figure /></div>

              <div className="info">
                <h4>IFÖ</h4>
                <p>Rostfritt stål</p>
                <span>200 cm</span>
              </div>

              <div className="quantity">
                <p>Antal: 1</p>
                <span>+</span>
                <span>-</span>
              </div>

              <div className="price">
                <h4>799:-</h4>
              </div>
            </div>

            <div className="item">
              <div className="image"><figure /></div>

              <div className="info">
                <h4>IFÖ</h4>
                <p>Rostfritt stål</p>
                <span>200 cm</span>
              </div>

              <div className="quantity">
                <p>Antal: 1</p>
                <span>+</span>
                <span>-</span>
              </div>

              <div className="price">
                <h4>799:-</h4>
              </div>
            </div>

            <div className="item">
              <div className="image"><figure /></div>

              <div className="info">
                <h4>IFÖ</h4>
                <p>Rostfritt stål</p>
                <span>200 cm</span>
              </div>

              <div className="quantity">
                <p>Antal: 1</p>
                <span>+</span>
                <span>-</span>
              </div>

              <div className="price">
                <h4>799:-</h4>
              </div>
            </div>

            <div className="item">
              <div className="image"><figure /></div>

              <div className="info">
                <h4>IFÖ</h4>
                <p>Rostfritt stål</p>
                <span>200 cm</span>
              </div>

              <div className="quantity">
                <p>Antal: 1</p>
                <span>+</span>
                <span>-</span>
              </div>

              <div className="price">
                <h4>799:-</h4>
              </div>
            </div>

            <h4 className="total">Totalt: 1499:-</h4>
          </div>

          <div id="delivery">
            <h2>Leveranssätt</h2>

            <div>
              <input type="radio" />
              <p>Hämta i butik</p>
            </div>

            <div>
              <input type="radio" />
              <p>Postpaket Schenker, 159:-</p>
            </div>
          </div>


          <div id="klarna">
            <img src="../assets/images/webshop/klarna_test.png" />
          </div>
          
        </section>
      </div>
    )
  }
}
