'use strict';
let path = require('path');
let defaultSettings = require('./defaults');

// Additional npm or bower modules to include in builds
// Add all foreign plugins you may need into this array
// @example:
// let npmBase = path.join(__dirname, '../node_modules');
// let additionalPaths = [ path.join(npmBase, 'react-bootstrap') ];
let additionalPaths = [];

module.exports = {
  additionalPaths: additionalPaths,
  port: defaultSettings.port,
  debug: true,
  devtool: 'eval',
  output: {
    path: path.join(__dirname, '/../dist/assets'),
    filename: 'app.js',
    publicPath: defaultSettings.publicPath
  },
  devServer: {
    contentBase: './src/',
    historyApiFallback: true,
    hot: true,
    port: defaultSettings.port,
    publicPath: defaultSettings.publicPath,
    noInfo: false
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      actions: `${defaultSettings.srcPath}/actions/`,
      components: `${defaultSettings.srcPath}/components/`,
      sources: `${defaultSettings.srcPath}/sources/`,
      stores: `${defaultSettings.srcPath}/stores/`,
      styles: `${defaultSettings.srcPath}/styles/`,
      config: `${defaultSettings.srcPath}/config/` + process.env.REACT_WEBPACK_ENV
    }
  },
  module: {
        loaders: [
            {
                test:   /\.src\.styles\.css$/,
                loader: "style-loader!css-loader!postcss-loader"
            }
        ]
    },
    postcss: function () {
      return [
        require('postcss-cssnext')({
            features: {
              customProperties: {
                preserve: true,
                appendVariables: true,
                variables: {
                  orange: "#FD551F",
                  orangeHover: "#A0251C",
                  orangeClick: "#751715",
                  lightBlue: "#A9DDD6",
                  lightGreen: "#A7D49B",
                  lightYellow: "#EAD168",
                  lightGray:"#F2F2F2",
                  mediumGray:"#E6E6E6",
                  darkGray:"#4D4D4D",
                  darkGreen: "#019A3F",
                  darkRed: "#D6211D",
                  darkRedHover: "#A31717",
                  darkRedClick: "#821212",
                  darkBlue: "#106189",
                  darkBlueHover: "#0D526D",
                  darkBlueActive: "#0B4359",
                  adminListLightGray: "#f6f7f8",
                  adminMenuBlueOdd: "#56696D",
                  adminMenuBlueEven: "#677F89",
                  adminMenuBlueHover: "#435254",
                  adminMenuDarkBlue: "#435254",
                  adminMenuDarkBlueHover:"#323E3F",
                  defaultShadow: "0 2px 10px #ccc",
                  headerShadow: "0 3px 15px #ccc",
                  defaultInsetShadow: "0px 3px 10px #eee inset",
                }
              },
            }
        }),
        require('lost'),
        require('rucksack-css'),
        ];
    },
  };
