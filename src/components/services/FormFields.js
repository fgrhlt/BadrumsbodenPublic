import React, { Component } from 'react'
import axios from 'axios'
import flat from 'flat'

import {replaceSpecialCharacters, createLineBreak} from '../../utils/Utils'
import ReactTooltip from 'react-tooltip'

require('styles/_servicesPage/formFields.css')

class FirstSet extends Component {
  render() {
    return (
      <div className="fieldWrapper three">
        <div>
          <h4>Namn*</h4>
          <input
            ref="namn"
            defaultValue={this.props.form.namn}
            type="text"
            />

          <h4>Telefon*</h4>
          <input
            ref="telefon"
            defaultValue={this.props.form.telefon}
            type="text"
            />

          <h4>E-post*</h4>
          <input
            ref="epost"
            defaultValue={this.props.form.epost}
            type="email"
            />
        </div>

        <div>
          <h4>Adress <span>för arbetet*</span></h4>
          <input
            ref="adress"
            defaultValue={this.props.form.adress}
            type="text"
            />

          <h4>Huset byggår*</h4>
          <input
            ref="byggar"
            defaultValue={this.props.form.byggar}
            type="text"
            />

          <h4>Rummets bredd*</h4>
          <input
            ref="bredd"
            defaultValue={this.props.form.bredd}
            type="text"
            />
        </div>

        <div>
          <h4>Rummets längd*</h4>
          <input
            ref="langd"
            defaultValue={this.props.form.langd}
            type="text"
            />

          <Tooltip heading="Takhöjd*" tooltip="Vid snedtak, ange högsta och lägsta punkt" />
          <input
            ref="takhojd"
            defaultValue={this.props.form.takhojd}
            type="text"
            />

          <h4>Ev. fönster <span>Bredd x Höjd</span></h4>
          <input
            ref="fonster"
            defaultValue={this.props.form.fonster}
            type="text"
            />
        </div>
      </div>
    );
  }
}
class SecondSet extends Component {
  render() {
    let form = this.props.form
    let vagg = form.vaggmaterialBefintligtBadrum
    let golv = form.golvmaterialBefintligtBadrum
    return (
      <div className="fieldWrapper">
        <div>
          <h4>Antal brunnar* <span>I det befintliga badrummet</span></h4>
          <input
            ref="brunnar"
            defaultValue={form.brunnar}
            type="text"
            />

          <h4>Läge i fastigheten*</h4>
          <select ref="lage" defaultValue={form.lage}>
            <option value="kallare">Källare</option>
            <option value="bottenvaning">Bottenvåning</option>
            <option value="overvaning">Övervåning</option>
            <option value="hyreshus">Hyreshus med flera våningar</option>
          </select>

          <h4>Vattenrör*</h4>
          <select ref="vattenror" defaultValue={form.lage}>
            <option value="synliga">Synliga</option>
            <option value="franVagg">Kommer ut från vägg (osynliga)</option>
          </select>
        </div>

        <div>
          <h4>Väggmaterial <span>bakom ytskikt*</span></h4>
          <div className="checkboxes" ref="vaggmaterialBefintligtBadrum" required>
            <Checkbox name="Betong" checked={vagg ? vagg.betong:null}/>
            <Checkbox name="Gipsskivor" checked={vagg ? vagg.gipsskivor:null}/>
            <Checkbox name="Murad vägg" checked={vagg ? vagg.muradvagg:null}/>
            <Checkbox name="Annat väggmaterial" checked={vagg ? vagg.annatvaggmaterial:null}/>
          </div>

          <h4>Golvmaterial <span>bakom ytskikt*</span></h4>
          <div className="checkboxes" ref="golvmaterialBefintligtBadrum">
            <Checkbox name="Träbjälklag" checked={golv ? golv.trabjalklag:null}/>
            <Checkbox name="Betonggolv" checked={golv ? golv.betonggolv:null} />
            <Checkbox name="Annat" checked={golv ? golv.annat:null}/>
          </div>
        </div>
      </div>
    );
  }
}
class ThirdSet extends Component {
  render() {
    let form = this.props.form
    let vagg = form.ytskiktVaggBefintligtBadrum
    let golv = form.ytskiktGolvBefintligtBadrum
    let handdukstork = form.handdukstorkElementBefintligtBadrum

    return (
      <div className="fieldWrapper">
        <div>
          <Tooltip heading="Ytskikt på vägg*" tooltip="I det befintliga badrummet" />
          <div className="checkboxes" ref="ytskiktVaggBefintligtBadrum">
            <Checkbox name="Tapet" checked={vagg ? vagg.tapet:null}/>
            <Checkbox name="Kakel" checked={vagg ? vagg.kakel:null}/>
            <Checkbox name="Annat Ytskikt" checked={vagg ? vagg.annatytskikt:null} />
          </div>

          <Tooltip heading="Ytskikt på golv*" tooltip="I det befintliga badrummet" />
          <div className="checkboxes" ref="ytskiktGolvBefintligtBadrum">
            <Checkbox name="Våtrumsmatta" checked={golv ? golv.vatrumsmatta:null} />
            <Checkbox name="Klinker" checked={golv ? golv.klinker:null} />
            <Checkbox name="Annat" checked={golv ? golv.annat:null} />
          </div>
        </div>

        <div>
          <Tooltip heading="Golvvärme*" tooltip="I det befintliga badrummet" />
          <select ref="golvvarme" defaultValue={form.golvvarme}>
            <option value="elburen">Ja det finns, el-buren</option>
            <option value="vattenburen">Ja det finns, vatten-buren</option>
            <option value="ingen">Nej det finns ej</option>
          </select>

          <Tooltip heading="Handdukstork*" span=" eller element" tooltip="I det befintliga badrummet" />
          <div className="checkboxes" ref="handdukstorkElementBefintligtBadrum">
            <Checkbox name="Element, elburet" checked={handdukstork ? handdukstork.elementelburet:null} />
            <Checkbox name="Element, vattenburet" checked={handdukstork ? handdukstork.elementvattenburet:null} />
            <Checkbox name="Inget element" checked={handdukstork ? handdukstork.ingetelement:null} />
            <Checkbox name="Handdukstork" checked={handdukstork ? handdukstork.handdukstork:null}/>
            <Checkbox name="Ingen handdukstork" checked={handdukstork ? handdukstork.ingenhanddukstork:null} />
          </div>
        </div>
      </div>
    );
  }
}
class FourthSet extends Component {
  render() {
    let form = this.props.form
    let inredning = form.inredningBefintligtBadrum
    return (
      <div className="fieldWrapper">
        <div>
          <h4>Inredning <span>i det befintliga badrummet</span></h4>
          <div className="checkboxes" ref="inredningBefintligtBadrum">
            <Checkbox name="WC stol" checked={inredning ? inredning.wcstol:null}/>
            <Checkbox name="Bidé" checked={inredning ? inredning.bide:null}/>
            <Checkbox name="Duschplats" checked={inredning ? inredning.duschplats:null} />
            <Checkbox name="Badkar" checked={inredning ? inredning.badkar:null}/>
            <Checkbox name="Tvättställ" checked={inredning ? inredning.tvattstall:null}/>
            <Checkbox name="Tvättmaskin" checked={inredning ? inredning.tvattmaskin:null}/>
            <Checkbox name="Torktumlare" checked={inredning ? inredning.torktumlare:null}/>
            <Checkbox name="Torkskåp" checked={inredning ? inredning.torkskap:null}/>
            <Checkbox name="Tvättbänk" checked={inredning ? inredning.tvattbank:null}/>
          </div>
        </div>

        <div>
          <Tooltip
            heading="Övrigt"
            tooltip={'Skriv här om det är något du vill informera \nom angående de besvarade frågorna'}
            />
          <textarea ref="ovrigt" defaultValue={form.ovrigt}/>
        </div>
      </div>
    );
  }
}
class FifthSet extends Component {
  render() {
    let form = this.props.form
    let vagg = form.ytskiktVaggNyaBadrummet
    let golv = form.ytskiktGolvNyaBadrummet
    let element = form.elementHanddukstorkNyaBadrummet
    return (
      <div className="fieldWrapper">
        <div>
          <h4>Ytskikt på vägg* <span>i det nya badrummet</span></h4>
          <div className="checkboxes" ref="ytskiktVaggNyaBadrummet">
            <Checkbox name="Våtrumsmatta" checked={vagg ? vagg.vatrumsmatta:null}/>
            <Checkbox name="Kakel" checked={vagg ? vagg.kakel:null}/>
            <Checkbox name="Våtrumsskivor" checked={vagg ? vagg.vatrumsskivor:null}/>
            <Checkbox name="Annat ytskikt" checked={vagg ? vagg.annatytskikt:null}/>
          </div>

          <h4>Ytskikt på golv* <span>i det nya badrummet</span></h4>
          <div className="checkboxes" ref="ytskiktGolvNyaBadrummet">
            <Checkbox name="Våtrumsmatta golv" checked={golv ? golv.vatrumsmattagolv:null}/>
            <Checkbox name="Klinker" checked={golv ? golv.klinker:null}/>
            <Checkbox name="Annat" checked={golv ? golv.annat:null}/>
          </div>
        </div>

        <div>
          <Tooltip
            heading="Golvvärme*"
            span="i det nya badrummet"
            tooltip="OBS! fungerar även med våtrumsmatta"
            />
          <select ref="golvvarmeNyaBadrummet" defaultValue={form.golvvarmeNyaBadrummet}>
            <option value="elburen">Ja det finns, el-buren</option>
            <option value="vattenburen">Ja det finns, vattenburen</option>
            <option value="ingen">Nej det finns ej</option>
          </select>

          <Tooltip
            heading="Element eller handdukstork*"
            tooltip="I det nya badrummet"
            />
          <div className="checkboxes" ref="elementHanddukstorkNyaBadrummet">
            <Checkbox name="Element" checked={element ? element.element:null}/>
            <Checkbox name="Handdukstork" checked={element ? element.handdukstork:null}/>
            <Checkbox name="Ej element" checked={element ? element.ejelement:null} />
            <Checkbox name="Ej handdukstork"  checked={element ? element.ejhanddukstork:null}/>
          </div>
        </div>
      </div>
    );
  }
}
class SixthSet extends Component {
  render() {
    let form = this.props.form
    let inredning = form.onskadInredningNyaBadrummet
    return (
      <div className="fieldWrapper">
        <div>
          <Tooltip
            heading="Önskad inredning*"
            span="i det nya badrummet"
            tooltip= {'I kalkylen lämnas inget förslag på inredning \nmen det är viktigt att veta vad som önskas av dig'}
            />
          <div className="checkboxes" ref="onskadInredningNyaBadrummet">
            <Checkbox name="WC stol" checked={inredning ? inredning.wcstol:null}/>
            <Checkbox name="Bidé" checked={inredning? inredning.bide:null}/>
            <Checkbox name="Duschplats" checked={inredning ? inredning.duschplats:null}/>
            <Checkbox name="Badkar" checked={inredning ? inredning.badkar:null}/>
            <Checkbox name="Tvättställ" checked={inredning ? inredning.tvattstall:null}/>
            <Checkbox name="Tvättställ med underskåp" checked={inredning ? inredning.tvattstallmedunderskap:null}/>
            <Checkbox name="Tvättmaskin" checked={inredning ? inredning.tvattmaskin:null}/>
            <Checkbox name="Torktumlare" checked={inredning ? inredning.torktumlare:null}/>
            <Checkbox name="Torkskåp" checked={inredning ? inredning.torkskap:null}/>
            <Checkbox name="Tvättbänk" checked={inredning ? inredning.tvattbank:null}/>
          </div>
        </div>

        <div>
          <Tooltip
            heading="Övrigt"
            tooltip={'Beskriv allt som kan vara av vikt för oss då vi ska\n beräkna kostnaden. \n\n' +
              'Ju mer vi vet desto bättre blir kalkylens träffsäkerhet'}
              />
            <textarea className="half" ref="ovrigtNyaBadrummet" defaultValue={this.props.form.ovrigtNyaBadrummet} />

            <h4>Filuppladdning</h4>
            <input type="file" ref="file" />
          </div>
        </div>
      );
    }
  }

