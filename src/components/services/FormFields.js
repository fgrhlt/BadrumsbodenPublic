import React, { Component } from 'react'
import axios from 'axios'
import flat from 'flat'

import {replaceSpecialCharactersCheckbox, replaceSpecialCharacters, createLineBreak} from '../../utils/Utils'
import ReactTooltip from 'react-tooltip'

require('../../styles/_servicesPage/formFields.css')

class FirstSet extends Component {
  render() {
    return (
      <div className="fieldWrapper three">
        <div>
          <h4>För- och efternamn*</h4>
          <input
            ref="Namn"
            defaultValue={this.props.form.Namn}
            type="text"
            />

          <h4>Telefon*</h4>
          <input
            ref="Telefon"
            defaultValue={this.props.form.Telefon}
            type="text"
            />

          <h4>E-post*</h4>
          <input
            ref="Epost"
            defaultValue={this.props.form.Epost}
            type="text"
            />
        </div>

        <div>
          <h4>Adress <span>för arbetet*</span></h4>
          <input
            ref="Adress"
            defaultValue={this.props.form.Adress}
            type="text"
            />

          <h4>Huset byggår*</h4>
          <input
            ref="Byggår"
            defaultValue={this.props.form.Byggår}
            type="text"
            />

          <h4>Rummets bredd*</h4>
          <input
            ref="Bredd"
            defaultValue={this.props.form.Bredd}
            type="text"
            />
        </div>

        <div>
          <h4>Rummets längd*</h4>
          <input
            ref="Längd"
            defaultValue={this.props.form.Längd}
            type="text"
            />

          <Tooltip heading="Takhöjd*" tooltip="Vid snedtak, ange högsta och lägsta punkt" />
          <input
            ref="Takhöjd"
            defaultValue={this.props.form.Takhöjd}
            type="text"
            />

          <h4>Ev. fönster <span>Bredd x Höjd</span></h4>
          <input
            ref="Fönster"
            defaultValue={this.props.form.Fönster}
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
    let vagg = form.VäggmaterialBefintligtBadrum
    let golv = form.GolvmaterialBefintligtBadrum
    return (
      <div className="fieldWrapper">
        <div>
          <h4>Antal brunnar* <span>I det befintliga badrummet</span></h4>
          <input
            ref="Brunnar"
            defaultValue={form.Brunnar}
            type="text"
            />

          <h4>Läge i fastigheten*</h4>
          <select ref="Läge" defaultValue={form.Läge}>
            <option value="Källare">Källare</option>
            <option value="Bottenvåning">Bottenvåning</option>
            <option value="Övervåning">Övervåning</option>
            <option value="Hyreshus">Hyreshus med flera våningar</option>
          </select>

          <h4>Vattenrör*</h4>
          <select ref="Vattenrör" defaultValue={form.Vattenrör}>
            <option value="Synliga">Synliga</option>
            <option value="Osynliga">Kommer ut från vägg (osynliga)</option>
          </select>
        </div>

        <div>
          <h4>Väggmaterial <span>bakom ytskikt*</span></h4>
          <div className="checkboxes" ref="VäggmaterialBefintligtBadrum" required>
            <Checkbox name="Betong" checked={vagg ? vagg.Betong:null}/>
            <Checkbox name="Gipsskivor" checked={vagg ? vagg.Gipsskivor:null}/>
            <Checkbox name="Murad vägg" checked={vagg ? vagg.Murad_vägg:null}/>
            <Checkbox name="Annat väggmaterial" checked={vagg ? vagg.Annat_väggmaterial:null}/>
          </div>

          <h4>Golvmaterial <span>bakom ytskikt*</span></h4>
          <div className="checkboxes" ref="GolvmaterialBefintligtBadrum">
            <Checkbox name="Träbjälklag" checked={golv ? golv.Träbjälklag:null}/>
            <Checkbox name="Betonggolv" checked={golv ? golv.Betonggolv:null} />
            <Checkbox name="Annat" checked={golv ? golv.Annat:null}/>
          </div>
        </div>
      </div>
    );
  }
}
class ThirdSet extends Component {
  render() {
    let form = this.props.form
    let vagg = form.YtskiktVÄggBefintligtBadrum
    let golv = form.YtskiktGolvBefintligtBadrum
    let handdukstork = form.HanddukstorkElementBefintligtBadrum

    return (
      <div className="fieldWrapper">
        <div>
          <Tooltip heading="Ytskikt på vägg*" tooltip="I det befintliga badrummet" />
          <div className="checkboxes" ref="YtskiktVÄggBefintligtBadrum">
            <Checkbox name="Tapet" checked={vagg ? vagg.Tapet:null}/>
            <Checkbox name="Kakel" checked={vagg ? vagg.Kakel:null}/>
            <Checkbox name="Annat ytskikt" checked={vagg ? vagg.Annat_ytskikt:null} />
          </div>

          <Tooltip heading="Ytskikt på golv*" tooltip="I det befintliga badrummet" />
          <div className="checkboxes" ref="YtskiktGolvBefintligtBadrum">
            <Checkbox name="Våtrumsmatta" checked={golv ? golv.Våtrumsmatta:null} />
            <Checkbox name="Klinker" checked={golv ? golv.Klinker:null} />
            <Checkbox name="Annat" checked={golv ? golv.Annat:null} />
          </div>
        </div>

        <div>
          <Tooltip heading="Golvvärme*" tooltip="I det befintliga badrummet" />
          <select ref="Golvvärme" defaultValue={form.Golvvärme}>
            <option value="Elburen">Ja det finns, el-buren</option>
            <option value="Vattenburen">Ja det finns, vatten-buren</option>
            <option value="Ingen">Nej det finns ej</option>
          </select>

          <Tooltip heading="Handdukstork*" span=" eller element" tooltip="I det befintliga badrummet" />
          <div className="checkboxes" ref="HanddukstorkElementBefintligtBadrum">
            <Checkbox name="Element, elburet" checked={handdukstork ? handdukstork.Element_elburet:null} />
            <Checkbox name="Element, vattenburet" checked={handdukstork ? handdukstork.Element_vattenburet:null} />
            <Checkbox name="Inget element" checked={handdukstork ? handdukstork.Inget_element:null} />
            <Checkbox name="Handdukstork" checked={handdukstork ? handdukstork.Handdukstork:null}/>
            <Checkbox name="Ingen handdukstork" checked={handdukstork ? handdukstork.Ingen_handdukstork:null} />
          </div>
        </div>
      </div>
    );
  }
}
class FourthSet extends Component {
  render() {
    let form = this.props.form
    let inredning = form.InredningBefintligtBadrum
    return (
      <div className="fieldWrapper">
        <div>
          <h4>Inredning <span>i det befintliga badrummet</span></h4>
          <div className="checkboxes" ref="InredningBefintligtBadrum">
            <Checkbox name="WC stol" checked={inredning ? inredning.WC_stol:null}/>
            <Checkbox name="Bidé" checked={inredning ? inredning.Bidé:null}/>
            <Checkbox name="Duschplats" checked={inredning ? inredning.Duschplats:null} />
            <Checkbox name="Badkar" checked={inredning ? inredning.Badkar:null}/>
            <Checkbox name="Tvättställ" checked={inredning ? inredning.Tvättställ:null}/>
            <Checkbox name="Tvättmaskin" checked={inredning ? inredning.Tvättmaskin:null}/>
            <Checkbox name="Torktumlare" checked={inredning ? inredning.Torktumlare:null}/>
            <Checkbox name="Torkskåp" checked={inredning ? inredning.Torkskåp:null}/>
            <Checkbox name="Tvättbänk" checked={inredning ? inredning.Tvättbänk:null}/>
          </div>
        </div>

        <div>
          <Tooltip
            heading="Övrigt"
            tooltip={'Skriv här om det är något du vill informera \nom angående de besvarade frågorna'}
            />
          <textarea ref="Övrigt" defaultValue={form.Övrigt}/>
        </div>
      </div>
    );
  }
}
class FifthSet extends Component {
  render() {
    let form = this.props.form
    let vagg = form.YtskiktVäggNyaBadrummet
    let golv = form.YtskiktGolvNyaBadrummet
    let element = form.ElementHanddukstorkNyaBadrummet
    return (
      <div className="fieldWrapper">
        <div>
          <h4>Ytskikt på vägg* <span>i det nya badrummet</span></h4>
          <div className="checkboxes" ref="YtskiktVäggNyaBadrummet">
            <Checkbox name="Våtrumsmatta" checked={vagg ? vagg.Våtrumsmatta:null}/>
            <Checkbox name="Kakel" checked={vagg ? vagg.Kakel:null}/>
            <Checkbox name="Våtrumsskivor" checked={vagg ? vagg.Våtrumsskivor:null}/>
            <Checkbox name="Annat ytskikt" checked={vagg ? vagg.Annat_ytskikt:null}/>
          </div>

          <h4>Ytskikt på golv* <span>i det nya badrummet</span></h4>
          <div className="checkboxes" ref="YtskiktGolvNyaBadrummet">
            <Checkbox name="Våtrumsmatta golv" checked={golv ? golv.Våtrumsmatta_golv:null}/>
            <Checkbox name="Klinker" checked={golv ? golv.Klinker:null}/>
            <Checkbox name="Annat" checked={golv ? golv.Annat:null}/>
          </div>
        </div>

        <div>
          <Tooltip
            heading="Golvvärme*"
            span="i det nya badrummet"
            tooltip="OBS! fungerar även med våtrumsmatta"
            />
          <select ref="GolvvärmeNyaBadrummet" defaultValue={form.GolvvärmeNyaBadrummet}>
            <option value="Elburen">Ja det finns, el-buren</option>
            <option value="Vattenburen">Ja det finns, vattenburen</option>
            <option value="Ingen">Nej det finns ej</option>
          </select>

          <Tooltip
            heading="Element eller handdukstork*"
            tooltip="I det nya badrummet"
            />
          <div className="checkboxes" ref="ElementHanddukstorkNyaBadrummet">
            <Checkbox name="Element" checked={element ? element.Element:null}/>
            <Checkbox name="Handdukstork" checked={element ? element.Handdukstork:null}/>
            <Checkbox name="Ej element" checked={element ? element.Ej_element:null} />
            <Checkbox name="Ej handdukstork"  checked={element ? element.Ej_handdukstork:null}/>
          </div>
        </div>
      </div>
    );
  }
}
class SixthSet extends Component {
  setFile(e) {
    let fileName = e.target.files[0].name
    this.refs.fileHolder.value = fileName
    let file = e.target.files[0]
    this.props.getFile(file)
  }

