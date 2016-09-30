import React, { Component } from 'react'
import { browserHistory } from 'react-router'

require('styles/_adminSimon/_products/addProduct.css')

export default class AddProduct extends Component {
  componentWillMount() {

    this.state = {
      infoText: 'Väntar på uppladdning...'
    }

    browserHistory.listen( (event) => {
      let newVar = event.pathname.replace('/newAdmin', '')

      this.setState({ dbAndStoragePath: newVar })
      }
    )
  }

  /* Takes the values from the form and puts in the state when submitted */
  submitForm(e) {

    e.preventDefault()
    let articleNr = this.refs.articleNr.value;
    let supplier = this.refs.supplier.value;
    let productName = this.refs.productName.value;
    let bild = this.refs.bild.value;
    let description = this.refs.description.value;
    let price = this.refs.price.value;

    /* Check if any form fields are empty */
    if(articleNr=='' || supplier=='' || productName=='' || bild=='' || description=='') {
      alert('Alla fält måste innehålla ett värde')
    }
    const { dbAndStoragePath } = this.state

    var file = this.refs.bild.files[0]
    var storageRef = firebase.storage().ref()
    var uploadTask = storageRef.child(dbAndStoragePath+file.name)
    //Upload file (and metadata)
    var task = uploadTask.put(file)

    console.log('Uploading file', file.name, 'to', dbAndStoragePath)

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
      console.log('Uploading imageURL', file.name, 'to', dbAndStoragePath )
      console.log('--------------------')

      this.setState({
        infoText: file.name+' är uppladdad till: '+dbAndStoragePath
      })

      firebase.database().ref().child(dbAndStoragePath)
      .push({
        url: task.snapshot.downloadURL,
        filename: file.name,
        folder: dbAndStoragePath,
        articleNr,
        supplier,
        productName,
        description,
        price
      })
    })
  }

  /* Finds the filename of the uploaded file and shows it to the user */
  findFileName(e) {
    let fileName = e.target.files[0].name
    this.refs.fileHolder.value = fileName
  }

  render() {
    return (
      <div id="addProduct">
        <h3>Lägg till produkter</h3>
        <h4>Mapp: {this.state.dbAndStoragePath || ''}</h4>

        <form onSubmit={this.submitForm.bind(this)}>
          <div className="addProductField">
            <div id="lostContainer">
              <section>
                <div>
                  <p>Artikelnr.</p>
                  <input type="text" ref="articleNr" />
                </div>

                <div>
                  <p>Leverantör</p>
                  <input type="text" ref="supplier"/>
                </div>

                <div>
                  <p>Produktnamn</p>
                  <input type="text" ref="productName"/>
                </div>

                <div>
                  <p>Pris</p>
                  <input type="text" ref="price"/>
                </div>

                <div>
                  <p>Bild</p>
                  <input disabled="disabled" ref="fileHolder" id="fileHolder" />
                  <input type="file" ref="bild" id="picUpload" onChange={this.findFileName.bind(this)} />
                  <label htmlFor="picUpload">Välj bild</label>
                </div>

                <div>
                  <p>Status uppladdning</p>
                  <p style={{color: 'green'}}>
                    {this.state.infoText}
                  </p>
                </div>
              </section>

              <section>
                <p>Beskrivning</p>
                <textarea type="text" ref="description" />
              </section>
            </div>
          </div>

          <input type="submit" className="btn greenButton" value="Spara produkter"/>
        </form>
      </div>
    )
  }
}