/* Help class to render new checkboxes with the custom css-styling */
export class Checkbox extends Component {
  componentWillMount() {
    this.state = {
      isChecked: this.props.checked
    }
  }
  toggleCheckbox() {
    this.setState({
      isChecked: !this.state.isChecked
    })
  }
  render() {
    let name = replaceSpecialCharacters(this.props.name)
    return (
      <div>
        <input
          type="checkbox"
          id={name}
          onChange={this.toggleCheckbox.bind(this)}
          defaultChecked={this.state.isChecked}
          />
        <label htmlFor={name}>{this.props.name}</label>
      </div>
    )}
  }

/* Help class to render a heading to each input field with tooltip */
export class Tooltip extends Component {
  render() {
    let idName = replaceSpecialCharacters(this.props.heading)
    return (
      <div className="tooltipFormFields">
        <h4>{this.props.heading} <span>{this.props.span}</span></h4>
        <figure data-tip data-for={idName} />
        <ReactTooltip id={idName} type='light' multiline={true} place='left'>
          {createLineBreak(this.props.tooltip)}
        </ReactTooltip>
      </div>
    )}
  }

/* The holder for all the form fields. Hides the ones that does not correspond to
* the value of the counter. */
export default class FormFields extends Component {
  componentWillMount() {
    this.state = {
      formSet: {
        'first': {},
        'second': {},
        'third': {},
        'fourth': {},
        'fifth': {},
        'sixth': {},
      },
      complete: false
    }
  }

