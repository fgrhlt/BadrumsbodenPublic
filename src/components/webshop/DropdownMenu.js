import React, { Component } from 'react'
import { browserHistory } from 'react-router'

require('styles/_webshopPage/dropdownMenu.css')

export default class DropdownMenu extends Component {

  clickHandler() {
    var category = 'aggregat'
    browserHistory.push('/webshop/'+category)
  }

  render() {
    return (
      <div>
          <div id="menu">
              <div>Badrumsinredning
                <section>
                  <div id="aggregat" onClick={this.clickHandler.bind(this)}>Aggregat</div>
                  <div>Bastudörrar</div>
                  <div>Lampor</div>
                  <div>Batterier</div>
                </section>
              </div>


              <div>Dusch och badkar
                <section>
                  <div>Aggregat</div>
                  <div>Bastudörrar</div>
                  <div>Lampor</div>
                  <div>Batterier</div>
                </section>
              </div>


              <div>Blandare
                <section>
                  <div>Aggregat</div>
                  <div>Bastudörrar</div>
                  <div>Lampor</div>
                  <div>Batterier</div>
                </section>
              </div>

              <div>Bastu
                <section>
                  <div>Aggregat</div>
                  <div>Bastudörrar</div>
                  <div>Lampor</div>
                  <div>Batterier</div>
                </section>
              </div>

              <div>VVS
                <section>
                  <div>Aggregat</div>
                  <div>Bastudörrar</div>
                  <div>Lampor</div>
                  <div>Batterier</div>
                </section>
              </div>

              <div>Värme och pumpar
                <section>
                  <div>Aggregat</div>
                  <div>Bastudörrar</div>
                  <div>Lampor</div>
                  <div>Batterier</div>
                </section>
              </div>
          </div>
      </div>
    )
  }
}
