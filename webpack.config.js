const NODE_ENV = process.argv.indexOf('--production') !== -1 ? 'production' : 'development';
const webpack = require('webpack');
const path = require('path');

process.env.NODE_ENV = NODE_ENV;

const configs = {
  development: require(path.join(__dirname, 'webpack-cfg/dev')),
  production: require(path.join(__dirname, 'webpack-cfg/prod'))
};

configs[NODE_ENV].plugins.push(new webpack.DefinePlugin({
  'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`
}));

module.exports = configs[NODE_ENV];
