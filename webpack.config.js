var debug = process.env.NODE_ENV !== "production";

var HTMLWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

var apiHost;

var setupApiHost = function() {
  if (process.env.NODE_ENV === 'production') {
    apiHost = "whereisit.com"
  } else {
    apiHost = "localhost"
  }
}

setupApiHost();

var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: __dirname + '/src/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  context: __dirname,

  devtool: debug ? "inline-sourcemap" : null,

  entry: './src/index.js',

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ["eslint-loader","react-hot-loader/webpack", "babel-loader"],
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192'
      }
    ]
  },

  output: {
    filename: "bundle.js",
    path: __dirname + '/build'
  },

  plugins: [
    HTMLWebpackPluginConfig,
    new webpack.DefinePlugin({
      __APIHOST__: apiHost
    })
  ]

}
