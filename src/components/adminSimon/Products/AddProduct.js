import React, { Component } from 'react'

require('styles/_adminSimon/_products/addProduct.css')

export default class AddProduct extends Component {
  componentWillMount() {
    this.state = {
      newProducts: []
    }
  }

  /* Takes the values from the form and puts in the state when submitted */
  submitForm(e) {
    e.preventDefault()
    let artikelnr = this.refs.artikelnr.value;
    let leverantor = this.refs.leverantor.value;
    let produktnamn = this.refs.produktnamn.value;
    let bild = this.refs.bild.value;
    let beskrivning = this.refs.beskrivning.value;

    /* Check if any form fields are empty */
    if(artikelnr=='' || leverantor=='' || produktnamn=='' || bild=='' || beskrivning=='') {
      alert('Alla fält måste innehålla ett värde')
    }
    else {
      this.setState({
        newProducts: this.state.newProducts.concat({
          artikelnr, leverantor, produktnamn, bild, beskrivning})
      })
    }
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
                    <input type="text" ref="artikelnr" />
                  </div>

                  <div>
                    <p>Leverantör</p>
                    <input type="text" ref="leverantor"/>
                  </div>

                  <div>
                    <p>Produktnamn</p>
                    <input type="text" ref="produktnamn"/>
                  </div>

                  <div>
                    <p>Bild</p>
                    <input disabled="disabled" ref="fileHolder" id="fileHolder" />
                    <input type="file" ref="bild" id="picUpload" onChange={this.findFileName.bind(this)} />
                    <label htmlFor="picUpload">Välj bild</label>
                  </div>
                </section>

                <section>
                  <p>Beskrivning</p>
                  <textarea type="text" ref="beskrivning" />
                </section>
            </div>
          </div>
          <input type="submit" className="btn greenButton" value="Spara produkter" />
        </form>
      </div>
    )
  }
}
