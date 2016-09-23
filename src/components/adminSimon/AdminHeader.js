import React, { Component } from 'react'
import { browserHistory } from 'react-router'

require('styles/_adminSimon/adminHeader.css')

export default class AdminHeader extends Component {

  /* Get the text that's in the div being clicked. Push it to the router */
  handleClick(e) {
    var name = e.target.textContent.toLowerCase()
    browserHistory.push('/newAdmin/' + name)
  }

  render() {
    /* The header of the admin page. The two buttons get different background color depending on the URL */
    return (
      <div id="adminHeader">
        <section id="lostItems">
          <div>
            <figure id="logo" />
          </div>

          <div className={this.props.param=='webshop'?'yellow':'passive'} onClick={this.handleClick.bind(this)}>
            <h2>Webshop</h2>
          </div>

          <div className={this.props.param=='hemsida'?'bluegreen':'passive'} onClick={this.handleClick.bind(this)}>
            <h2>Hemsida</h2>
          </div>
        </section>
      </div>
    )
  }
}
