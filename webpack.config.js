const dotenv = require('dotenv')
const Dotenv = require('dotenv-webpack') // process.env.어쩌구 할 때 process에 접근할 수 있게 해줌(이게 없으면 접근못해서 에러남)
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

module.exports = (env) => {
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
      new Dotenv(),
      new webpack.DefinePlugin({
        API_END_POINT: env.DEV ? JSON.stringify(process.env.API_END_POINT) : '',
      }), // 노드 런타임에 가져온 env를 클라이언트에서 사용할 수 있도록 정의
      new HtmlWebpackPlugin({
        template: 'index.html',
      }),
    ],
  }
}
