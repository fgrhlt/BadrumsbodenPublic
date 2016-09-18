import React, { Component } from 'react'
import GalleryElements from '../../components/admin/GalleryElements'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as firebaseActions from '../../actions/firebaseActions'

require('firebase/database')
require('styles/_galleryPage/gallery.css')

class Admin extends Component {

  componentWillMount() {
    this.state = {
      items: [],
      value: ''
    }
    this.props.fetchFirebaseData('aggregat')
    this.props.fetchFirebaseData('gallery')
    this.props.fetchFirebaseData('campaign')
    this.props.fetchFirebaseData('topSellers')
  }

  componentDidMount() {
    //this.uploadFiles('fileButtonGallery', 'products/', 'products/imageURLs')
    this.uploadFiles('fileButtonGallery', 'gallery/', 'gallery/imageURLs')
    this.uploadFiles('fileButtonCampaign', 'campaign/', 'campaign/imageURLs')
    this.uploadFiles('fileButtonTopSellers', 'topSellers/', 'topSellers/imageURLs')
  }

  componentWillUnmount() {
      this.firebase.storage().ref().off()
      this.firebase.database().ref().off()
    }

  uploadFiles(buttonID, storageFolderPath, databaseFolderPath) {
      var fileButton = document.getElementById(buttonID)
      //Listen for selection
      fileButton.addEventListener('change', (e) => {
        var file = e.target.files[0]

        var storageRef = firebase.storage().ref()
        var uploadTask = storageRef.child(storageFolderPath+file.name)
        //Upload file (and metadata)
        var task = uploadTask.put(file)

        console.log('Uploading file', file.name, 'to', storageFolderPath)

        task.on('state_changed', () => {
          // Observe state change events such as progress, pause, and resume
          // See below for more detail

        }, (error) => {
          // Handle unsuccessful uploads
          console.log('error:', error)
        }, () => {
          // Handle successful uploads on complete
          console.log('Upload successful!')

          //Push URL to database
          console.log('Uploading imageURL', file.name, 'to', databaseFolderPath )
          console.log('--------------------')
          firebase.database().ref().child(databaseFolderPath)
            .push({
              url: task.snapshot.downloadURL,
              name: file.name,
              folder: storageFolderPath,
            })
        })
      })
    }

  handleChange(event) {
    this.setState({value: event.target.value})
  }

  handleBtnClick() {
    const { value } = this.state
    this.uploadFiles('fileButtonProducts', value+'/', value+'/imageURLs')
  }

  render() {
    const { firebaseData } = this.props
    const divStyle = {border: 'dotted', margin: 100}

    return (
      <div>
        <h1>Webshop</h1>


        <div style={divStyle} className="galleryDiv">
          <h2>Products</h2>
            <button type="button" onClick={this.handleBtnClick.bind(this)}>Set path</button>
              <input
                style={{backgroundColor:'lightgrey'}}
                type="text"
                value={this.state.value}
                onChange={this.handleChange.bind(this)}/>
            <br/>

            <input
              value=""
              style={{backgroundColor: 'lightgrey'}}
              type="file"
              id="fileButtonProducts">
            </input>
            <br/>

          <GalleryElements items={firebaseData ? firebaseData.aggregat.items : this.state.items}/>
        </div>


        <div style={divStyle} className="galleryDiv">
          <h2>Campaign</h2>
            <input
              value=""
              style={{backgroundColor: 'lightgrey'}}
              type="file"
              id="fileButtonCampaign">
            </input>
          <GalleryElements items={firebaseData ? firebaseData.campaign.items : this.state.items}/>
        </div>

        <div style={divStyle} className="galleryDiv">
          <h2>Top Sellers</h2>
            <input
              value=""
              style={{backgroundColor: 'lightgrey'}}
              type="file"
              id="fileButtonTopSellers">
            </input>
          <GalleryElements items={firebaseData ? firebaseData.topSellers.items : this.state.items}/>
        </div>

        <h1>Gallery</h1>
        <br/>
          <div style={divStyle} className="galleryDiv">
            <h2>Gallery</h2>
              <input
                value=""
                style={{backgroundColor: 'lightgrey'}}
                type="file"
                id="fileButtonGallery">
              </input>
            <GalleryElements items={firebaseData ? firebaseData.gallery.items : this.state.items}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
