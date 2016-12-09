import React, { Component } from 'react'
import firebase from 'firebase/app'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as firebaseActions from '../../../actions/firebaseActions'
require('../../../styles/_adminSimon/_products/addProduct.css')

export class AddProduct extends Component {
  componentWillMount() {
    this.props.fetchProductId()

    /* The id tells which id the last product had, so the next can be incremented */
    this.state = {
      infoText: "Väntar på uppladdning...",
      color: "LimeGreen",
      currentId: 0
    }
  }

  /* Receive data from firebase */
  componentWillReceiveProps(nextProps) {
    const { param, firebaseData } = nextProps
    const { subcategory, category } = param
    const { fetchProductId } = this.props

    this.setState({
      currentId: firebaseData.productId ? firebaseData.productId.items.id : 0
    })
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
    let file = this.refs.bild.files[0]
    let id = this.state.currentId+1

    /* Check if any form fields are empty */
    if(articleNr=='' || supplier=='' || productName=='' || bild=='' || description=='') {
      this.setState({
        infoText:"Alla fält måste innehålla ett värde",
        color:"red"
      })
    }
    else if(isNaN(price)) {
      this.setState({
        infoText:"Pris måste vara endast siffror",
        color:"red"
      })
    }
    else {
      var storageRef = firebase.storage().ref().child('webshop/produkter/'+file.name)
      // Upload file to storageRef
      let task = storageRef.put(file)

      task.on('state_changed', () => {
        // Observe state change events such as progress, pause, and resume
        // See below for more detail
        console.log('Uploading file', file.name, 'to', 'webshop/produkter/')
        this.setState({
          infoText: 'Laddar upp till databasen...',
          color: "LimeGreen"
        })
      }, (error) => {
        // Handle unsuccessful uploads
        this.setState({
          infoText: error,
          color: "red"
        })
      }, () => {
        /* Successful uploads */
        this.setState({
          infoText: 'Lyckades ladda upp!',
          color: "LimeGreen"
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
          subcategory: this.props.param.subcategory,
          id
        })
        // Reset inputtext
        this.refs.fileHolder.value = ''
        this.refs.articleNr.value = ''
        this.refs.supplier.value = ''
        this.refs.productName.value = ''
        this.refs.bild.value = ''
        this.refs.description.value = ''
        this.refs.price.value = ''
      })
    }
  }

  /* Finds the filename of the uploaded file and shows it to the user */
  findFileName(e) {
    let fileName = e.target.files[0].name
    this.refs.fileHolder.value = fileName
  }

  render() {
    console.log(this.state)
    return (
      <div id="addProduct">
        <h3>Lägg till produkter i: <span>/{this.props.param.category || ''}/{this.props.param.subcategory || ''}</span></h3>

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
                  <input disabled="disabled" ref="fileHolder" id="fileHolder" className="fileHolder" />
                  <input type="file" ref="bild" id="picUpload" className="picUpload" onChange={this.findFileName.bind(this)} />
                  <label htmlFor="picUpload">Välj bild</label>
                </div>

                <div>
                  <p>Status uppladdning</p>
                  <div className="infoText" style={{color: this.state.color}}>
                    {this.state.infoText}
                  </div>
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
function mapStateToProps(state) {
  console.log("mapstate", state)
  return {
    firebaseData: state.firebaseReducer.firebaseData
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(firebaseActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct)
