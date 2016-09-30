import React, { Component } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as firebaseActions from '../../actions/firebaseActions'

export default class Uploader extends Component {

  componentWillMount() {
    this.state = {
      value: ''
    }
  }

  handleBtnClick() { 
    const { item, updateDescription } = this.props
    updateDescription(item.key, item.name, this.state.value)
    this.setState({
      value: ''
    })
  }

  handleClick() { 
    const { item, deleteFirebaseElement } = this.props
    deleteFirebaseElement(item.folder, item.key, item.name)
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    })
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

  render() {
    var divStyle = { height: 200 }
    const { item } = this.props

    return (
      <div style={{paddingBottom: 20, paddingTop: 20}}>
        <li>{item.name}</li>
        <br/>
        <img style={divStyle} src={item.url} alt="" />
        <br/>
        <button onClick={this.handleClick.bind(this)} type="button">Delete</button>
        <br/>

        <h4>Beskrivning</h4>
        <input
          style={{backgroundColor:'lightgrey'}}
          type="text"
          value={this.state.value}
          onChange={this.handleChange.bind(this)}/>
        <br/>
        <button type="button" onClick={this.handleBtnClick.bind(this)}>Upload</button>

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

export default connect(mapStateToProps, mapDispatchToProps)(Uploader)
