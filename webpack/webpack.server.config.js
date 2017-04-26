const path = require('path')

module.exports = {
  entry:  './src/server.js',
  output: {
    filename: 'index.js',
    path: path.resolve('./build/server')
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: path.resolve('./node_modules/'),
        query: {
          presets: ['latest-minimal', 'react']
        }
      }
    ]
  },
  target: 'node'
}
