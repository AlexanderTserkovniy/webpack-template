/**
 * Created by Oleksandr Tserkovnyi on 1/16/17.
 * kemperomg@gmail.com
 */

const {resolve} = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    // activate HMR for React

    'webpack-dev-server/client?http://localhost:8080',
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint

    'webpack/hot/only-dev-server',
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates

    resolve(__dirname, 'index.js')
  ],
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          'babel-loader',
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader?modules',
          'postcss-loader',
        ],
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.css']
  },
  devServer: {
    hot: true,
    // enable HMR on the server

    contentBase: resolve(__dirname, 'dist'),
    // match the output path

    publicPath: '/'
    // match the output `publicPath`
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates
  ],
  devtool: 'cheap-module-eval-source-map'
};

// Technical code.
// Contact Oleksandr Tserkovnyi if any questions appear
// TODO check arguments for having set -p but not set process.env.NODE_ENV
console.log('BUILD MODE: ', process.env.NODE_ENV || 'Seems like development because nothing is specified');

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = []; // remove Hot Module Replacement
  module.exports.entry = resolve(__dirname, 'index.js'); // remove Hot Module Replacement

  // Extract css to separate file
  const ExtractTextPlugin = require("extract-text-webpack-plugin");
  module.exports.plugins.push(new ExtractTextPlugin("styles.css"));
  module.exports.module.rules[1] = {
    test: /\.css$/,
    exclude: /node_modules/,
    loader: ExtractTextPlugin.extract({
      fallbackLoader: 'style-loader',
      loader: [
        'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
        'postcss-loader'
      ]
    })
  };
}