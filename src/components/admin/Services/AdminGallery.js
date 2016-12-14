import React, { Component } from 'react'
import ComponentTitle from '../ComponentTitle'
import axios from 'axios'
require('../../../styles/_admin/_services/adminGallery.css')

export default class AdminGallery extends Component {
  componentWillMount() {
    this.state = {
      itemsbadrum: [],
      itemskok: [],
      file: '',
      infoText: 'Väntar på uppladdning...',
      infoColor: 'limeGreen'
    }

    this.fetchData('badrum')
    this.fetchData('kok')
  }

  fetchData(type) {
    let path = 'items'+type

    axios.get('/gallery/'+type)
    .then(function (response) {
      this.setState({
        [path]: response.data
      })
    }.bind(this))
    .catch(function (error) {
      console.log(error);
    })
  }

  submitImage(category, e) {
    e.preventDefault()
    let file = this.state.file
    if(file != '') {
        var filedata = new FormData();
        filedata.append('file', file);

        this.setState({
          infoText:'Laddar upp fil:'+ file.name+ 'till: /gallery/',
          infoColor: 'limeGreen'
        })

        axios.post('/image', filedata)
        .then(function (res) {
          axios.post('/gallery', {
            url: res.data.url,
            img_id: res.data.img_id,
            filename: file.name,
            type: category
          })
          .then(function (response) {
            this.fetchData(category)
            this.setState({
              infoText: file.name+' är uppladdad till: gallery/'+category,
              infoColor: 'limeGreen'
            })
          }.bind(this))
          .catch(function (error) {
            this.setState({
              infoText:'Felmeddelande:', error,
              infoColor: 'red'
            })
          })

          //Reset placeholder inputtext
          this.refs.fileHolder.value = ''
          this.refs.fileHolder2.value = ''

          this.setState({
            file:''
          })
        }.bind(this))
      }
      else {
        this.setState({
          infoText: 'Välj en bild att ladda upp',
          infoColor: 'red'
        })
      }
    }

    /* Finds the filename of the uploaded file and shows it to the user */
    findFileName(category, e) {
      let fileName = e.target.files[0].name
      if (category=='badrum') {
        this.refs.fileHolder.value = fileName
      }else if (category=='kok') {
        this.refs.fileHolder2.value = fileName
      }

      this.setState({
        file: e.target.files[0]
      })
    }

    removeArticle(item) {
      axios.delete('/gallery/'+item._id)
      .then(function (response) {
        //delete image
        axios.delete('/image/'+item.img_id)
        .then(function (response) {

        }.bind(this))
        .catch(function (error) {
          console.log(error);
        })
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      })
      //refresh
      this.fetchData(item.type)
    }

    render() {
      return (
        <div id="adminGallery">
          <ComponentTitle
            title={"Bildgalleri"}
            text={"Här kan man ta bort, ändra, och lägga till bilder i galleriet. \nHåll muspekaren över bilderna för att kunna ta bort bilder"}
            />

          <div id="container">
            <section>
              <div className="infoText" style={{color:this.state.infoColor}}>{this.state.infoText}</div>
              <h3>Badrum</h3>
              <div className="lostContainer">
                {this.state.itemsbadrum.map((item, i) => (
                  <div key={i}>
                    <figure style={{backgroundImage: 'url('+item.url+')'}} />
                    <button
                      className="btn redButton delete" onClick={this.removeArticle.bind(this, item)}>Ta bort</button>
                  </div>
                ))}
              </div>

              <div>
                <p>Välj bild</p>
                <div id="imageUploadContainer">
                  <input disabled="disabled" ref="fileHolder" id="fileHolder" className="fileHolder" />
                  <input type="file" ref="bild" id="picUpload" className="picUpload" onChange={this.findFileName.bind(this, 'badrum')} />
                  <label htmlFor="picUpload">Välj bild</label>
                </div>
                <button onClick={this.submitImage.bind(this, 'badrum')} className="btn greenButton">Ladda upp bild</button>
              </div>
            </section>

            <section>
              <h3>Kök</h3>
              <div className="lostContainer">
                {this.state.itemskok.map((item, i) => (
                  <div key={i}>
                    <figure style={{backgroundImage: 'url('+item.url+')'}} />
                    <button className="btn redButton delete" onClick={this.removeArticle.bind(this, item)}>Ta bort</button>
                  </div>
                ))}
              </div>

              <div>
                <p>Välj bild</p>
                <div id="imageUploadContainer">
                  <input disabled="disabled" ref="fileHolder2" id="fileHolder2" className="fileHolder" />
                  <input type="file" ref="bild2" id="picUpload2" className="picUpload" onChange={this.findFileName.bind(this, 'kok')} />
                  <label htmlFor="picUpload2">Välj bild</label>
                </div>
                <button onClick={this.submitImage.bind(this, 'kok')} className="btn greenButton">Ladda upp bild</button>
              </div>
            </section>
          </div>
        </div>
      )
    }
  }
