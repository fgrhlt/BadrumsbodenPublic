import React, { Component } from 'react'
import ComponentTitle from '../ComponentTitle'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as firebaseActions from '../../../actions/firebaseActions'

import firebase from 'firebase/app'

require('../../../styles/_adminSimon/_campaigns/campaigns.css')

class Campaign extends Component {

  componentWillMount() {
    const { fetchSingleFirebaseItem } = this.props

    fetchSingleFirebaseItem("campaign")

    this.state = {
      campaignItem: [],
      infoText: 'Väntar på uppladdning...',
      infoColor: 'LimeGreen',
    }
  }

  componentWillReceiveProps(nextProps) {
    const { firebaseData } = nextProps
    const { campaign } = firebaseData
    const { items } = campaign

    this.setState({
      campaignItem: items[0] ? items[0] : [],
    })
  }

  submitForm(e) {
    e.preventDefault()
    let heading = this.state.campaignItem.heading
    let description = this.state.campaignItem.description
    let articleNr = this.state.campaignItem.articleNr
    let color = this.state.campaignItem.color
    let file = this.refs.imgFile.files[0]

    if(file) {
      let storageRef = firebase.storage().ref().child('campaign/'+file.name)
      var task = storageRef.put(file)

      task.on('state_changed', () => {
        this.setState({
          infoText: "Laddar upp...",
          infoColor: 'limeGreen'
        })
      }, (error) => {
        // Handle unsuccessful uploads
        this.setState({
          infoText: "Ett fel har uppstått" + error,
          infoColor: 'red'
        })
      }, () => {
        // Handle successful uploads on complete
        this.setState({
          infoText: "Uppladdningen lyckades med bild: " + file.name,
          infoColor: 'limeGreen'
        })

        firebase.database().ref().child('campaign/')
        .set({
          url: task.snapshot.downloadURL,
          filename: file.name,
          heading,
          description,
          articleNr,
          color
        })
        //Reset placeholder inputtext
        this.refs.fileHolder.value = ''
      })
    }
    else {
      let fileName = this.state.campaignItem.filename
      let urlName = this.state.campaignItem.url
      firebase.database().ref().child('campaign/')
      .set({
        heading,
        description,
        articleNr,
        color,
        filename: fileName,
        url: urlName
      })

      this.setState({
        infoText: "Uppladdningen lyckades utan bild",
        infoColor: 'limeGreen'
      })
    }
  }

  /* Finds the filename of the uploaded file and shows it to the user */
  findFileName(e) {
    let fileName = e.target.files[0].name
    this.refs.fileHolder.value = fileName
  }

  /* Updates state depending on where you write */
  handleChange(e) {
    let obj = {}

    // Clone the object to "obj"
    Object.assign(obj, this.state.campaignItem)
    obj[e.target.name] = e.target.value
    this.setState({campaignItem: obj})
  }

  /* When you click the color picker */
  handleColor(color) {
    let obj = {}
    /* clone the state to the new object */
    Object.assign(obj, this.state.campaignItem)
    obj['color'] = color

    this.setState({
      campaignItem: obj
    })
  }

  render() {
    let campaignImg = {
      backgroundImage: 'url('+this.state.campaignItem.url+')'
    }
    return (
      <div id="adminCampaign">
        <div className="warning">Obs. ha inte större bilder än 2000 px i bredd!</div>
        <section className="campaignImg" style={campaignImg}>
          <div className="lostWrapper">
            <input
              type="text"
              name="heading"
              value={this.state.campaignItem.heading || ""}
              onChange={this.handleChange.bind(this)}
              className={this.state.campaignItem.color}
            />
            <textarea
              name="description"
              value={this.state.campaignItem.description || ""}
              onChange={this.handleChange.bind(this)}
              className={this.state.campaignItem.color}
            />
          </div>
        </section>

        <section className="buttons">
          <div>
            <input disabled="disabled" ref="fileHolder" id="fileHolder" className="fileHolder" />
            <input
              type="file"
              ref="imgFile"
              id="picUpload"
              className="picUpload"
              onChange={this.findFileName.bind(this)}
            />
            <label htmlFor="picUpload">Välj bild</label>
          </div>

          <div className="articleNrDiv">
            <p>Artikelnr. till kopplad produkt</p>
            <input
              type="text"
              name="articleNr"
              value={this.state.campaignItem.articleNr || ""}
              onChange={this.handleChange.bind(this)}
            />
          </div>

          <div className="textColorDiv">
            <p>Textfärg på kampanj</p>
            <div
              className={this.state.campaignItem.color == "black" ? "black active" : "black"}
              name="black"
              onClick={this.handleColor.bind(this, "black")}
            />
            <div
              className={this.state.campaignItem.color == "white" ? "white active" : "white"}
              onClick={this.handleColor.bind(this, "white")}
            />
          </div>

          <div>
            <button className="btn greenButton" onClick={this.submitForm.bind(this)}>Spara ny kampanj</button>
          </div>

          <div className="status">
            <p>Status:</p>
            <p style={{color: this.state.infoColor}}>{this.state.infoText}</p>
          </div>
        </section>
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

export default connect(mapStateToProps, mapDispatchToProps)(Campaign)
