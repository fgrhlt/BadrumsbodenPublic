import React, { Component } from 'react'
import ComponentTitle from '../ComponentTitle'
import CampaignChooser from './CampaignChooser'

require('styles/_adminSimon/_campaigns/campaigns.css')

export default class Campaigns extends Component {

  render() {
    return (
      <div id="campaigns">
        <ComponentTitle
          title={"Kampanjer"}
          text={"Här väljer du vilken kampanj som ska vara aktiv i webshopen. \n" +
                "Du kan också ändra text och bild på befintliga kampanjer."}
        />

        <div id="container">
          <CampaignChooser />
        </div>
      </div>
    )
  }
}
