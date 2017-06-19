import React, { Component } from 'react'
import firebase from 'firebase/app'
require('../../../styles/_admin/_products/addProduct.css')
import axios from 'axios'
import ProductVariant from './ProductVariant'

export default class AddProduct extends Component {
  componentWillMount() {
    /* The id tells which id the last product had, so the next can be incremented */
    this.state = {
      infoText: "",
      color: "LimeGreen",
      hasVariants: false,
      variantElements: []
    }
  }

  /* Takes the values from the form and puts in the state when submitted */
  submitForm(e) {
    e.preventDefault()
    let articleNr = this.refs.articleNr.value;
    let supplier = this.refs.supplier.value;
    let series = this.refs.series.value;
    let productName = this.refs.productName.value.toLowerCase();
    let bild = this.refs.bild.value;
    let description = this.refs.description.value;
    let price = this.refs.price.value;
    let file = this.refs.bild.files[0]

    if (this.state.hasVariants) {
      var x = Math.floor((Math.random() * 10000) + 1);
      articleNr = 'f'+x
      this.setState({ productArticleNr: articleNr })
    }

    if(isNaN(price)) {
      this.setState({
        infoText:"Pris måste vara endast siffror",
        color:"red"
      })
    } else {
      //Image upload
      var filedata = new FormData();
      filedata.append('file', file);

      this.setState({
        infoText: 'Laddar upp till databasen...',
        color: "LimeGreen"
      })

      this.state.variantElements.forEach(function callback(currentValue, index, array) {
        this.postVariants(index)
      }.bind(this))

      axios.post('/image', filedata)
      .then(function (res) {
        axios.post('/products', {
          url: res.data.url,
          filename: file.name,
          img_id: res.data.img_id,
          articleNr,
          supplier,
          series,
          productName,
          description,
          price,
          category: this.props.param.category,
          subcategory: this.props.param.subcategory,
          hasVariants: this.state.hasVariants
        })
        .then(function (response) {
          /* Successful uploads */
          // Reset inputtext
          this.refs.fileHolder.value = ''
          this.refs.articleNr.value = ''
          this.refs.supplier.value = ''
          this.refs.productName.value = ''
          this.refs.bild.value = ''
          this.refs.description.value = ''
          this.refs.price.value = ''
          this.refs.series.value = ''

          this.setState({
            infoText: 'Lyckades ladda upp!',
            color: "LimeGreen"
          })

          let subcat = this.props.param.subcategory
          this.props.fetchData('subcategory', subcat)
        }.bind(this))
        .catch(function (error) {
          this.setState({
            infoText: error,
            infoColor: 'red'
          })
          console.log(error);
        }.bind(this))
      }.bind(this))
      .catch(function (err) {
        // Handle unsuccessful uploads
        this.setState({
          infoText: error,
          color: "red"
        })
      })
    }
  }

  postVariants(i){
    let variantArticleNr = document.getElementById('articleNrVar'+i).value
    let productArticleNr = this.state.productArticleNr
    let productOfName = this.refs.productName.value;
    let productName = document.getElementById('productNameVar'+i).value
    let price = document.getElementById('priceVar'+i).value

    axios.post('/products', {
      variantOf: productArticleNr,
      productOfName,
      articleNr: variantArticleNr,
      productName,
      price
    })
    .then(function (response) {
      /* Successful uploads */

      // Reset variants
      this.setState({
        variantElements: []
      })

    }.bind(this))
    .catch(function (error) {
      this.setState({
        infoText: error,
        infoColor: 'red'
      })
      console.log(error);
    }.bind(this))
  }

  /* Finds the filename of the uploaded file and shows it to the user */
  findFileName(e) {
    let fileName = e.target.files[0].name
    this.refs.fileHolder.value = fileName
  }

  renderVariant() {
    this.state.variantElements.push(this.productVariant(this.state.variantElements.length))

    this.setState({
      hasVariants: true
    })
  }

  productVariant(index){
    return (
      <div id={'index'+index} className="productVariant" key={index}>
        <h4>Produktvariant {index}</h4>
          <div>
            <p>Artikelnr.</p>
            <input required type="text" id={'articleNrVar'+index} />
          </div>

          <div>
            <p>Namn på variant</p>
            <input required type="text" id={'productNameVar'+index}/>
          </div>

          <div>
            <p>Pris</p>
            <input required type="text" id={'priceVar'+index}/>
          </div>
        <figure className="removeVariant" onClick={this.removeVariant.bind(this, index)} />
      </div>
    )
  }

  removeVariant(index) {
    delete this.state.variantElements[index]

    let arraySize = 0
    this.state.variantElements.forEach((element)=> {
      arraySize = arraySize + 1
    })

    this.setState({
      hasVariants: arraySize == 0 ? false : true
    }, ()=> {
      if (arraySize == 0) {
        this.state = { variantElements: [] }
      }
    })

  }

  render() {
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
                  <input required type="text" ref="supplier"/>
                </div>

                <div>
                  <p>Produktnamn</p>
                  <input required type="text" ref="productName"/>
                </div>

                <div>
                  <p>Serie</p>
                  <input required type="text" ref="series"/>
                </div>

                <div>
                  <p>Pris</p>
                  <input type="text" ref="price"/>
                </div>

                <div>
                  <p>Bild</p>
                  <input disabled="disabled" ref="fileHolder" id="fileHolder" className="fileHolder" />
                  <input required type="file" ref="bild" id="picUpload" className="picUpload" onChange={this.findFileName.bind(this)} />
                  <label htmlFor="picUpload">Välj bild</label>
                </div>

                <div>
                  <p>Status för uppladdning</p>
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

          {this.state.variantElements}
          <div className="btn blueButton addVariantBtn" onClick={this.renderVariant.bind(this)}>Lägg till variant</div>

          <input type="submit" className="btn greenButton" value="Spara produkter"/>
        </form>

      </div>
    )
  }
}
