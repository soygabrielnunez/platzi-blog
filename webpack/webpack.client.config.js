const path = require('path')

module.exports = {
  entry:  './src/client.js',
  output: {
    filename: 'app.js',
    path: path.resolve('./build/static')
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: path.resolve('./node_modules/'),
        query: {
          presets: ['es2016', 'es2017', 'react'],
          plugins: ['transform-es2015-modules-commonjs']
        }
      }
    ]
  },
  target: 'node'
}
