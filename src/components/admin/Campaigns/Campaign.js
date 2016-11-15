import React, { Component } from 'react'
import ComponentTitle from '../ComponentTitle'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as firebaseActions from '../../../actions/firebaseActions'

import firebase from 'firebase/app'

require('../../../styles/_adminSimon/_campaigns/campaigns.css')

class Campaign extends Component {

  componentWillMount() {
    const { fetchFirebaseData } = this.props

    fetchFirebaseData('campaign')

    this.state = {
      campaignItemUrl: '',
      campaignItemHeading: '',
      campaignItemDescription: '',
      campaignItemArticleNr: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    const { firebaseData } = nextProps
    const { campaign } = firebaseData
    const { items } = campaign

    this.setState({
      campaignItemUrl: items[0] ? items[0].url : '',
      campaignItemHeading: items[0] ? items[0].heading : '',
      campaignItemDescription: items[0] ? items[0].description : '',
      campaignItemArticleNr: items[0] ? items[0].articleNr : ''
    })
  }

  submitForm(e) {
    e.preventDefault()
    let heading = this.refs.heading.value
    let description = this.refs.description.value
    let articleNr = this.refs.articleNr.value
    let file = this.refs.imgFile.files[0]

    /* Check if any form fields are empty */
    if(heading=='' || description=='' || articleNr=='' || file=='') {
      alert('Alla fält måste innehålla ett värde')
    }

    var storageRef = firebase.storage().ref().child('campaign/'+file.name)
    //Upload file to storageRef
    let task = storageRef.put(file)

    task.on('state_changed', () => {
      // Observe state change events such as progress, pause, and resume
      // See below for more detail
      console.log('Uploading file', file.name, 'to campaign/')
    }, (error) => {
      // Handle unsuccessful uploads
      console.log('error:', error)
    }, () => {
      // Handle successful uploads on complete
      console.log('Upload successful!')
      this.setState({
        infoText: file.name+' är uppladdad till: campaign/'
      })

      firebase.database().ref().child('campaign/')
      .set({
        url: task.snapshot.downloadURL,
        filename: file.name,
        heading,
        description,
        articleNr
      })
      //Reset placeholder inputtext
      this.refs.fileHolder.value = ''
    })
  }

  /* Finds the filename of the uploaded file and shows it to the user */
  findFileName(e) {
    let fileName = e.target.files[0].name
    this.refs.fileHolder.value = fileName
  }
  render() {
    const { campaignItemUrl, campaignItemHeading, campaignItemDescription, campaignItemArticleNr } = this.state
    //WHYYY? :(
    console.log('campaignItemUrl, campaignItemHeading', campaignItemArticleNr, campaignItemDescription);
    let campaignImg = {
      backgroundImage: 'url('+campaignItemUrl+')'
    }

    return (
      <div id="adminCampaign">
        <form onSubmit={this.submitForm.bind(this)}>
          <section className="campaignImg" style={campaignImg}>
            <div className="lostWrapper">
              <div>
                <input
                  type="text"
                  ref="heading"
                  defaultValue={campaignItemHeading}
                />
                <textarea
                  ref="description"
                  defaultValue={campaignItemDescription}
                />
              </div>
              <div>
                <button className="btn">Till erbjudande</button>
              </div>
            </div>
          </section>

          <section className="buttons">
            <div className="articleInput">
              <h4>Artikelnummer</h4>
              <input
                type="text"
                ref="articleNr"
                defaultValue={campaignItemArticleNr}
              />
            </div>

            <div>
              <input type="submit" className="btn greenButton" value="Spara" />
            </div>

            <div>
              <input disabled="disabled" ref="fileHolder" id="fileHolder" className="fileHolder" />
              <input type="file" ref="imgFile" id="picUpload" className="picUpload" onChange={this.findFileName.bind(this)} />
              <label htmlFor="picUpload">Välj bild</label>
            </div>
          </section>
        </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(Campaign)