  /* Gets the subform that is currently displaying (firstForm, secondForm...)
  * and collects all the values inside. Then puts the values in the correct
  * state. */
  submitForm(e) {
    e.preventDefault()
    let inputValues = {}
    let checkboxValues = {}
    let id = ''

    /* The form set active (firstSet, secondSet ...) */
    for (let formSet in this.refs) {
      id = formSet

      /* Each input field in set */
      for (let inputField in this.refs[formSet].refs) {

        let inputFields = this.refs[formSet].refs
        inputValues[inputField] = inputFields[inputField].value

        if(inputFields[inputField].className == 'checkboxes') {
          checkboxValues = {}

          /* Go into the checkbox wrapper div */
          for(let checkbox in inputFields[inputField].childNodes) {
            let checkboxes = inputFields[inputField].childNodes
            /* Take away stuff that isn't checkbox inputs */
            if(checkboxes[checkbox].firstChild != null) {

              let checkboxId = checkboxes[checkbox].firstChild.id
              checkboxValues[checkboxId] = checkboxes[checkbox].firstChild.checked
            }
          }
          inputValues[inputField] = checkboxValues
        }
      }
    }
    /* Get the current state and update the correct sub-form (first, second...) */
    let currentState = this.state.formSet
    currentState[id] = inputValues
    this.setState({
      formSet: currentState
    })

    /* If the last button is pressed and the form is complete, send to the admin email */
    if(this.state.complete == true) {
      console.log("Skicka detta i mail", flat(this.state.formSet))

      // axios({
      //   method: 'post',
      //   url: 'https://shrouded-plateau-50284.herokuapp.com/email/priskalkyl',
      //   data: flat(this.state.formSet)
      // })
    }
  }

