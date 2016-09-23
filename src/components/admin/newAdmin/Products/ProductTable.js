import React, { Component } from 'react'
import {Table, Column, Cell} from 'fixed-data-table';
import FittedTable from './ResponsiveFittedTable';
import AddProduct from './AddProduct';

require('styles/_adminSimon/_products/productTable.css')
require('styles/_fixedDataTable/fixed-data-table.css')


/* This is the data table, which should be data from firebase later on */
const rows = [
  ['a1', 'b1', 'c1'],
  ['a2', 'b2', 'c2'],
  ['a3', 'b3', 'c3'],
  ['a4', 'b4', 'c5'],
  ['a5', 'b5', 'c5'],
  ['a6', 'b6', 'c6'],
  ['a7', 'b7', 'c7'],
  // .... and more
];

/* The ProductTable contains a FittedTable which comes from Facebook's
 * fixed-data-table, and it's responsive. In the table there is six columns
 * with data from the database. Then comes the AddProduct component
 */
export default class ProductTable extends Component {
  render() {
    return (
      <div id="productTable">
         <FittedTable
           rowHeight={50}
           rowsCount={rows.length}
           headerHeight={50}
         >

           <Column
             header={<Cell>Artikelnr.</Cell>}
             cell={<Cell>Column 1 static content</Cell>}
             flexGrow={1}
             width={50}
           />

           <Column
          header={<Cell>Leverantör</Cell>}
          cell={<Cell>Column 1 static content</Cell>}
          flexGrow={1}
          width={150}
          />

          <Column
             header={<Cell>Namn</Cell>}
             cell={<Cell>Column 2 static content</Cell>}
             flexGrow={1}
             width={300}
           />
           <Column
             header={<Cell>Beskrivning</Cell>}
             cell={({rowIndex, ...props}) => (
               <Cell {...props}>
                 Data for column 3: {rows[rowIndex][2]}
               </Cell>
             )}
             flexGrow={1}
             width={300}
           />

           <Column
             header={<Cell>Bild</Cell>}
             cell={({rowIndex, ...props}) => (
               <Cell {...props}>
                 Data for column 3: {rows[rowIndex][2]}
               </Cell>
             )}
             flexGrow={1}
             width={100}
           />
           <Column
             cell={
               <Cell>
                <figure className="star" />
                <figure className="pencil" />
                <figure className="trash" />
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
