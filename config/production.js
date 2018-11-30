const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  env: 'production',

  appName: 'agent system',

  output: path.resolve(__dirname, '../dist'),

  browsers:[
    // '> 1%',
    // 'last 2 versions',
    // 'Firefox > 20',
    // 'not ie <= 8',
    'iOS >= 6',
    'Android > 4.1'
  ],

  rules:[
    {
      test: /\.css$/,
      use: [
        {loader:MiniCssExtractPlugin.loader,options:{publicPath:'../'}},
        'css-loader?sourceMap',
        'postcss-loader'
      ],
    },
    {
      test: /\.(scss|sass)$/,
      use: [
        {loader:MiniCssExtractPlugin.loader,options:{publicPath:'../'}},
        'css-loader?sourceMap',
        'postcss-loader',
        'fast-sass-loader'
      ]
    },
    {
      test: /\.less$/,
      use: [
        {loader:MiniCssExtractPlugin.loader,options:{publicPath:'../'}},
        'css-loader?sourceMap',
        'postcss-loader',
        'less-loader'
      ]
    },
    {
      test: /\.styl$/,
      use: [
        {loader:MiniCssExtractPlugin.loader,options:{publicPath:'../'}},
        'css-loader?sourceMap',
        'postcss-loader',
        'stylus-loader'
      ]
    }
  ]
};
