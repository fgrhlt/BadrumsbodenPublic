import React, { Component } from 'react'

require('styles/_adminSimon/_products/addProduct.css')

class ProductField extends Component {
  render() {
    return (
      <div className="addProductField">

        <figure onClick={this.props.onClick}/>

        <div id="lostContainer">
          <section>
            <div>
              <p>Artikelnr.</p>
              <input />
            </div>

            <div>
              <p>Leverantör</p>
              <input />
            </div>

            <div>
              <p>Produktnamn</p>
              <input />
            </div>

            <div>
              <p>Bild</p>
              <input />
            </div>
          </section>

          <section>
            <p>Beskrivning</p>
            <textarea />
          </section>
        </div>
      </div>
    );
  }
}

class SaveButton extends Component {
  render() {
    return (
      <button className="btn greenButton">Spara produkter</button>
    );
  }
}

export default class AddProduct extends Component {
  componentWillMount() {
    this.state = {
      productFields: ["a"],
      clicked: false,
    }
  }

  // Adds a new field to the state array by concatinating
  newField() {
    this.setState({
      // Should the state list be the article id?
      productFields: this.state.productFields.concat(["a"]),
      clicked:true,
    })
  }

  // Remove one field by copying the state array and then splicing
  removeField(index) {
    var arr = this.state.productFields.slice()
    arr.splice(index, 1)
    this.setState({
      productFields: arr
    })
  }
  render() {
    return (
      <div id="addProduct">

        <h3>Lägg till produkter</h3>
        {
          this.state.productFields.map(function(field, i) {
            var removeField = this.removeField.bind(this, i)
            return (
              <ProductField key={i} index={i} onClick={removeField} />
            )
          }, this)
        }

        <button className="blueButton btn" onClick={this.newField.bind(this)}>
          +
        </button>
        {this.state.clicked ? <SaveButton /> : null}

        {console.log(this.state.productFields)}
      </div>
    )
  }
}
