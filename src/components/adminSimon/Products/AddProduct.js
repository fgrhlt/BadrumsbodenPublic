import React, { Component } from 'react'

require('styles/_adminSimon/_products/addProduct.css')

class ProductField extends Component {
  render() {
    return (
      <div className="addProductField">
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
      productFields: ['1'],
      clicked: false,
    }
  }
  handleClick() {
    this.setState({
      // Should the state list be the article id?
      productFields: this.state.productFields.concat(['1']),
      clicked:true,
    })
  }

  render() {
    return (
      <div id="addProduct">

        <h3>Lägg till produkter</h3>
        {
          this.state.productFields.map(function(field, i) {
            return (
              <ProductField key={i} />
            )
          })
        }

        <button className="blueButton btn" onClick={this.handleClick.bind(this)}>
          +
        </button>
        {this.state.clicked ? <SaveButton /> : null}


      </div>
    )
  }
}
