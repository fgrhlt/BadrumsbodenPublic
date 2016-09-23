import React, { Component } from 'react'
import { browserHistory } from 'react-router'

require('styles/_webshopPage/dropdownMenu.css')

export default class DropdownMenu extends Component {

  clickHandler(e) {

    if (e.target.id=='badrumsinredning') {
      browserHistory.push('/webshop/'+'badrumsinredning/')
    }
    else if (e.target.id=='aggregat') {
        browserHistory.push('/webshop/'+'badrumsinredning/'+'aggregat')
      }
  }

  render() {
    return (
      <div>
          <div id="menu" onClick={this.clickHandler.bind(this)}>
              <div id="badrumsinredning">Badrumsinredning
                <section>
                  <div id="aggregat">Aggregat</div>
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
