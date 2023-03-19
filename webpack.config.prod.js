const HtmlWebpackPlugin = require('html-webpack-plugin')
//const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')

module.exports = {
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
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
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
    // production으로 빌드할 때 dist 파일을 모두 없앤다. 따라서 dist에는 항상 최신의 파일만 존재하게됨.
    // output을 제거했으므로 이건 없어도 괜찮을 듯.
    // new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
  ],
}
