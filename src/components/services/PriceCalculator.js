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
    this.props.toggleDiv(false)
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

  underarbetenDiv() {
    return(<form onChange={this.onChange.bind(this)}>
              <h2>Underarbeten</h2>

              <h3>Antal brunnar i det befintliga badrummet</h3>
              <input id="brunnar"/>

              <h3>Läge i fastigheten *</h3>
              <select id="laget">
                <option value="kallare">Källare</option>
                <option value="bottenvaning">Bottenvåning</option>
                <option value="overvaning">Övervåning</option>
                <option value="hyreshus">Hyreshus med flera våningar</option>
              </select>

              <h3>Vattenrör *</h3>
              <select id="vattenror">
                <option value="synliga">Synliga</option>
                <option value="franVagg">Kommer ut från vägg (osynliga)</option>
              </select>

              <h3>Väggmaterial bakom ytskikt *</h3>
              <input type="checkbox" id="betong"/>
              <input type="checkbox" id="gipsskivor"/>
              <input type="checkbox" id="muradVagg"/>
              <input type="checkbox" id="vetEj"/>

              <h3>Golvmaterial bakom ytskikt *</h3>
              <input type="checkbox" id="trabjalklag"/>
              <input type="checkbox" id="betong"/>
              <input type="checkbox" id="annat"/>

              <h3>Ytskikt på vägg i det befintliga badrummet *</h3>
              <input type="checkbox" id="tapet"/>
              <input type="checkbox" id="kakel"/>
              <input type="checkbox" id="annat"/> {/*samma ID som andra divar*/}

              <h3>Ytskikt på golv i befintligt badrum *</h3>
              <input type="checkbox" id="vatrumsmatta"/>
              <input type="checkbox" id="klinker"/>
              <input type="checkbox" id="annat"/>

              <h3>Golvvärme i det befintliga badrummet *</h3>
              <select id="golvvarme">
                <option value="synliga">Ja det finns, el-buren</option>
                <option value="franVagg">Ja det finns, vatten-buren</option>
                <option value="franVagg">Nej det finns ej</option>
              </select>

              <h3>Handdukstork eller element i det befintliga badrummet</h3>
              <input type="checkbox" id="elementElburetFinns"/>
              <input type="checkbox" id="elementVattenburetFinns"/>
              <input type="checkbox" id="elementFinnsEj"/>
              <input type="checkbox" id="handdukstorkFinns"/>
              <input type="checkbox" id="handdukstorkFinnsEj"/>

              <h3>Inredning i det befintliga badrummet</h3>
              <input type="checkbox" id="wcStol"/>
              <input type="checkbox" id="bide"/>
              <input type="checkbox" id="duschplats"/>
              <input type="checkbox" id="badkar"/>
              <input type="checkbox" id="tvattstall"/>
              <input type="checkbox" id="tvattstallmedUnderskap"/>
              <input type="checkbox" id="tvattmaskin"/>
              <input type="checkbox" id="torktumlare"/>
              <input type="checkbox" id="torkskap"/>
              <input type="checkbox" id="tvattbank"/>

              <h3>Övrigt, Skriv här om det är något du vill informera om ang. de besvarade frågorna.</h3>
              <input id="ovrigt"/>
            </form>)
  }

  nyaBadrummetDiv() {
    return  (<form onChange={this.onChange.bind(this)}>
              <h2>Nya badrummet</h2>

              <h3>Ytskikt på vägg i det nya badrummet *</h3>
              <input type="checkbox" id="vatrumsmatta"/>
              <input type="checkbox" id="kakel"/>
              <input type="checkbox" id="vatrumsskivor"/>
              <input type="checkbox" id="annat"/>

              <h3>Ytskikt på golv i det nya badrummet *</h3>
              <input type="checkbox" id="vatrumsmatta"/>
              <input type="checkbox" id="klinker"/>
              <input type="checkbox" id="annat"/>

              <h3>Golvvärme i det nya badrummet. OBS ! fungerar även med våtrumsmatta *</h3>
              <select id="nyabadrummet">
                <option value="synliga">Ja det finns, el-buren</option>
                <option value="franVagg">Ja det finns, vatten-buren</option>
                <option value="franVagg">Nej det finns ej</option>
              </select>

              <h3>Önsskad inredning i det nya badrummet. I kalkylen lämnas inget förslag på inredning men det är viktigt att veta vad som önskas *</h3>
              <input type="checkbox" id="wcStol"/>
              <input type="checkbox" id="bide"/>
              <input type="checkbox" id="duschplats"/>
              <input type="checkbox" id="badkar"/>
              <input type="checkbox" id="tvattstall"/>
              <input type="checkbox" id="tvattstallmedUnderskap"/>
              <input type="checkbox" id="tvattmaskin"/>
              <input type="checkbox" id="torktumlare"/>
              <input type="checkbox" id="torkskap"/>
              <input type="checkbox" id="tvattbank"/>

              <h3>Element eller handdukstork i det nya badrummet *</h3>
              <input type="checkbox" id="jaElementOnskas"/>
              <input type="checkbox" id="nejElementOnskasEj"/>
              <input type="checkbox" id="jaHanddukstorkOnskas"/>
              <input type="checkbox" id="nejHandduksstorkOnskasEj"/>

              <h3>Övrigt. Beskriv här allt som kan vara av vikt för oss då vi skall beräkna kostnaden. Ju mer vi vet desto bättre blir kalkylens träffsäkerhet</h3>
              <input id="ytskiktVagg"/>

              <h3>Filuppladdning</h3>
              <input id="ytskiktGolv"/>
            </form>)
  }

  inledningDiv() {
    return  (<form onChange={this.onChange.bind(this)}>
              <h3> Namn*</h3>
              <input id="namn"/>

              <h3>Telefonnummer*</h3>
              <input id="telefon"/>

              <h3 >E-post*</h3>
              <input id="email"/>


              <h3>Adress för arbetet*</h3>
              <input id="address"/>

              <h3>Huset byggår*</h3>
              <input id="byggar"/>

              <h3>Rummets bredd*</h3>
              <input id="bredd"/>

              <h3>Adress för arbetet*</h3>
              <input id="address"/>

              <h3>Huset byggår*</h3>
              <input id="byggar"/>

              <h3>Rummets bredd*</h3>
              <input id="bredd"/>

              <h3>Rummets längd*</h3>
              <input id="langd"/>

              <h3>Takhöjd, vid snedtak ange högsta och lägsta punkt*</h3>
              <input id="byggar"/>

              <h3>Ev. fönster, bredd x höjd</h3>
              <input id="bredd"/>
            </form>)
  }

  render() {
    var styleVar = {
      backgroundImage: 'url(assets/images/services/pricecalc_blue_bg.svg)',
      backgroundPosition: 'right center'
    }

    return (
      <div className="service-form" id="priceCalc" style={styleVar}>

        <div>
          <h1>Priskalkyl för badrum</h1>
          <p>
            Välkommen att fylla i formuläret,
            så är du ett steg närmare dina drömmars badrum.
          </p>

        {this.nyaBadrummetDiv()}
        </div>

        <div onClick={this.minimizeDiv.bind(this)} className="minimizeBorder">
          <img src="assets/arrows/minimizeArrow.svg"/>
          <p>Minimera</p>
          <img src="assets/arrows/minimizeArrow.svg"/>
        </div>

      </div>
    )
  }
}
