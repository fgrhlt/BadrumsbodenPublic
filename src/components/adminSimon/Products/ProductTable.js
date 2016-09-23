import React, { Component } from 'react'
import {Table, Column, Cell} from 'fixed-data-table';
import FittedTable from './ResponsiveFittedTable';
import AddProduct from './AddProduct';

require('styles/_adminSimon/_products/productTable.css')
require('styles/_fixedDataTable/fixed-data-table.css')

/* The ProductTable contains a FittedTable which comes from Facebook's
 * fixed-data-table, and it's responsive. In the table there is six columns
 * with data from the database. Then comes the AddProduct component
 */
export default class ProductTable extends Component {

  componentWillMount() {
    this.state = {
      products: [
        ['015435', 'Ifö', 'Blandare1', 'En fin blandare i stål', 'img1.jpg'],
        ['153465', 'Ifö', 'Blandare2', 'En fin blandare i stål', 'img2.jpg'],
        ['643455', 'VW', 'Blandare3', 'En fin blandare i stål', 'img3.jpg'],
        ['113415', 'Abba', 'Blandare4', 'En fin blandare i stål', 'img4.jpg'],
        ['177435', 'Alfred', 'Blandare5', 'En fin blandare i stål', 'img5.jpg'],
        ['2334455', 'Ifö', 'Blandare6', 'En fin blandare i stål', 'img6.jpg'],
        ['453455', 'Ifö', 'Blandare7', 'En fin blandare i stål', 'img7.jpg']
      ],

      // Table headings and width of the column from the db
      columns: [
        ['Artikelnr.'],
        ['Leverantör'],
        ['Namn'],
        ['Beskrivning'],
        ['Bild']
      ],
    }
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
