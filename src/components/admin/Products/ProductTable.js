import React, { Component } from 'react'
import {Table, Column, Cell} from 'fixed-data-table';
import FittedTable from './ResponsiveFittedTable';
import AddProduct from './AddProduct';

import axios from 'axios'
import firebase from 'firebase/app'

import { replaceSpecialCharactersURLs } from '../../../utils/Utils'

import { browserHistory } from 'react-router'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as firebaseActions from '../../../actions/firebaseActions'

require('../../../styles/_adminSimon/_products/productTable.css')
require('../../../styles/_fixedDataTable/fixed-data-table.css')

/* The ProductTable contains a FittedTable which comes from Facebook's
* fixed-data-table, and it's responsive. In the table there is six columns
* with data from the database. Then comes the AddProduct component
*/
class ProductTable extends Component {

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
    }
  }

  componentWillReceiveProps(nextProps) {
    const { param, firebaseData } = nextProps
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
    console.log('query, value', query, value);
    axios.get('/products/'+query+'/'+value)
    .then(function (response) {
      console.log('res', response);

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

  deleteElement(id) {
    axios.delete('/products/'+id)
    .then(function (response) {
      console.log('res', response);

    }.bind(this))
    .catch(function (error) {
      console.log(error);
    })
  }

  starElement(id, starred) {
    axios.put('/products/'+id, {starred})
    .then(function (response) {
      console.log('res', response);

    }.bind(this))
    .catch(function (error) {
      console.log(error);
    })
  }


  /* Removes the article from firebase */
  removeArticle(rowIndex) {
    let product = this.state.products[rowIndex][5]
    this.props.deleteFirebaseElement('products', product)
    this.deleteElement(product._id)
    let subcat = this.props.param.subcategory
    this.fetchData('subcategory', subcat)
  }

  /* Sets the selected product as a favorite product, which displays onn the
  * main webshop-page
  */
  setFavorite(rowIndex) {
    let product = this.state.products[rowIndex][5]

    let starred = this.state.products[rowIndex][6] ? {starred: false} : {starred: true}

    // var databaseRef = firebase.database()
    // .ref('webshop/products/'+product.key)
    // .update(starred)

    this.starElement(product._id, starred.starred)
    let subcat = this.props.param.subcategory
    this.fetchData('subcategory', subcat)

    console.log('Storage: '+product.folder+'/'+product.filename, 'updated!')
  }

  render() {
    return (
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
        <div>
          //TODO: sök
          <div onClick={this.fetchData.bind(this)}>
            <p>Produktnamn</p>
            <input type="text" ref="productName2"/>
          </div>

          <AddProduct fetchData={this.fetchData.bind(this)} param={this.props.param} />
        </div>
        : '' }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    firebaseData: state.firebaseReducer.firebaseData
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(firebaseActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductTable)