  render() {
    let form = this.props.form
    let inredning = form.ÖnskadInredningNyaBadrummet
    return (
      <div className="fieldWrapper">
        <div>
          <Tooltip
            heading="Önskad inredning*"
            span="i det nya badrummet"
            tooltip= {'I kalkylen lämnas inget förslag på inredning \nmen det är viktigt att veta vad som önskas av dig'}
            />
          <div className="checkboxes" ref="ÖnskadInredningNyaBadrummet">
            <Checkbox name="WC stol" checked={inredning ? inredning.WC_stol:null}/>
            <Checkbox name="Bidé" checked={inredning? inredning.Bidé:null}/>
            <Checkbox name="Duschplats" checked={inredning ? inredning.Duschplats:null}/>
            <Checkbox name="Badkar" checked={inredning ? inredning.Badkar:null}/>
            <Checkbox name="Tvättställ" checked={inredning ? inredning.Tvättställ:null}/>
            <Checkbox name="Tvättställ med underskåp" checked={inredning ? inredning.Tvättställ_med_underskåp:null}/>
            <Checkbox name="Tvättmaskin" checked={inredning ? inredning.Tvättmaskin:null}/>
            <Checkbox name="Torktumlare" checked={inredning ? inredning.Torktumlare:null}/>
            <Checkbox name="Torkskåp" checked={inredning ? inredning.Torkskåp:null}/>
            <Checkbox name="Tvättbänk" checked={inredning ? inredning.Tvättbänk:null}/>
          </div>
        </div>

        <div>
          <Tooltip
            heading="Övrigt"
            tooltip={'Beskriv allt som kan vara av vikt för oss då vi ska\n beräkna kostnaden. \n\n' +
              'Ju mer vi vet desto bättre blir kalkylens träffsäkerhet'}
              />
            <textarea className="half" ref="ÖvrigtNyaBadrummet" defaultValue={this.props.form.ÖvrigtNyaBadrummet} />

            <Tooltip
              heading="Filuppladdning"
              tooltip={'Du får gärna skicka med en ritning eller bilder på badrummet.\n Här kan du ladda upp en fil på skannad ritning eller bild du önskar bifoga. \n\nDu kan även maila bilder till info@badrumsboden.se'}
                />
            <span className="fileInfo">Alla filtyper stöds, maxstorlek 15 mb </span>
            <div id="imageUploadContainer">
              <input disabled="disabled" ref="fileHolder" id="fileHolder" className="fileHolder" />
              <input type="file" ref="bild" id="picUpload" className="picUpload" onChange={this.setFile.bind(this)} />
              <label htmlFor="picUpload">Välj fil</label>
            </div>
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
    let name = replaceSpecialCharactersCheckbox(this.props.name)
    return (
      <div>
        <input
          type="checkbox"
          id={name}
          onChange={this.toggleCheckbox.bind(this)}
          defaultChecked={this.state.isChecked == "true"}
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

        if(inputField == "file") {
          inputValues[inputField] = inputFields[inputField].files[0]
        }

        if(inputFields[inputField].className == 'checkboxes') {
          checkboxValues = {}

          /* Go into the checkbox wrapper div */
          for(let checkbox in inputFields[inputField].childNodes) {
            let checkboxes = inputFields[inputField].childNodes
            /* Take away stuff that isn't checkbox inputs */
            if(checkboxes[checkbox].firstChild != null) {

              let checkboxId = checkboxes[checkbox].firstChild.id
              checkboxValues[checkboxId] = checkboxes[checkbox].firstChild.checked.toString()
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
      this.setState({
        complete:false
      })
      let first = this.state.formSet.first
      if(first.namn == '' && first.epost == '' && first.telefon == '' && first.adress == '') {
        this.props.setResponseType('error', 'Du måste fylla i namn, telefonnummer, epost och adress för att kunna skicka en priskalkyl')
      }
      else {
        var filedata = new FormData();
        let data = flat(this.state.formSet)
        let file = this.state.file

        if(file != '') {
          filedata.append('file', file);
        }

        var formattedData = JSON.stringify(data);
        filedata.append('data', formattedData);

        axios.post('/email/priskalkyl', filedata)
        .then(function (response) {
            console.log('response', response);
            if(response.data == "accepted") {
              this.props.setResponseType('message')
            }
          }.bind(this))
          .catch(function (error) {
            console.log(error);
            this.props.setResponseType('error', 'Försök igen eller hör av dig till oss på info@badrumsboden.se')
          }.bind(this));
      }
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

  getFile(file) {
    this.setState({ file })
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
                  <SixthSet ref="sixth" getFile={this.getFile.bind(this)} form={this.state.formSet['sixth']}/>
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
