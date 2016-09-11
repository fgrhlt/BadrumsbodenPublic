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

export default class AddProduct extends Component {
  componentWillMount() {
    this.state = {
      clicked: 0
    }
  }
  handleClick = () => {
    this.setState({clicked: this.state.clicked + 1})
  }

  render() {
    return (
      <div id="addProduct">
        {this.state.clicked > 0 ? <ProductField /> : null}
        <div className="greenButton btn" onClick={this.handleClick}>Lägg till produkt</div>

      </div>
    )
  }
}
