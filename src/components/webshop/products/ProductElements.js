import React, { Component } from 'react'

import ProductPreview from './ProductPreview'
import ReactPaginate from 'react-paginate';

require('../../../styles/_webshopPage/products.css')
require('../../../styles/_webshopPage/pagination.css')

export default class ProductElements extends Component {
  render() {
    return (
      <div>
        <div id="productlist1">
          {this.props.items.map((item) => {
            return <ProductPreview key={item.key} item={item}/>
          })}
        </div>

        <ReactPaginate
          previousLabel={"Föregående"}
          nextLabel={"Nästa"}
          breakLabel={<a href="">...</a>}
          breakClassName={"break-me"}
          pageNum={this.props.totalPages}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
          clickCallback={this.props.handlePagination.bind(this)}
        />
      </div>
    )
  }
}
