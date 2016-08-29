import React, { Component } from 'react'

require('styles/_adminSimon/adminHeader.css')

export default class AdminHeader extends Component {

  render() {
    return (
      <div id="adminHeader">
        <section id="lostItems">
          <div>
            {/* }<figure id="logo" />{*/}
          </div>

          <div>
            <h2>Webshop</h2>
          </div>

          <div>
            <h2>Hemsida</h2>
          </div>
        </section>
      </div>
    )
  }
}
