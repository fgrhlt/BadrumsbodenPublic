import React, { Component } from 'react'
import ComponentTitle from '../ComponentTitle'

import firebase from 'firebase/app'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as firebaseActions from '../../../actions/firebaseActions'

require('styles/_adminSimon/_services/adminGallery.css')

class AdminGallery extends Component {
  componentWillMount() {
    const { fetchFirebaseData } = this.props

    fetchFirebaseData('gallery', 'category', 'badrum')
    fetchFirebaseData('gallery', 'category', 'kok')

    this.state = {
      imagesBadrum: [],
      imagesKok: []
    }
  }

  componentWillReceiveProps(nextProps) {
    const { firebaseData } = nextProps

    this.setState({
      imagesBadrum: firebaseData['gallery/badrum'] ? firebaseData['gallery/badrum'].items : [],
      imagesKok: firebaseData['gallery/kok'] ? firebaseData['gallery/kok'].items : [],
    })
  }

  submitImage(category, e) {
    e.preventDefault()

    var storageRef = firebase.storage().ref().child('gallery/'+file.name)
    //Upload file to storageRef
    let task = storageRef.put(file)

    task.on('state_changed', () => {
      // Observe state change events such as progress, pause, and resume
      // See below for more detail
      console.log('Uploading file', file.name, 'to', 'gallery/')
    }, (error) => {
      // Handle unsuccessful uploads
      console.log('error:', error)
    }, () => {
      // Handle successful uploads on complete
      console.log('Upload successful!')
      this.setState({
        infoText: file.name+' är uppladdad till: gallery/'
      })

      firebase.database().ref().child('gallery/')
      .push({
        url: task.snapshot.downloadURL,
        filename: file.name,
        category: category,
      })
      //Reset placeholder inputtext
      this.refs.fileHolder.value = ''
      this.refs.fileHolder2.value = ''
    })
  }

  /* Finds the filename of the uploaded file and shows it to the user */
  findFileName(category, e) {
    let fileName = e.target.files[0].name
    if (category=='badrum') {
      this.refs.fileHolder.value = fileName
    }else if (category=='kok') {
      this.refs.fileHolder2.value = fileName
    }
  }

  removeArticle(item) {
    this.props.deleteFirebaseElement('gallery', item)
  }

  render() {
    return (
      <div id="adminGallery">
        <ComponentTitle
          title={"Bildgalleri"}
          text={"Här kan man ta bort, ändra, och lägga till bilder i galleriet. \nHåll muspekaren över bilderna för att kunna ta bort bilder"}
        />

        <div id="container">
          <section>
            <h3>Badrum</h3>
            <div className="lostContainer">
              {this.state.imagesBadrum.map((item, i) => (
                <div key={i}>
                  <figure style={{backgroundImage: 'url('+item.url+')'}} />
                  <button
                    className="btn redButton delete" onClick={this.removeArticle.bind(this, item)}>Ta bort</button>
                </div>
              ))}
            </div>

            <div>
              <p>Välj bild</p>
              <input disabled="disabled" ref="fileHolder" id="fileHolder" className="fileHolder" />
              <input type="file" ref="bild" id="picUpload" className="picUpload" onChange={this.findFileName.bind(this, 'badrum')} />
              <label htmlFor="picUpload">Välj bild</label>
              <button onClick={this.submitImage.bind(this, 'badrum')} className="btn greenButton">Ladda upp bild</button>
            </div>
          </section>

          <section>
            <h3>Kök</h3>
            <div className="lostContainer">
              {this.state.imagesKok.map((item, i) => (
                <div key={i}>
                  <figure style={{backgroundImage: 'url('+item.url+')'}} />
                  <button className="btn redButton delete" onClick={this.removeArticle.bind(this, item)}>Ta bort</button>
                </div>
              ))}
            </div>

            <div>
              <p>Välj bild</p>
              <input disabled="disabled" ref="fileHolder2" id="fileHolder2" className="fileHolder" />
              <input type="file" ref="bild2" id="picUpload2" className="picUpload" onChange={this.findFileName.bind(this, 'kok')} />
              <label htmlFor="picUpload">Välj bild</label>
              <button onClick={this.submitImage.bind(this, 'kok')} className="btn greenButton">Ladda upp bild</button>
            </div>
          </section>
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminGallery)
