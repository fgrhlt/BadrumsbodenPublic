import React, { Component } from 'react'

import ProgressBar from './ProgressBar'

require('styles/_servicesPage/priceCalc.css')

export default class PriceCalculator extends Component {

  componentWillMount() {
    this.state = {
      arr: []
    }
  }

  minimizeDiv() {
    this.props.toggleDiv('false')
  }

  onChange(e) {
    let arr = this.state.arr
    switch (e.target.id) {
      case 'namn':
        arr['namn'] = e.target.value
        break
      case 'telefon':
        arr['telefon'] = e.target.value
        break
      case 'email':
        arr['email'] = e.target.value
        break
      case 'address':
        arr['address'] = e.target.value
        break
      case 'byggar':
        arr['byggar'] = e.target.value
        break
      case 'bredd':
        arr['bredd'] = e.target.value
        break
      default:
    }
  }

  render() {
    var styleVar = {
      backgroundImage: 'url(assets/images/services/pricecalc_blue_bg.svg)',
      backgroundPosition: 'right center'
    }

    return (
      <div className="service-form" id="priceCalc" style={styleVar}>

        <section>
          <div className="circle">Svar <br />inom 24h!</div>

          <ProgressBar />
        </section>

        <section>
          <div>
            <h2>Priskalkyl för badrum</h2>
            <p>
              Välkommen att fylla i formuläret,
              så är du ett steg närmare dina drömmars badrum.
            </p>
          </div>

          <div onChange={this.onChange.bind(this)}>
            <form>
              <h3> Namn*</h3>
              <input id="namn"/>

              <h3>Telefonnummer*</h3>
              <input id="telefon"/>

              <h3 >E-post*</h3>
              <input id="email"/>
            </form>
          </div>

          <div onChange={this.onChange.bind(this)}>
            <form>
              <h3>Adress för arbetet*</h3>
              <input id="address"/>

              <h3>Huset byggår*</h3>
              <input id="byggar"/>

              <h3>Rummets bredd*</h3>
              <input id="bredd"/>
            </form>
          </div>

          <div onChange={this.onChange.bind(this)}>
            <form>
              <h3>Adress för arbetet*</h3>
              <input id="address"/>

              <h3>Huset byggår*</h3>
              <input id="byggar"/>

              <h3>Rummets bredd*</h3>
              <input id="bredd"/>
            </form>
          </div>

          <div onChange={this.onChange.bind(this)}>
            <form>
              <h3>Rummets längd*</h3>
              <input id="langd"/>

              <h3>Takhöjd, vid snedtak ange högsta och lägsta punkt*</h3>
              <input id="byggar"/>

              <h3>Ev. fönster, bredd x höjd</h3>
              <input id="bredd"/>
            </form>
          </div>

          <div onChange={this.onChange.bind(this)}>
            <form>
              <h2>Underarbeten</h2>

              <h3>Antal brunnar i det befintliga badrummet</h3>
              <input id="brunnar"/>

              <h3>Läge i fastigheten *</h3>
              <input id="lage"/>

              <h3>Vattenrör *</h3>
              <input id="vattenror"/>

              <h3>Väggmaterial bakom ytskikt *</h3>
              <input id="material"/>

              <h3>Ytskikt på vägg i det befintliga badrummet *</h3>
              <input id="ytskiktVagg"/>

              <h3>Ytskikt på golv i befintligt badrum *</h3>
              <input id="ytskiktGolv"/>

              <h3>Golvvärme i det befintliga badrummet *</h3>
              <input id="golvvarme"/>

              <h3>Handdukstork eller element i det befintliga badrummet</h3>
              <input id="handdukstork"/>

              <h3>Inredning i det befintliga badrummet</h3>
              <input id="inredning"/>

              <h3>Övrigt, Skriv här om det är något du vill informera om ang. de besvarade frågorna.</h3>
              <input id="ovrigt"/>

            </form>
          </div>

          <div onChange={this.onChange.bind(this)}>
            <form>
              <h2>Nya badrummet</h2>

              <h3>Ytskikt på golv i det nya badrummet *</h3>
              <input id="brunnar"/>

              <h3>Golvvärme i det nya badrummet. OBS ! fungerar även med våtrumsmatta *</h3>
              <input id="lage"/>

              <h3>Önsskad inredning i det nya badrummet. I kalkylen lämnas inget förslag på inredning men det är viktigt att veta vad som önskas *</h3>
              <input id="vattenror"/>

              <h3>Element eller handdukstork i det nya badrummet *</h3>
              <input id="material"/>

              <h3>Övrigt. Beskriv här allt som kan vara av vikt för oss då vi skall beräkna kostnaden. Ju mer vi vet desto bättre blir kalkylens träffsäkerhet</h3>
              <input id="ytskiktVagg"/>

              <h3>Filuppladdning</h3>
              <input id="ytskiktGolv"/>
            </form>
          </div>
          <div><figure className="next"/></div>
        </section>

        <div onClick={this.minimizeDiv.bind(this)} className="minimizeBorder">
          <img src="assets/arrows/minimizeArrow.svg"/>
           <p>Minimera</p>
          <img src="assets/arrows/minimizeArrow.svg"/>
        </div>

      </div>
    )
  }
}
