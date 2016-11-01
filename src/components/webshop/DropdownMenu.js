import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { replaceSpecialCharactersURLs } from '../../utils/Utils'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as firebaseActions from '../../actions/firebaseActions'
import { capitalizeFirstLetter } from '../../utils/Utils'

require('styles/_webshopPage/dropdownMenu.css')

  class DropdownMenu extends Component {

  componentWillMount() {
    const { fetchFirebaseData } = this.props

    this.state = {
      subcatItems1: [],
      subcatItems2: [],
      subcatItems3: [],
      subcatItems4: [],
      subcatItems5: [],
      subcatItems6: []
    }

    fetchFirebaseData('categories', 'parent', 'badrumsinredning')
    fetchFirebaseData('categories', 'parent', 'duschochbadkar')
    // fetchFirebaseData('categories', 'parent', 'blandare')
    // fetchFirebaseData('categories', 'parent', 'bastu')
    // fetchFirebaseData('categories', 'parent', 'vvs')
    // fetchFirebaseData('categories', 'parent', 'varmeochpumpar')
  }

  componentWillReceiveProps(nextProps) {
    const { firebaseData } = nextProps

    this.state = {
      subcatItems1: firebaseData['categories/badrumsinredning'] ? firebaseData['categories/badrumsinredning'].items : [],
      subcatItems2: firebaseData['categories/duschochbadkar'] ? firebaseData['categories/duschochbadkar'].items : [],
    // subcatItems3: firebaseData.products ? firebaseData.products.items : [],
    //   subcatItems4: firebaseData.products ? firebaseData.products.items : [],
    //   subcatItems5: firebaseData.products ? firebaseData.products.items : [],
    //   subcatItems6: firebaseData.products ? firebaseData.products.items : []
     }
  }

  clickHandler(e) {
    let category = e.target.parentNode.id+'/'
    let category2 = e.target.id

    if (!category2=='') {
      browserHistory.push('/webshop/'+category2+'/all')
    }else {
      let subcategory = e.target.textContent
      subcategory = replaceSpecialCharactersURLs(subcategory)
      browserHistory.push('/webshop/'+category+subcategory)
    }
  }

  renderDivs(subcatItems) {
    let list = this.state[subcatItems].map( (item, key) => {
                return <div key={key}>{capitalizeFirstLetter(item.key)}</div>
              })
    return list
  }

  render() {
    return (
      <div>
          <div id="menu" onClick={this.clickHandler.bind(this)}>
              <div id="badrumsinredning">Badrumsinredning
                <section id="badrumsinredning">
                  {this.renderDivs('subcatItems1')}
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

function mapStateToProps(state) {
  return {
    firebaseData: state.firebaseReducer.firebaseData
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(firebaseActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DropdownMenu)
