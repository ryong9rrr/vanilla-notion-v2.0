const dotenv = require('dotenv')
const Dotenv = require('dotenv-webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = () => {
  dotenv.config()

  return {
    mode: 'development',
    entry: './src/index.ts',
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/', // in local
      filename: 'bundle.js',
    },
    devtool: 'inline-source-map',
    devServer: {
      compress: true, // 압축하겠다는 옵션.
      port: 9999,
      historyApiFallback: true, // in local
    },
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
      //new Dotenv(),
      new HtmlWebpackPlugin({
        template: 'index.html',
      }),
    ],
  }
}
