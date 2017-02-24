import React, { Component } from 'react'
import firebase from 'firebase/app'
require('../../../styles/_admin/_products/addProduct.css')
import axios from 'axios'

export default class ProductVariant extends Component {
  componentWillMount() {
    /* The id tells which id the last product had, so the next can be incremented */
    this.state = {
      index: this.props.index
    }
    console.log('this.props.index', this.props.index);
  }

  removeSelf(){
    this.props.removeVariant(this.state.index)
  }

  render() {
    console.log('this.props.children', this.props.children);
    return (
      <div>
        <br/>
        <section>
          <div>
            <p>Artikelnr.</p>
            <input type="text" ref="articleNr2" />
          </div>

          <div>
            <p>Produktnamn</p>
            <input type="text" ref="productName2"/>
          </div>

          <div>
            <p>Pris</p>
            <input type="text" ref="price2"/>
          </div>
        </section>

        <input onClick={this.removeSelf.bind(this)} type="button" className="btn blueButton" value="Ta bort variant"/>
      </div>
    )
  }
}
