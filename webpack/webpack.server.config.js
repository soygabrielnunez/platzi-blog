const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/server.jsx',
  output: {
    filename: 'index.js',
    path: path.resolve('./build/server'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        enforce: 'pre',
        use: 'eslint-loader',
        exclude: /(node_modules)/,
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        query: {
          presets: ['latest-minimal', 'react'],
        },
      },
      {
        test: /\.css$/,
        exclude: /(node_modules)/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?modules',
        }),
      },
    ],
  },
  target: 'node',
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '../static/styles.css',
      ignoreOrder: true,
    }),
  ],
};
