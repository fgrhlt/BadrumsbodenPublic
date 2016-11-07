import React, { Component } from 'react'
import axios from 'axios'
require('styles/_servicesPage/vvsRequest.css')

export default class VVSRequest extends Component {
  componentWillMount() {
    this.state = {
      form: {}
    }
  }

  /* Takes the input fields and stores them in the state */
  submitForm(e) {
    e.preventDefault()
    let inputValues = {}

    // Get all input fields
    for(let input in this.refs) {
      inputValues[input] = this.refs[input].value
    }

    axios({
      method: 'post',
      url: 'https://shrouded-plateau-50284.herokuapp.com/email/VVSRequest',
      data: inputValues
    })

    this.setState({
      form: {}
    })

  }

  render() {
    var styleVar = {
      backgroundImage: 'url(assets/images/services/vvs_green_bg.svg)',
      backgroundPosition: 'left center'
    }

    return (
      <div className="serviceForm" id="vvsRequest" style={styleVar}>
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
            <form onSubmit={this.submitForm.bind(this)} name="vvsRequest">
              <div>
                <h3>Namn*</h3>
                <input type="text" ref="namn" required="true"/>

                <h3>Telefonnummer*</h3>
                <input type="text" ref="telefonNummer" required="true"/>

                <h3>E-post*</h3>
                <input type="text" ref="epost" required="true"/>
              </div>

              <div>
                <div className="circle">Svar<br /> inom 24h!</div>
                <h3>Meddelande*</h3>
                  <textarea ref="meddelande" required="true"/>
                  <input type="submit" className="btn" id="send" value="Skicka förfrågan"/>
              </div>
            </form>
          </div>
        </section>
      </div>
    )
  }
}
