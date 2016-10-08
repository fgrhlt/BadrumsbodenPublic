import React, { Component } from 'react'
import ProgressBar from './ProgressBar'
import FormFields from './FormFields'

require('styles/_servicesPage/priceCalc.css')

export default class PriceCalculator extends Component {
  componentWillMount() {
    this.state = {
      stepCounter: 1
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

  render() {
    let styleVar = {
      backgroundImage: 'url(assets/images/services/pricecalc_blue_bg.svg)',
      backgroundPosition: 'right center'
    }

    return (
      <div className="serviceForm" id="priceCalc" style={styleVar}>

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
          </div>

          <FormFields
            counter={this.state.stepCounter}
            increaseStepCounter={this.increaseStepCounter.bind(this)}
            decreaseStepCounter={this.decreaseStepCounter.bind(this)}
          />
        </section>

      </div>
    )
  }
}
