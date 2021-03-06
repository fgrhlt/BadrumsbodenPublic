import React, { Component } from 'react'
import ComponentTitle from '../ComponentTitle'
import axios from 'axios'
require('../../../styles/_admin/_campaigns/campaigns.css')

export default class CampaignWebshop extends Component {
  componentWillMount() {
    this.state = {
      campaignItem: [],
      infoText: '',
      infoColor: 'LimeGreen',
    }

    this.fetchData()
  }

  fetchData() {
    axios.get('/campaign/'+'campaignWebshop')
    .then(function (response) {
      this.setState({
        campaignItem: response.data[0]
      })
    }.bind(this))
    .catch(function (error) {
      console.log(error);
    })
  }

  submitForm(e) {
    e.preventDefault()
    let heading = this.state.campaignItem.heading
    let description = this.state.campaignItem.description
    let articleNr = this.state.campaignItem.articleNr
    let color = this.state.campaignItem.color
    let file = this.refs.imgFile.files[0]

    if(file) {
        //Image upload
        var filedata = new FormData();
        filedata.append('file', file);

        this.setState({
          infoText: 'Laddar upp till databasen...',
          color: "LimeGreen"
        })

        axios.post('/image', filedata)
        .then(function (res) {
          axios.post('/campaign/'+'campaignWebshop', {
            url: res.data.url,
            img_id: res.data.img_id,
            filename: file.name,
            heading,
            description,
            articleNr,
            color,
            type: 'campaignWebshop'
          })
          .then(function (response) {
            /* Successful uploads */
            this.setState({
              infoText: "Uppladdningen lyckades med bild: " + file.name,
              infoColor: 'limeGreen'
            })
            this.fetchData()
          }.bind(this))
          .catch(function (error) {
            this.setState({
              infoText: error,
              infoColor: 'red'
            })
            console.log(error);
          }.bind(this))
        }.bind(this))
        //Reset placeholder inputtext
        this.refs.fileHolderWeb.value = ''
      } else {
        let fileName = this.state.campaignItem.filename
        let urlName = this.state.campaignItem.url

        axios.post('/campaign/'+'campaignWebshop', {
          heading,
          description,
          articleNr,
          color,
          filename: fileName,
          url: urlName,
          type: 'campaignWebshop'
        })
        .then(function (response) {
          this.fetchData()
          this.setState({
            infoText: "Uppladdningen lyckades!",
            infoColor: 'limeGreen'
          })
        }.bind(this))
        .catch(function (error) {
          console.log(error);
        })
      }
    }

    /* Finds the filename of the uploaded file and shows it to the user */
    findFileName(e) {
      let fileName = e.target.files[0].name
      this.refs.fileHolderWeb.value = fileName
    }

    /* Updates state depending on where you write */
    handleChange(e) {
      let obj = {}

      // Clone the object to "obj"
      Object.assign(obj, this.state.campaignItem)
      obj[e.target.name] = e.target.value
      this.setState({campaignItem: obj})
    }

    /* When you click the color picker */
    handleColor(color) {
      let obj = {}
      /* clone the state to the new object */
      Object.assign(obj, this.state.campaignItem)
      obj['color'] = color

      this.setState({
        campaignItem: obj
      })
    }

    render() {
      let campaignImg = {
        backgroundImage: 'url('+this.state.campaignItem.url+')'
      }
      return (
        <div className="adminCampaign">
          <section className="campaignImg" style={campaignImg}>
            <div className="lostWrapper">
              <input
                type="text"
                name="heading"
                value={this.state.campaignItem.heading || ""}
                onChange={this.handleChange.bind(this)}
                className={this.state.campaignItem.color}
                />
              <textarea
                name="description"
                value={this.state.campaignItem.description || ""}
                onChange={this.handleChange.bind(this)}
                className={this.state.campaignItem.color}
                />
            </div>
          </section>

          <section className="buttons">
            <div>
              <input disabled="disabled" ref="fileHolderWeb" id="fileHolder" className="fileHolder" />
              <input
                type="file"
                ref="imgFile"
                id="picUpload"
                className="picUpload"
                onChange={this.findFileName.bind(this)}
                />
              <label htmlFor="picUpload">Välj bild</label>
            </div>

            <div className="articleNrDiv">
              <p>Artikelnr. till kopplad produkt</p>
              <input
                type="text"
                name="articleNr"
                value={this.state.campaignItem.articleNr || ""}
                onChange={this.handleChange.bind(this)}
                />
            </div>

            <div className="textColorDiv">
              <p>Textfärg på kampanj</p>
              <div
                className={this.state.campaignItem.color == "black" ? "black active" : "black"}
                name="black"
                onClick={this.handleColor.bind(this, "black")}
                />
              <div
                className={this.state.campaignItem.color == "white" ? "white active" : "white"}
                onClick={this.handleColor.bind(this, "white")}
                />
            </div>

            <div>
              <button className="btn greenButton" onClick={this.submitForm.bind(this)}>Spara ny kampanj</button>
            </div>

            <div className="status">
              <p>Status:</p>
              <p style={{color: this.state.infoColor}}>{this.state.infoText}</p>
            </div>
          </section>
        </div>
      )
    }
  }
