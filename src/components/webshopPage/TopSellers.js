import React, { Component } from 'react'

require('styles/_webshopPage/topSellers.css')

export default class TopSellers extends Component {

  render() {
    return (
      <div id="topSellers">

        <h4>Toppsäljare</h4>

        <div id="products">
          <div>
            <figure style={{backgroundImage: 'url(assets/images/webshop/img1.jpg)'}} />
            <h4>IFÖ tvättställ AE4</h4>
            <p>Halvfront</p>
            <span>7080:-</span>
          </div>

          <div>
            <figure style={{backgroundImage: 'url(assets/images/webshop/img2.jpg)'}} />
            <h4>IFÖ Hylla</h4>
            <p>Metallstomme</p>
            <span>599:-</span>
          </div>

          <div>
            <figure style={{backgroundImage: 'url(assets/images/webshop/img3.jpg)'}} />
            <h4>IFÖ blandare FG5</h4>
            <p>Titan</p>
            <span>49:-</span>
          </div>

          <div>
            <figure style={{backgroundImage: 'url(assets/images/webshop/img4.jpg)'}} />
            <h4>IFÖ tvättställ DE4</h4>
            <p>Keramik</p>
            <span>10 000:-</span>
          </div>
        </div>
      </div>
    )
  }
}
