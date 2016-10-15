import React, { Component } from 'react'
import ComponentTitle from '../ComponentTitle'
import CampaignChooser from './CampaignChooser'
require('styles/_adminSimon/_campaigns/campaigns.css')

export default class Campaigns extends Component {
  /* Takes the values from the form and puts in the state when submitted */
  submitForm(e) {
    e.preventDefault()
    let heading = this.refs.heading.value
    let description = this.refs.description.value
    let file = this.refs.imgFile.files[0]

    console.log("heading: ", heading)
    console.log("description: ", description)
    console.log("file: ", file)
  }

  /* Finds the filename of the uploaded file and shows it to the user */
  findFileName(e) {
    let fileName = e.target.files[0].name
    this.refs.fileHolder.value = fileName
  }
  render() {
    let campaignImg = {
      backgroundImage: 'url(../../../assets/images/campaign.jpg)',
    }
    return (
      <div id="campaigns">
        <ComponentTitle
          title={"Kampanjer"}
          text={"Här väljer du vilken kampanj som ska vara aktiv i webshopen. \n" +
                "Du kan också ändra text och bild på befintliga kampanjer."}
        />

        <div id="container">
          <form onSubmit={this.submitForm.bind(this)}>
            <section className="campaignImg" style={campaignImg}>
              <div className="lostWrapper">
                <div>
                  <input
                    type="text"
                    ref="heading"
                    defaultValue="Titel 1 från databas"
                  />
                  <textarea
                    ref="description"
                    defaultValue="Hej hej hej text från databas"
                  />
                </div>
                <div>
                  <button className="btn">Till erbjudande</button>
                </div>
              </div>
            </section>

            <section className="buttons">
              <div>
                <input type="submit" className="btn greenButton" value="Spara" />
              </div>
              <div>
                <input disabled="disabled" ref="fileHolder" id="fileHolder" />
                <input type="file" ref="imgFile" id="picUpload" onChange={this.findFileName.bind(this)} />
                <label htmlFor="picUpload">Välj bild</label>
              </div>
            </section>
          </form>
        </div>
      </div>
    )
  }
}