  /* Used by the arrow to submit the current form and to go back or forth */
  clickSubmitButton(direction) {
    document.getElementById('submitButton').click()
    this.setState({
      complete: false
    })

    if(direction == "back") {
      this.props.decreaseStepCounter()
    }
    else if (direction == "forward") {
      this.props.increaseStepCounter()
    }
    // If the last button is clicked, the form is complete
    else if(direction == "last") {
      this.setState({
        complete:true
      })
    }
  }

  render() {
    return(
      <div id="formFields">
        <div className="arrowHolder">
          {this.props.counter > 1 ?
            <figure className="arrow previous" onClick={this.clickSubmitButton.bind(this, "back")}/>
            :<div className="empty" />}
          </div>

          <div className="inputHolder">
            <form onSubmit={this.submitForm.bind(this)} name="badrumsrenovering">
              {this.props.counter == 1 ? <FirstSet ref="first" form={this.state.formSet['first']}/>: null}
              {this.props.counter == 2 ? <SecondSet ref="second" form={this.state.formSet['second']}/> : null}
              {this.props.counter == 3 ? <ThirdSet ref="third" form={this.state.formSet['third']}/>: null}
              {this.props.counter == 4 ? <FourthSet ref="fourth" form={this.state.formSet['fourth']}/>: null}
              {this.props.counter == 5 ? <FifthSet ref="fifth" form={this.state.formSet['fifth']}/>: null}
              {this.props.counter == 6 ?
                <div>
                  <SixthSet ref="sixth" form={this.state.formSet['sixth']}/>
                  <button className="btn orangeButton" onClick={this.clickSubmitButton.bind(this, "last")}>Skicka priskalkyl</button>
                </div>
                : null}

                <input type="submit" hidden="true" id="submitButton" />
              </form>
            </div>

            <div className="arrowHolder">
              {this.props.counter < 6 ?
                <figure className="arrow" onClick={this.clickSubmitButton.bind(this, "forward")}/>
                :<div className="empty"/>}
              </div>
            </div>
          )
        }
      }
