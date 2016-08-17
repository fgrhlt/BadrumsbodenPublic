import React, { Component } from 'react'
require('styles/_webshopPage/campaign.css')

export default class Campaign extends Component {

  render() {
    /* Data from database */
    var styleVar = {
      backgroundImage: 'url(assets/images/campaign.jpg)',
      color: '#fff',
    }

    return (
      <div id="campaign" style={styleVar}>

        <section>
          <h1>Kampanj</h1>
          <p>
            Köp en toalettstol idag och få 200:- rabatt.
            Du kommer tjäna massor med pengar på detta
            erbjudande! <br /><br />

            Först till kvarn gäller och allt är bra.
            Vi finns på Kabelvägen 8. Öppet 8-16
          </p>
        </section>

        <button className="btn greenButton">Till erbjudande</button>
      </div>

    )
  }
}
