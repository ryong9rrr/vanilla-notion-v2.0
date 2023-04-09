const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const path = require('path')
const Dotenv = require('dotenv-webpack')

module.exports = (env) => {
  return merge(common(env), {
    mode: 'development',
    output: {
      publicPath: '/',
    },
    devtool: 'inline-source-map',
    devServer: {
      static: './dist',
      compress: true,
      port: 9999,
      historyApiFallback: true,
    },
    plugins: [
      new Dotenv({
        path: path.resolve(__dirname, './.env'),
      }),
    ],
  })
}
