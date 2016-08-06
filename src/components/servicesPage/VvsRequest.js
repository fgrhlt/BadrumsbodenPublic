import React, { Component } from 'react'

require('styles/_servicesPage/vvsRequest.css')

export default class VvsRequest extends Component {
  render() {

    var styleVar = {
      backgroundImage: 'url(assets/images/services/vvs_green_bg.svg)',
      backgroundPosition: 'left center'
    }

    return (
      
      <div className="service-form" id="vvsRequest" style={styleVar}>

        <section>
          <div>
            <h2>Kontakta oss för VVS och värmejobb!</h2>
            <p>
              Har du problem med vattnet eller övrig vvs?
              Låt oss utföra servicearbetet, alltid till fast pris.<br /><br />
              Boka så utför vi arbetet inom 5 arbetsdagar.
              För större arbeten skickar du ett meddelande så blir du
              kontaktad inom en arbetsdag.
            </p>
          </div>

          <div>
            <h3>Namn*</h3>
            <input />

            <h3>Telefonnummer*</h3>
            <input />

            <h3>E-post*</h3>
            <input />
          </div>

          <div>
            <div className="circle">Svar<br /> inom 24h!</div>
            <h3>Meddelande*</h3>
              <textarea />
              <button className="btn" id="send" name="send">Skicka förfrågan</button>
          </div>
        </section>
      </div>


    )
  }
}
