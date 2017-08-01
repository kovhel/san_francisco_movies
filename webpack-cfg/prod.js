const baseConfig = require('./base');
const webpack = require('webpack');

const prodConfig = Object.assign({}, {
  entry: {
    app: ['./src/index']
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true
      }
    })
  ]
}, baseConfig);

module.exports = prodConfig;
