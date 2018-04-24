const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/app.ts',
  output: {
    path: path.resolve(__dirname, 'js'),
    filename: 'game.js'
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      }
    ]
  },

  resolve: {
    extensions: ['.ts', '.js']
  },

  devtool: 'inline-source-map',

  devServer: {
    contentBase: path.join(__dirname, ''),
    port: 9000,
    compress: true
  }
}