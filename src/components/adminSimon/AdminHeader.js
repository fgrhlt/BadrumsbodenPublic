import React, { Component } from 'react'
import { browserHistory } from 'react-router'

require('styles/_adminSimon/adminHeader.css')

export default class AdminHeader extends Component {
  handleClick(e) {
    var name = e.target.textContent.toLowerCase()
    browserHistory.push('/admin/' + name)
  }
  render() {
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
        {console.log(this.props.param)}
      </div>
    )
  }
}
