import React, { Component } from 'react'
import ComponentTitle from '../ComponentTitle'
require('styles/_adminSimon/_campaigns/banner.css')

export default class Banner extends Component {
  submitForm(e) {
      e.preventDefault()
      let heading = this.refs.heading.value
      let blueHeading = this.refs.blueHeading.value
      let description = this.refs.description.value
      console.log(heading)
      console.log(blueHeading)
      console.log(description)
  }

  render() {
    return (
      <div id="adminBanner">
        <ComponentTitle
          title={"Banner"}
          text={"Här kan du ändra texten till den banner som finns i webshoppen. \n" +
                "Här nedan syns en förhandsvisning på hur den ser ut."}
        />
        <div id="container">
          <form onSubmit={this.submitForm.bind(this)}>
            <div id="banner">
              <div>
                <input
                  type="text"
                  defaultValue="Köp nu, betala i slutet av augusti!"
                  ref="heading"
                />
                <input
                  type="text"
                  defaultValue="0% ränta"
                  ref="blueHeading"
                />
                <input
                  type="text"
                  defaultValue="Endest en erläggningsavgift på 29:- tillkommer"
                  ref="description"
                />
              </div>
            </div>

            <input type="submit" className="btn greenButton" value="Spara" />
          </form>
        </div>
      </div>
    )
  }
}
