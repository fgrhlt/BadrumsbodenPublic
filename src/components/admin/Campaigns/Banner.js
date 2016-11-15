import React, { Component } from 'react'
import ComponentTitle from '../ComponentTitle'
require('../../../styles/_adminSimon/_campaigns/banner.css')

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
      let heading = this.state.bannerItem.heading
      let blueHeading = this.state.bannerItem.blueHeading
      let description = this.state.bannerItem.description
      // nu pushar den på en ny hela tiden, hur gör man för att bara lägga på samma ställe?
      firebase.database().ref().child('banner/')
      .set({
        heading,
        description,
        blueHeading
      })
  }

  /* Updates state depending on what you write */
  handleChange(e) {
    let obj = {}

    // Clone the object
    Object.assign(obj, this.state.bannerItem)
    obj[e.target.name] = e.target.value
    this.setState({bannerItem: obj})
  }
  render() {
    const { bannerItem  } = this.state
    console.log("state: ", this.state.bannerItem)
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
            <div id="banner">
              <div>
                <input
                  type="text"
                  value={bannerItemHeading}
                  name="heading"
                  onChange={this.handleChange.bind(this)}
                />
                <input
                  type="text"
                  value={bannerItemBlueheading}
                  name="blueHeading"
                  onChange={this.handleChange.bind(this)}
                />
                <input
                  type="text"
                  value={bannerItemDescription}
                  name="description"
                  onChange={this.handleChange.bind(this)}
                />
              </div>
            </div>

            <button onClick={this.submitForm.bind(this)} className="btn greenButton">Spara</button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log("mapStateToProps: ", state)
  return {
    firebaseData: state.firebaseReducer.firebaseData
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(firebaseActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Banner)
