import React, { Component } from 'react'
import {Table, Column, Cell} from 'fixed-data-table';
import FittedTable from './ResponsiveFittedTable';
import AddProduct from './AddProduct';

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
      this.props.fetchFirebaseDataAdmin('products', 'starred', true)
    } else {
      this.props.fetchFirebaseDataAdmin('products', 'subcategory', subcat)
    }

    this.state = {
      products: [],
      columns: [],
    }
  }

  /* Receive data from firebase */
  componentWillReceiveProps(nextProps) {
    const { param, firebaseData } = nextProps
    const { subcategory, category } = param
    const { fetchFirebaseDataAdmin } = this.props

    if (subcategory != this.props.param.subcategory) {
      if (category=='toppsaljare') {
        fetchFirebaseDataAdmin('products', 'starred', true)
      } else {
        fetchFirebaseDataAdmin('products', 'subcategory', subcategory)
      }
    }

    let fbData = nextProps.firebaseData.products ? nextProps.firebaseData.products.items : []
    let productArray = fbData.map( (product) => {
      return [product.articleNr, product.supplier, product.productName, product.description, product.filename, product, product.starred]
    })
    this.state = {
      products: productArray,
      columns: [
        ['Artikelnr.'],
        ['Leverantör'],
        ['Namn'],
        ['Beskrivning'],
        ['Bild'],
        ['starred']
      ],
    }
  }

  /* Removes the article from firebase */
  removeArticle(rowIndex) {
    let product = this.state.products[rowIndex][5]
    this.props.deleteFirebaseElement('products', product)
  }

  /* Sets the selected product as a favorite product, which displays onn the
  * main webshop-page
  */
  setFavorite(rowIndex) {
    let product = this.state.products[rowIndex][5]

    let starred = this.state.products[rowIndex][6] ? {starred: false} : {starred: true}

    var databaseRef = firebase.database()
    .ref('webshop/products/'+product.key)
    .update(starred)

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
          <p>Produktnamn</p>
          <input type="text" ref="productName2"/>
          <AddProduct param={this.props.param} />
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
