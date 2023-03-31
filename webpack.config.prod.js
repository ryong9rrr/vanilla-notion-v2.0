const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const dotenv = require('dotenv')
const path = require('path')

const webpack = require('webpack')

module.exports = (env) => {
  dotenv.config()

  return {
    mode: 'production',
    entry: './src/index.ts',
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          loader: 'ts-loader',
        },
        {
          test: /\.s?css$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                additionalData: `
                  @import "@/styles/_variables";
                `,
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    plugins: [
      new Dotenv(),
      new webpack.DefinePlugin({
        API_END_POINT: JSON.stringify(process.env.API_END_POINT),
        USER_NAME: JSON.stringify(process.env.USER_NAME),
      }),
      new HtmlWebpackPlugin({
        template: 'index.html',
      }),
    ],
  }
}
