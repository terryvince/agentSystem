const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ConfigWebpackPlugin = require('config-webpack');
const HappyPack = require('happypack');
const os = require('os')
const {src, output, entry, env, rules} = require('config');

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const isDev = env === 'development';
const isProd = env === 'production';

module.exports = {
  mode: env,
  target: 'web',
  context: src,
  devtool: 'source-map',
  module: {
    rules: [
      ...rules,
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use:'happypack/loader?id=js'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: ['img:src',':data-src']
          }
        }
      },
      {
        test: /\.(pug|jade)$/,
        loader: 'pug-loader'
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'url-loader?prefix=font/&limit=8192&mimetype=application/font-woff&name=[name].[ext]'
      },
      {
        test: /\.(ttf|eot|svg)$/,
        loader: 'file-loader?prefix=font/&name=[name].[ext]'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader',
        options:{
          limit:8192,
          name:'[path][name].[ext]'
        }
      },
      {
        test: /\.(mp4|ogg|svg)$/,
        loader: 'file-loader?name=[name].[ext]'
      },
    ]
  },
  entry,
  output: {
    path: output,
    filename: 'js/[name].js'
  },
  plugins: [
    new ConfigWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename:'css/[name].css'
    }),
    new HappyPack({
      id:'js',
      loaders: [
        {
          loader: 'babel-loader',
          exclude: /node_modules/,
          include: src,
          options: {
            cacheDirectory: true,
            sourceMap: true
          }
        },
        {
          loader: 'eslint-loader',
          exclude: /node_modules/,
          include: src,
          options: {
            failOnError: isDev,
            failOnWarning: isProd
          }
        }
      ],
      threadPool: happyThreadPool,
      cache: true,
      verbose: true
    })
  ],
  cache: true
};
