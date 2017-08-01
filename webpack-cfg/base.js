const path = require('path');

const baseConfig = {
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: '[name].js',
    library: '[name]',
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, '../src'),
        loaders: (process.env.NODE_ENV === 'development') ? ['babel', 'eslint-loader'] : ['babel']
      },
      {
        test: /\.(css)$/,
        loader: 'style!css',
      },
      {
        test: /\.(png|jpeg|jpg|gif|woff|woff2|eot|ttf|svg|ico|otf)(\?.*$|$)/,
        loader: 'file-loader',
      },
      {
        test: /\.(json)(\?.*$|$)/,
        loader: 'url-loader',
      },
    ],
  },

  node: {
    net: 'empty',
    tls: 'empty',
    fs: 'empty',
  },
};

module.exports = baseConfig;
