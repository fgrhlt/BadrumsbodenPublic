import React, { Component } from 'react'
import ComponentTitle from '../ComponentTitle'
require('styles/_adminSimon/_campaigns/banner.css')

import firebase from 'firebase/app'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as firebaseActions from '../../../actions/firebaseActions'

class Banner extends Component {

  componentWillMount() {
    const { fetchFirebaseData } = this.props

    fetchFirebaseData('banner')
    this.state = {
      bannerItem: [],
    }
  }

  componentWillReceiveProps(nextProps) {
    const { firebaseData } = nextProps

    this.setState({
      bannerItem: firebaseData.banner ? firebaseData.banner.items[0] : []
    })
  }

  submitForm(e) {
      e.preventDefault()
      let heading = this.refs.heading.value
      let blueHeading = this.refs.blueHeading.value
      let description = this.refs.description.value

      /* Check if any form fields are empty */
      if(heading=='' || blueHeading=='' || description=='') {
        alert('Alla fält måste innehålla ett värde')
      }

      firebase.database().ref().child('banner/')
      .push({
        heading,
        description,
        blueHeading
      })
  }

  render() {
    const { bannerItem  } = this.state

    let bannerItemBlueheading = bannerItem ? bannerItem.blueHeading : ''
    let bannerItemHeading = bannerItem ? bannerItem.heading : ''
    let bannerItemDescription = bannerItem ? bannerItem.description : ''

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
                  value={bannerItemHeading}
                  ref="heading"
                />
                <input
                  type="text"
                  value={bannerItemBlueheading}
                  ref="blueHeading"
                />
                <input
                  type="text"
                  value={bannerItemDescription}
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

function mapStateToProps(state) {
  console.log(state);
  return {
    firebaseData: state.firebaseReducer.firebaseData
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(firebaseActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Banner)
