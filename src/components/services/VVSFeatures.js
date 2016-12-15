import React, { Component } from 'react'

require('../../styles/_features/features.css')

export default class VVSFeatures extends Component {

  render() {
    return (
      <div id="features">
          <section id="three">
            <div>
              <figure className="icon gauge" />

              <h3>Snabb service</h3>
              <p>
                Vi utför VVS service inom 5 arbetsdagar.<br />
                Allt du behöver inom vatten, värme och ventilation
              </p>
            </div>

            <div>
              <figure className="icon tag" />

              <h3>Alltid fast pris</h3>
              <p>
                Vi har alltid fast pris på våra VVS-arbeten. Skicka ett mail och få ett pris.
              </p>
            </div>

            <div>
              <figure className="icon medkit" />

              <h3>Akutservice</h3>
              <p>
                Åtgärdas under dagen. Kontakta oss för vidare information.
              </p>
            </div>
          </section>
      </div>
    )
  }
}
