import React, { Component } from 'react'
import { browserHistory } from 'react-router'

require('styles/_landingPage/departmentPicker.css')

export default class departmentPicker extends Component {

  onClickWebshop() {
    browserHistory.push('/webshop')
  }
  onClickServices() {
    browserHistory.push('/services')
  }

  render() {

    return (
      <div id="departmentPicker">
        <div className="mobileInfo">
        </div>
        <section name="lostContainer">
          <div onClick={this.onClickWebshop.bind(this)}>
            <h1>Webbshop</h1>
            <div><figure /></div>
          </div>

          <div onClick={this.onClickServices.bind(this)}>
            <h1>Tjänster</h1>
            <div><figure /></div>
          </div>
        </section>
      </div>
    )
  }
}
