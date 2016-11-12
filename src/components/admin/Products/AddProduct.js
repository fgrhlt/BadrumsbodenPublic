import React, { Component } from 'react'
import firebase from 'firebase/app'

require('styles/_adminSimon/_products/addProduct.css')

export default class AddProduct extends Component {
  componentWillMount() {

    this.state = {
      infoText: 'Väntar på uppladdning...'
    }
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
    var file = this.refs.bild.files[0]

    /* Check if any form fields are empty */
    if(articleNr=='' || supplier=='' || productName=='' || bild=='' || description=='') {
      alert('Alla fält måste innehålla ett värde')
    }

    var storageRef = firebase.storage().ref().child('webshop/produkter/'+file.name)
    //Upload file to storageRef
    let task = storageRef.put(file)

    task.on('state_changed', () => {
      // Observe state change events such as progress, pause, and resume
      // See below for more detail
      console.log('Uploading file', file.name, 'to', 'webshop/produkter/')
    }, (error) => {
      // Handle unsuccessful uploads
      console.log('error:', error)
    }, () => {
      // Handle successful uploads on complete
      console.log('Upload successful!')
      this.setState({
        infoText: file.name+' är uppladdad till: webshop/produkter/'
      })

      firebase.database().ref().child('webshop/produkter/')
      .push({
        url: task.snapshot.downloadURL,
        filename: file.name,
        articleNr,
        supplier,
        productName,
        description,
        price,
        category: this.props.param.category,
        subcategory: this.props.param.subcategory
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
    return (
      <div id="addProduct">
        <h3>Lägg till produkter</h3>

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
