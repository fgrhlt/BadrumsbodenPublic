import React, { Component } from 'react'
import {Table, Column, Cell} from 'fixed-data-table';
import FittedTable from './ResponsiveFittedTable';
import AddProduct from './AddProduct';
import axios from 'axios'
import { replaceSpecialCharactersURLs } from '../../../utils/Utils'
import { browserHistory } from 'react-router'

require('../../../styles/_admin/_products/productTable.css')
require('../../../styles/_fixedDataTable/fixed-data-table.css')

/* The ProductTable contains a FittedTable which comes from Facebook's
* fixed-data-table, and it's responsive. In the table there is six columns
* with data from the database. Then comes the AddProduct component
*/
export default class ProductTable extends Component {

  componentWillMount() {
    let subcat = this.props.param.subcategory

    if (this.props.param.category=='toppsaljare') {
      this.fetchData('starred', true)
    } else {
      this.fetchData('subcategory', subcat)
    }

    this.state = {
      products: [],
      columns: [],
      inputText: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    const { param } = nextProps
    const { subcategory, category } = param

    if (subcategory != this.props.param.subcategory) {
      if (category=='toppsaljare') {
        this.fetchData('starred', true)
      } else {
        this.fetchData('subcategory', subcategory)
      }
    }
  }

  fetchData(query, value) {
    axios.get('/products/'+query+'/'+value)
    .then(function (response) {
      let productArray = response.data.map( (product) => {
        return [product.articleNr, product.supplier, product.productName, product.description, product.filename, product, product.starred]
      })
      this.setState({
        products: productArray,
        columns: [
          ['Artikelnr.'],
          ['Leverantör'],
          ['Namn'],
          ['Beskrivning'],
          ['Bild'],
          ['starred']
        ]
      })
    }.bind(this))
    .catch(function (error) {
      console.log(error);
    })
  }

  deleteElement(product) {
    //delete from DB
    axios.delete('/products/'+product._id)
    .then(function (response) {
      //delete image
      axios.delete('/image/'+product.img_id)
      .then(function (response) {
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      })
    }.bind(this))
    .catch(function (error) {
      console.log(error);
    })
  }

  starElement(id, starred) {
    axios.put('/products/'+id, {starred})
    .then(function (response) {

    }.bind(this))
    .catch(function (error) {
      console.log(error);
    })
  }


  removeArticle(rowIndex) {
    let product = this.state.products[rowIndex][5]
    this.deleteElement(product)
    let subcat = this.props.param.subcategory
    this.fetchData('subcategory', subcat)
  }

  /* Sets the selected product as a favorite product, which displays onn the
  * main webshop-page
  */
  setFavorite(rowIndex) {
    let product = this.state.products[rowIndex][5]
    let starred = this.state.products[rowIndex][6] ? {starred: false} : {starred: true}

    this.starElement(product._id, starred.starred)
    let subcat = this.props.param.subcategory
    this.fetchData('subcategory', subcat)

    console.log('Storage: '+product.folder+'/'+product.filename, 'updated!')
  }

  onChange(event) {
    this.setState({
      inputText: event.target.value
    })
  }

  onKey(event) {
    if (event.keyCode==13) {
      this.searchProducts()
    }
  }

  searchProducts() {
    if (this.state.inputText.length>0) {
      this.fetchData('search', this.state.inputText)
    }else {
      let subcat = this.props.param.subcategory
      this.fetchData('subcategory', subcat)
    }
  }

  render() {
    return (
      <div>
        <div id="searchBar">
          <div>
            <input
              value={this.state.inputText}
              onChange={this.onChange.bind(this)}
              onKeyUp={this.onKey.bind(this)}
              type="text"
              placeholder="Vad söker du efter?">
            </input>
          </div>

          <div>
            <figure onClick={this.searchProducts.bind(this)}/>
          </div>
        </div>

        <div id="productTable">
          <FittedTable
            rowHeight={50}
            rowsCount={this.state.products.length}
            headerHeight={50}
            >
            <Column
              header={<Cell>{this.state.columns[0]}</Cell>}
              cell={({rowIndex, ...props}) => (
                <Cell {...props}>
                  {this.state.products[rowIndex][0]}
                </Cell>
              )}
              flexGrow={1}
              width={80}
              />

            <Column
              header={<Cell>{this.state.columns[1]}</Cell>}
              cell={({rowIndex, ...props}) => (
                <Cell {...props}>
                  {this.state.products[rowIndex][1]}
                </Cell>
              )}
              flexGrow={1}
              width={150}
              />
            <Column
              header={<Cell>{this.state.columns[2]}</Cell>}
              cell={({rowIndex, ...props}) => (
                <Cell {...props}>
                  {this.state.products[rowIndex][2]}
                </Cell>
              )}
              flexGrow={1}
              width={280}
              />
            <Column
              header={<Cell>{this.state.columns[3]}</Cell>}
              cell={({rowIndex, ...props}) => (
                <Cell {...props}>
                  {this.state.products[rowIndex][3]}
                </Cell>
              )}
              flexGrow={1}
              width={270}
              />
            <Column
              header={<Cell>{this.state.columns[4]}</Cell>}
              cell={({rowIndex, ...props}) => (
                <Cell {...props}>
                  {this.state.products[rowIndex][4]}
                </Cell>
              )}
              flexGrow={1}
              width={100}
              />

            <Column
              cell={({rowIndex, ...props}) => (
                <Cell {...props}>
                  <figure className={this.state.products[rowIndex][6] ? "star filled" : "star"} onClick={this.setFavorite.bind(this, rowIndex)}/>
                  <figure className="trash" onClick={this.removeArticle.bind(this, rowIndex)}/>
                </Cell>
              )}

              flexGrow={1}
              width={100}
              />
          </FittedTable>

          {this.props.param.category != "toppsaljare" ?
              <AddProduct fetchData={this.fetchData.bind(this)} param={this.props.param} />
            : '' }
          </div>
        </div>

      )
    }
  }
