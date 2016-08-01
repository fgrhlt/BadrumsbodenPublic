import React, { Component } from 'react'
require('styles/_galleryPage/gallery.css')
require('styles/global.css')

export default class Gallery extends Component {
  render() {
    return (
      <div>
        <div id="header">
            <div id="left">
              <span>
                <img src="assets/arrows/small_backarrow.svg" />
                Tillbaka till portalen
              </span>

              <img id="logo" src="assets/logo/logo.svg" />
            </div>

            <div id="right">
              <div>
                <img src="assets/icons/email_icon.svg" />
                <h4>E-post</h4>
                Klicka för att skicka epost
              </div>

              <div>
                <img src="assets/icons/phone_icon.svg" />
                <div className="text">
                  070 57 43 373<br />
                  <span>Öppet 08-18</span>
                  </div>
              </div>
            </div>

            <div id="text">
            About

Generator-React-Webpack will help you build new React projects using modern technologies.

Out of the box it comes with support for:

Webpack
ES2015 via Babel-Loader
Different supported style languages (sass, scss, less, stylus)
Style transformations via PostCSS
Automatic code linting via esLint
Ability to unit test components via Karma and Mocha/Chai
Changes in Version 2.0

This generator is written in ES2015. This means it is not compatible with node.js versions before 4.0.

It also does NOT include support for Flux-Frameworks anymore. Instead, we will use it as a base for other generators to build upon. This will make the base generator easier to use and update.

If you are interested, feel free to write your own generator and use generator-react-webpack as a base (via composition).

If you have built a generator using generator-react-webpack, tell us and we will add a link to our README.

Generators that extend generator-react-webpack

Generator-React-Webpack-Alt (Adds ability to create actions, stores and sources for alt.js)
Generator-React-Webpack-Redux (Adds ability to create actions and reducers for Redux)
Installation
<span>
# Make sure both is installed globally
npm install -g yo
npm install -g generator-react-webpack
Setting up projects

# Create a new directory, and `cd` into it:
mkdir my-new-project && cd my-new-project

# Run the generator
yo react-webpack
Please make sure to edit your newly generated package.json file to set description, author information and the like.

Generating new components
</span>
# After setup of course :)
# cd my-new-project
yo react-webpack:component my/namespaced/components/name
The above command will create a new component, as well as its stylesheet and a basic testcase.
            </div>
        </div>
      </div>
    )
  }
}

Gallery.defaultProps = {
}
