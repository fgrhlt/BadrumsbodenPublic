import React, { Component } from 'react'
import ComponentTitle from '../ComponentTitle'
require('../../../styles/_adminSimon/_campaigns/banner.css')
import axios from 'axios'

import firebase from 'firebase/app'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as firebaseActions from '../../../actions/firebaseActions'

class Banner extends Component {

  componentWillMount() {
    this.state = {
      bannerItem: [],
    }

    this.fetchData()
  }

  fetchData() {
    axios.get('/campaign/banner')
    .then(function (response) {
      console.log('res', response);
      console.log(' response.data',  response.data);
      this.setState({
        bannerItem: response.data[0]
      })
    }.bind(this))
    .catch(function (error) {
      console.log(error);
    })
  }

  submitForm(e) {
    e.preventDefault()
    let heading = this.state.bannerItem.heading
    let blueHeading = this.state.bannerItem.blueHeading
    let description = this.state.bannerItem.description

    axios.post('/campaign/'+'banner', {
      heading,
      description,
      blueHeading,
      type: 'banner'
     })
    .then(function (response) {
      console.log('res', response);
      this.fetchData()
    }.bind(this))
    .catch(function (error) {
      console.log(error);
    })
  }

  /* Updates state depending on where you write */
  handleChange(e) {
    let obj = {}

    // Clone the object to "obj"
    Object.assign(obj, this.state.bannerItem)
    obj[e.target.name] = e.target.value
    this.setState({bannerItem: obj})
  }
  render() {
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
                  onChange={this.handleChange.bind(this)}
                  value={this.state.bannerItem.heading || ""}
                  name="heading"
                />
                <input
                  type="text"
                  onChange={this.handleChange.bind(this)}
                  value={this.state.bannerItem.blueHeading || ""}
                  name="blueHeading"
                />
                <input
                  type="text"
                  onChange={this.handleChange.bind(this)}
                  value={this.state.bannerItem.description || ""}
                  name="description"
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
  return {
    firebaseData: state.firebaseReducer.firebaseData
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(firebaseActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Banner)
