import React, { Component } from 'react'
import ComponentTitle from '../../components/admin/ComponentTitle'
import CampaignChooser from '../../components/admin/Campaigns/CampaignChooser'
import Campaign from '../../components/admin/Campaigns/Campaign'

require('styles/_adminSimon/_campaigns/campaigns.css')

export default class Campaigns extends Component {
  /* Takes the values from the form and puts in the state when submitted */

  render() {
    return (
      <div id="campaigns">
        <ComponentTitle
          title={"Kampanjer"}
          text={"Här kan du ändra kampanjen som finns i webbshopen \n" +
                "Du kan också ändra text och bild."}
        />

        <div id="container">
          <Campaign />
        </div>
      </div>
    )
  }
}
