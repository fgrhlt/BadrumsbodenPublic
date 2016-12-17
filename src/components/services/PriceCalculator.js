import React, { Component } from 'react'
import ProgressBar from './ProgressBar'
import FormFields from './FormFields'
import OverlayMessages from './OverlayMessages'
import { browserHistory } from 'react-router'

require('../../styles/_servicesPage/priceCalc.css')

export default class PriceCalculator extends Component {
  componentWillMount() {
    this.state = {
      stepCounter: 1,
      responseType: '',
      overlay: false,
      errorMessage:''
    }
  }

  /* Displays the next fields in the price calculator for the user */
  increaseStepCounter() {
    let step = this.state.stepCounter
    if(step > 0 && step < 6) {
      this.setState({
        stepCounter: this.state.stepCounter + 1
      })
    }
  }
  /* Displays the previous fields in the price calculator for the user */
  decreaseStepCounter() {
    let step = this.state.stepCounter
    if(step > 1 && step <= 6) {
      this.setState({
        stepCounter: this.state.stepCounter - 1
      })
    }
  }
  /* Exits the overlay messages, so they dissapear for the user */
  exitOverlay() {
    this.setState({
      overlay:false,
      errorMessage: ''
    })
  }
  /* Sets the response type of this component, the action is called from formFields */
  setResponseType(response, message) {
    this.setState({
      responseType: response,
      overlay:true,
      errorMessage: message
    })
  }

  onClickFaq() {
    browserHistory.push('/services/faq')
  }

  render() {
    let styleVar = {
      backgroundImage: 'url(../../assets/images/services/pricecalc_blue_bg.svg)',
      backgroundPosition: 'right center'
    }

    return (
      <div className="serviceForm" id="priceCalc" style={styleVar}>
        {this.state.overlay ?
          <OverlayMessages
            responseType={this.state.responseType}
            exitOverlay={this.exitOverlay.bind(this)}
            errorMessage={this.state.errorMessage} />
          : '' }
        <section>
          <div className="circle">Svar <br />inom 24h!</div>
          <ProgressBar counter={this.state.stepCounter} />
        </section>

        <section>
          <div>
            <h2>Priskalkyl för badrum</h2>
            <p>
              Välkommen att fylla i formuläret,
              så är du ett steg närmare dina drömmars badrum.

            </p>
            <br/>
            <br/>

            <p style={{fontSize:'98%'}}>
              <br/>
              Mer information finner du under rubriken Priskalkyl i <span onClick={this.onClickFaq.bind(this)} style={{fontWeight:'900', color: 'darkblue', cursor: 'pointer'}}>informationsbanken</span>
            </p>

            <p style={{fontStyle:'italic', fontSize:'98%'}}>
              <br/>
              Fält som är markerade med * är obligatoriska fält.
            </p>
          </div>

          <FormFields
            counter={this.state.stepCounter}
            increaseStepCounter={this.increaseStepCounter.bind(this)}
            decreaseStepCounter={this.decreaseStepCounter.bind(this)}
            setResponseType={this.setResponseType.bind(this)}
          />
        </section>

      </div>
    )
  }
}
