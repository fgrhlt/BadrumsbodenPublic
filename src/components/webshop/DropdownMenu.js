import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { replaceSpecialCharactersURLs } from '../../utils/Utils'

require('styles/_webshopPage/dropdownMenu.css')

export default class DropdownMenu extends Component {

  clickHandler(e) {
    let category = e.target.parentNode.id+'/'
    let category2 = e.target.id

    console.log(category2);
    if (!category2=='') {
      browserHistory.push('/webshop/'+category2+'/all')
    }else {
      let subcategory = e.target.textContent
      subcategory = replaceSpecialCharactersURLs(subcategory)
      browserHistory.push('/webshop/'+category+subcategory)
    }
  }

  render() {
    return (
      <div>
          <div id="menu" onClick={this.clickHandler.bind(this)}>
              <div id="badrumsinredning">Badrumsinredning
                <section id="badrumsinredning">
                  <div>Aggregat</div>
                  <div>Bastudörrar</div>
                  <div>Lampor</div>
                  <div>Batterier</div>
                </section>
              </div>


              <div id="duschochbadkar">Dusch och badkar
                <section id="duschochbadkar">
                  <div>Aggregat</div>
                  <div>Bastudörrar</div>
                  <div>Lampor</div>
                  <div>Batterier</div>
                </section>
              </div>


              <div id="blandare">Blandare
                <section id="blandare">
                  <div>Aggregat</div>
                  <div>Bastudörrar</div>
                  <div>Lampor</div>
                  <div>Batterier</div>
                </section>
              </div>

              <div id="bastu">Bastu
                <section id="bastu">
                  <div>Aggregat</div>
                  <div>Bastudörrar</div>
                  <div>Lampor</div>
                  <div>Batterier</div>
                </section>
              </div>

              <div id="vvs">VVS
                <section id="VVS">
                  <div>Aggregat</div>
                  <div>Bastudörrar</div>
                  <div>Lampor</div>
                  <div>Batterier</div>
                </section>
              </div>

              <div id="varmeochpumpar">Värme och pumpar
                <section id="varmeochpumpar">
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
