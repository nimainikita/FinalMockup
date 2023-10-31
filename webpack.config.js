const path = require('path'); //Служебный модуль node.js
const HTMLWebpackPlugin = require('html-webpack-plugin'); //Плагин для работы с HTML ( компиляция )
const CopyWebpackPlugin = require('copy-webpack-plugin'); //Плагин для копирования файлов откуда и куда надо
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')

//Определение текущего режима
const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
  const config = {
    splitChunks:{
      chunks: 'all'
    }
  }

  if(isProd){
    config.minimizer = [
      new CssMinimizerWebpackPlugin(),
      new TerserWebpackPlugin()
    ]
  }

  return config
}

module.exports = {
  context: path.resolve(__dirname, 'src'), //Говорит где лежат все исходники приложения

  mode: 'development', //Режим по умолчанию

  entry:{ //Точка входа
    main: './index.js'
  },

  output: { //Точка финальной сборки 
    filename: '[name].[contenthash].js', //В какой файл компилировать js
    path: path.resolve(__dirname, 'dist'), //Куда этот файл поместить ( в папку dist в текущей директории )
    clean: true,
  },

  plugins:[ //Плагины
    //Добавление плагина
    new HTMLWebpackPlugin({
      template: './index.html',
      minify:{
        collapseWhitespace: isProd
      }
    }),

    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),

    new CopyWebpackPlugin({
      patterns:[
        {
          from: path.resolve(__dirname, 'src/assets'),
          to: path.resolve(__dirname, 'dist/assets')
        }
      ]
    })
  ],
  resolve:{
    extensions:['.js', '.json'], //Если мы в импорт не пишем расширение - искать из массива
    alias:{ //Алиас для импортов
      '@models': path.resolve(__dirname, 'src/models'),
      '@': path.relative(__dirname, 'src')
    }
  },

  optimization: optimization(),
  devServer:{ //Локальный сервер
    port: 3000,
    hot: isDev
  },
  module:{ //Лоадеры
    rules:[
      {
        test:/\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'] //Порядок справа налево
      },
      {
        test:/\.s[ac]ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'] //Порядок справа налево
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        type: 'asset/resource'
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        type: 'asset/resource'
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}