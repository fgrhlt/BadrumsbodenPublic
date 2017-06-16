import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { replaceSpecialCharacters, replaceSpecialCharactersURLs, capitalizeFirstLetter } from '../../../utils/Utils'
import axios from 'axios'

require('../../../styles/_webshopPage/subCategoryList.css')
var $ = require ('jquery')

export default class SubCategoryList extends Component {

  componentWillMount() {
    this.state = {
      supplierList: [],
      supplierOf: '',
      seriesList: [],
      seriesOf: ''
    }
  }

  getSupplierList(e) {
    this.setState({
      supplierList: [],
      supplierOf: '',
      seriesList: [],
      seriesOf: ''
    })

    let subcategory = replaceSpecialCharacters(e.target.innerText)
    let category = e.target.id
    let supplierList = []

    axios.get('/products/subcategory/'+subcategory)
    .then( (response) => {
      for (var index in response.data) {
        let supplier = response.data[index].supplier
        //If there is a supplier from that subcategory
        if (supplier) {
          let hasDuplicate = false
          //Is this a duplicate?
          supplierList.forEach((element) => { if (supplier==element) {hasDuplicate = true }})
          //If not duplicate, push to list
          if (!hasDuplicate) { supplierList.push(supplier) }
        }
      }
      //Store suppliers and subcategory
      this.setState({ supplierList })
    })
    .catch(function (error) {
      console.log(error)
    })
    this.setState({ supplierOf: subcategory })

    browserHistory.push('/webshop/'+category+'/'+subcategory)
  }

  getSeries(currentCategory, currentSubcat, currentSupplier) {
    let seriesList = []

    axios.get('/products/fetchSupplier/'+currentSubcat+'/'+currentSupplier)
    .then( (response) => {
      for (var index in response.data) {
        let seriesName = response.data[index].series

        if (seriesName) {
          let hasDuplicate = false
          seriesList.forEach((element) => { if (seriesName==element) {hasDuplicate = true }})

          if (!hasDuplicate) { seriesList.push(seriesName) }
        }
      }
      this.setState({ seriesList },
      () => {
        browserHistory.push('/webshop/'+currentCategory+'/'+currentSubcat+'/'+currentSupplier)
      })
    })
    .catch(function (error) {
      console.log(error)
    })
    this.setState({ seriesOf: currentSupplier })
  }

  showOnlySeries(currentCategory, currentSubcat, currentSupplier, series){
    //Fetch only products with given series and supplier
    browserHistory.push('/webshop/'+currentCategory+'/'+currentSubcat+'/'+currentSupplier+'/'+series)
  }

  renderSeriesList(currentCategory, currentSubcat, currentSupplier) {
    let series = this.state.seriesList
    let seriesList = series.map((serie) =>{
                    return (<li
                              onClick={this.showOnlySeries.bind(this, currentCategory, currentSubcat, currentSupplier, serie)}
                              style={{    fontStyle: 'italic',
                                          backgroundColor: '#757575',
                                          padding: '2px 2px 2px 40px',
                                          color: 'white',
                                          borderBottom: 'thin solid white'}}>
                                {serie}
                            </li>)
                  })

    return  <ul>{ seriesList }</ul>
  }

  renderSupplierList(currentCategory, currentSubcat) {
    const { seriesList, seriesOf } = this.state
    let suppliers = this.state.supplierList
    let supplierList = []

    for (var index in suppliers) {
      let currentSupplier = suppliers[index]

      supplierList.push(<li
                          onClick={() => this.getSeries(currentCategory, currentSubcat, currentSupplier)}
                          style={{    backgroundColor: '#757575',
                                      padding: '2px 2px 2px 30px',
                                      color: 'white',
                                      borderBottom: 'thin solid white'}}>
                             {currentSupplier}
                         </li>)

       if (seriesList && (seriesOf == currentSupplier)) {
         supplierList.push( this.renderSeriesList(currentCategory, currentSubcat, currentSupplier) )
       }
    }
    return supplierList
  }

  renderSubcategories(subcatItems, subcat, category) {
    const { supplierList, supplierOf } = this.state

    let categoryList = []
    for (var item in subcatItems) {
      let currentCategory = subcatItems[item].parent

      if (item != '_id') {//Needs to be here bc. formatting in mLab
        if (currentCategory==category) {
          let currentSubcat = item
          let prettySubcat = subcatItems[currentSubcat].name

          //Push subcategories to list that will render
          categoryList.push(<li
            id={category}
            onClick={(e) => this.getSupplierList(e)}
            key={currentSubcat}
            className={subcat == currentSubcat ? "active" : null}>
              { prettySubcat }
          </li>)

          if (supplierList && (supplierOf == currentSubcat)) {
            categoryList.push( this.renderSupplierList(currentCategory, currentSubcat) )
          }
        }
      }
    }
    return categoryList
  }

  render() {
    const { params, subcatItems } = this.props
    const { subcategory, category } = params
    const subcat = params ? subcategory : null

    return (
      <div id="subCategoryList">
        <ul>
          {this.renderSubcategories(subcatItems, subcat, category)}
        </ul>
      </div>
    )
  }
}
