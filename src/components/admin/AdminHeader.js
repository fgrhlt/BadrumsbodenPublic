import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import {replaceSpecialCharactersURLs} from '../../utils/Utils'

import firebase from 'firebase/app'
require('firebase/auth')

require('../../styles/_adminSimon/adminHeader.css')

export default class AdminHeader extends Component {

  /* Get the text that's in the div being clicked. Push it to the router */
  handleClick(e) {
    var name = replaceSpecialCharactersURLs(e.target.textContent)
    browserHistory.push('/admin/' + name)
  }

  handleClickLogo(e) {
    browserHistory.push('/admin/')
  }

  handleSubmit(event) {
    event.preventDefault()

      const promise = firebase.auth().signOut()
      promise.catch( (e) => {console.log(e.message)})
  }

  render() {
    /* The header of the admin page. The two buttons get different background color depending on the URL */
    return (
      <div id="adminHeader">
        <section id="lostItems">
          <div>
            <button className="btn darkButton" onClick={this.handleSubmit.bind(this)}>Logga ut</button>
            <figure style={{cursor: 'pointer'}} onClick={this.handleClickLogo.bind(this)} id="logo" />
          </div>

          <div className={this.props.param=='webshop'?'yellow':'passive'} onClick={this.handleClick.bind(this)}>
            <h3>Webshop</h3>
          </div>

          <div className={this.props.param=='tjanster'?'bluegreen':'passive'} onClick={this.handleClick.bind(this)}>
            <h3>Tjänster</h3>
          </div>
        </section>
      </div>
    )
  }
}
