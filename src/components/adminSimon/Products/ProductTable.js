import React, { Component } from 'react'
import {Table, Column, Cell} from 'fixed-data-table';
import FittedTable from './ResponsiveFittedTable';
import AddProduct from './AddProduct';

import { replaceSpecialCharactersURLs } from '../../../utils/Utils'

import { browserHistory } from 'react-router'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as firebaseActions from '../../../actions/firebaseActions'

require('styles/_adminSimon/_products/productTable.css')
require('styles/_fixedDataTable/fixed-data-table.css')

/* The ProductTable contains a FittedTable which comes from Facebook's
* fixed-data-table, and it's responsive. In the table there is six columns
* with data from the database. Then comes the AddProduct component
*/
class ProductTable extends Component {

  componentWillMount() {
    browserHistory.listen( (event) => {
      let newVar = event.pathname.replace('/newAdmin', '')
      newVar = replaceSpecialCharactersURLs(newVar)
      this.props.fetchFirebaseData(newVar)

      this.state = {
        products: [],
        columns: [],
        path: newVar
      }
    })
  }

  /* Receive data from firebase */
  componentWillReceiveProps(nextProps) {
    let fbData = nextProps.firebaseData ? nextProps.firebaseData[this.state.path].items : []

    let arrr = fbData.map( (product) => {
      return [product.articleNr, product.supplier, product.productName, product.description, product.filename, product]
    }
  )
  this.state = {
    products: arrr,
    columns: [
      ['Artikelnr.'],
      ['Leverantör'],
      ['Namn'],
      ['Beskrivning'],
      ['Bild']
    ]
  }
}

/* Removes the article from firebase */
removeArticle() {
 let product = this.state.products[0][5]
 this.props.deleteFirebaseElement(product)
}
/* Sets the selected product as a favorite product, which displays onn the
 * main webshop-page
 */
setFavorite() {

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
          width={50}
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
          width={300}
          />
        <Column
          header={<Cell>{this.state.columns[3]}</Cell>}
          cell={({rowIndex, ...props}) => (
            <Cell {...props}>
              {this.state.products[rowIndex][3]}
            </Cell>
          )}
          flexGrow={1}
          width={300}
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
          cell={
            <Cell>
              {<figure className="star" onClick={this.setFavorite.bind(this)} />}
              <figure className="trash" onClick={this.removeArticle.bind(this)}/>
              {/*<figure className="pencil" />*/}
            </Cell>}
            flexGrow={1}
            width={60}
            />
        </FittedTable>

        <AddProduct />
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
