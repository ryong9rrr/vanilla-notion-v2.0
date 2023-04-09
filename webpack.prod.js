const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const Dotenv = require('dotenv-webpack')

module.exports = (env) => {
  return merge(common(env), {
    mode: 'production',
    plugins: [
      new Dotenv({
        systemvars: true,
      }),
    ],
  })
}
