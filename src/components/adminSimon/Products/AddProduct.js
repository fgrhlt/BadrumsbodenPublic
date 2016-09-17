import React, { Component } from 'react'

require('styles/_adminSimon/_products/addProduct.css')

/* Here is the field where you type in each product. This component get's rendered
 * multiple times. It has a close button */
class ProductField extends Component {
  render() {
    return (
      <div className="addProductField">
        <figure name="close" onClick={this.props.onClick}/>
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

/* The state contains an array with each AddProduct-item. TODO: The state should
 * be changed to something other than 'a'. Maybe the article-id for instance
 */
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
      // TODO: Should the state list be the article id?
      productFields: this.state.productFields.concat(["a"]),
      clicked:true,
    })
  }

  // Remove one field by copying the state array and then splicing, i.e removing
  removeField(index) {
    var arr = this.state.productFields.slice()
    arr.splice(index, 1)
    this.setState({
      productFields: arr
    })
  }

  /* Spits out fields where you can add products. Then there is a + button and
   * a save button. TODO: The fields gets destroyed when you remove them.
   */
  render() {
    return (
      <div id="addProduct">
        <h3>Lägg till produkter</h3>

        {this.state.productFields.map(function(field, i) {
            var removeField = this.removeField.bind(this, i)
            return (
              <ProductField key={i} index={i} onClick={removeField} />
            )
          }, this)}

        <button className="blueButton btn" onClick={this.newField.bind(this)}>
          +
        </button>
        {this.state.clicked ? <SaveButton /> : null}
      </div>
    )
  }
}
