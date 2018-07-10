const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: ['./src/index.js'],
  output: {
    library: 'deptest',
    // libraryTarget: 'umd',
    // umdNamedDefine: true,
    filename: 'deptest.js',
    path: path.resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        include: path.resolve('./src'),
        loader: require.resolve('babel-loader')
      }
    ]
  },
  plugins: []
}
