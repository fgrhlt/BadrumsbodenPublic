import React, { Component } from 'react'

require('styles/_features/features.css')

export default class BathroomFeatures extends Component {

  render() {
    return (
      <div id="features">
          <section id="three">
            <div>
              <img src="assets/icons/services/10year.svg" className="bathroomIcon"/>

              <h3>Garanti</h3>
              <p>
                Vi lämnar alltid garanti på det vi gör.<br/>
                10 år på badrum, 2 år på VVS
              </p>
            </div>

            <div>
              <img src="assets/icons/services/pricecalc.svg" className="bathroomIcon" />
              <h3>Priskalkyl</h3>
              <p>
                Vi är de enda i branschen som erbjuder en <br/>
                priskalkyl innan du bestämt dig om offert!
              </p>
            </div>

            <div>
              <img src="assets/icons/services/GVK.svg" className="bathroomIcon"/>

              <h3>GVK-auktoriserade</h3>
              <p>
                Utbildade i branschens regler och rekommendationer
              </p>
            </div>
          </section>
      </div>
    )
  }
}
