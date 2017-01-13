var path = require('path')
var extractTextPlugin = require('extract-text-webpack-plugin')

var config = require('../config')

var projectRoot = path.resolve(__dirname, '../')
var env = process.env.NODE_ENV
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap)
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd
// 静态服务器目录，也是打包后文件的生成目录
var assetsRoot = config.build.assetsRoot
// 导出基础配置
module.exports = {
	entry: {
		app: './src/index.js'
	},
	output: {
		// 输出目录？
		path: assetsRoot,
		publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
		filename: '[name].js'
	},
	resolve: {
		// 引入这些文件后缀名的时候可以省略后缀名
		extensions: ['', '.js', '.json'],
		fallback: [path.join(__dirname, '../node_modules')],
		alias: {
			'src': path.resolve(__dirname, '../src'),
			'assets': path.resolve(__dirname, '../src/assets'),
			'components': path.resolve(__dirname, '../src/components')
		}
	},
	resolveLoader: {
		fallback: [path.join(__dirname, '../node_modules')]
	},
	module: {
		loaders: [
			{
		        test: /\.vue$/,
		        loader: 'vue'
	      	},
			{
		        test: /\.js$/,
		        loader: 'babel',
		        include: projectRoot,
		        exclude: /node_modules/
	      	},
			{
				test: /\.json/,
				loader: 'json'
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url',
				query: {
					limit: 10000,
					name: path.join(assetsRoot, 'img/[name].[hash:7].[ext]')
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url',
				query: {
					limit: 10000,
					name: path.join(assetsRoot, 'font/[name].[hash:7].[ext]')
				}
			}
		]
	}
}
