import React, { Component } from 'react'
require('styles/_servicesPage/mobileServicePage.css')

export default class MobileServicePage extends Component {

  render() {
    return (
      <div id="mobileServicePage">
        <div id="badrum">
          <figure />
          <h4>Badrumsrenovering</h4>
          <p>
            Låt våra badrumsproffs med lång erfarenhet
            utföra din badrumsrenovering.
          </p>
        </div>

        <div id="vvs">
          <figure />
          <h4>VVS-renovering</h4>
          <p>
            Kontakta oss för att utföra VVS-service.
            Vi utför snabb service inom 5 arbetsdagar.
          </p>
        </div>

        <div id="info">
          <h4>
            För att ta del av våra webbtjänster till fullo behöver du
            besöka oss på en dator<br /><br />

            Du kan även kontakta oss på
            e-mail eller telefon för att beställa tjänster
          </h4>
        </div>
      </div>
  )}
}
