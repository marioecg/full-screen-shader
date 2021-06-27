const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isProd = process.env.NODE_ENV == 'production';

const appDir = path.join(__dirname, 'scripts');
const assetsDir = path.join(__dirname, 'assets');
const stylesDir = path.join(__dirname, 'styles');

const config = {
  mode: isProd ? 'production' : 'development',

  entry: [
    path.join(appDir, 'app.js'),
    path.join(stylesDir, 'main.scss')
  ],
  
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isProd ? '[name].[contenthash].js' : '[name].js',
    chunkFilename: isProd ? '[id].css' : '[id].[contenthash].css',
    publicPath: '/',
  },
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'scripts'),
    },
  },    

  devServer: {
    open: true,
    host: 'localhost',
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(assetsDir, 'favicon'),
          to: ''
        },

        {
          from: path.join(assetsDir, 'images'),
          to: 'images/'
        }
      ],
    }),    

    new MiniCssExtractPlugin({
      filename: isProd ? '[name].[contenthash].css' : '[name].css',
      chunkFilename: isProd ? '[id].css' : '[id].[contenthash].css'
    }),

    // Other plugins...
  ],

  module: {
    rules: [
      // JavaScript
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }        
      },

      // Sass
      {
        test: /\.scss$/,
        use: [          
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: ''
            }
          },

          {
            loader: 'css-loader'
          },

          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['postcss-preset-env'],
              },
            },
          },

          {
            loader: 'sass-loader'
          },
        ],
      },

      // Image, svg assets
      {
        test: /\.(svg|png|jpg|gif)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'images/',

        }        
      },

      // Font assets
      {
        test: /\.(woff|woff2)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'fonts/'
        }
      },  
      
      // Shaders
      {
        test: /\.(glsl|frag|vert)$/,
        loader: 'raw-loader',
        exclude: /node_modules/
      },

      {
        test: /\.(glsl|frag|vert)$/,
        loader: 'glslify-loader',
        exclude: /node_modules/
      }      

      // Other loaders...
    ],
  },
};

module.exports = () => {
  if (isProd) {
    config.mode = 'production';
  } else {
    config.mode = 'development';
  }

  return config;
};
