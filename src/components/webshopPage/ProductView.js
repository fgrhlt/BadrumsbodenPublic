import React, { Component } from 'react'

require('styles/_webshopPage/productView.css')

export default class Features extends Component {

  render() {
    return (
      <div id="productView">
        <section>
          <ul>
            <li>Subkategori 1</li>
            <li>Subkategori 2</li>
            <li>Subkategori 3</li>
            <li>Subkategori 4</li>
            <li>Subkategori 5</li>
            <li>Subkategori 6</li>
            <li>Subkategori 7</li>
          </ul>
        </section>

        <section>
          <figure style={{backgroundImage:'url(http://placekitten.com/1200/800)'}} />
        </section>

        <section>
          <h2>Blandarfäste A3FG</h2>
          <p>För dold rördragning, 160 c/c, FMM</p>
          <p>Artikelnummer: 135464</p>

          <div id="klarna">
            <img src="https://cdn.klarna.com/1.0/shared/image/generic/logo/sv_se/basic/blue-black.png?width=200" />
          </div>

          <select>
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select>

          <select>
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select>

          <div className="buy">
              <span>350:-</span>
              <span><figure /></span>
          </div>

        </section>
      </div>
    )
  }
}
