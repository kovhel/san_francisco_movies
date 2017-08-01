const baseConfig = require('./base');
const webpack = require('webpack');

const devConfig = Object.assign({}, {
  devtool: 'inline-source-map', // if you're experiencing problems with the speed use 'eval' instead

  entry: {
    app: [
      'babel-polyfill',
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      './src/index.hot-loader',
    ]
  },

  plugins: [new webpack.HotModuleReplacementPlugin()],
}, baseConfig);

module.exports = devConfig;
