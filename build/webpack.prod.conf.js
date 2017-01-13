var path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge')
// 提取文本插件，用来生成 css 文件
var extractTextPlugin = require('extract-text-webpack-plugin')
var htmlWebpackPlugin = require('html-webpack-plugin')

var config = require('../config')
var utils = require('./utils')
var baseWebpackConfig = require('./webpack.base.conf')

var env = config.build.env

var webpackConfig = merge(baseWebpackConfig, {
	module: {
		// 调用 styleLoaders 返回 loaders 并制定要提取出单独的 css 文件
		loaders: utils.styleLoaders({sourceMap: config.build.productionSourceMap, extract: true})
	},
	devtool: config.build.productionSourceMap ? '#source-map' : false,
	output: {
		// 打包文件夹
		path: config.build.assetsRoot,
		filename: utils.assetsPath('js/[name].[chunkhash].js'),
		chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': env
		}),
		// 混淆？
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new webpack.optimize.OccurrenceOrderPlugin(),
		// 提取 css 文件到单独的文件中，而不是插入到 index.html 的 head 标签内
		new extractTextPlugin(utils.assetsPath('css/[name].[contenthash].css')),
		// 处理 html 文件
		new htmlWebpackPlugin({
			filename: config.build.index,
			template: 'index.html',
			inject: true,
			minify: {
				// 移除注释
				removeComments: true,
				// 合并空白
				collapseWhitespace: true,
				// 移除属性的引号？
				removeAttributeQuotes: true
				// 更多配置参考 https://github.com/kangax/html-minifier#options-quick-reference
			},
			chunksSortMode: 'dependency'
		}),
		// 提取 react、jquery 这种第三方公共库
		new webpack.optimize.CommonsChunkPlugin({
			name: 'ventor',
			minChunks (module, count) {
				return (
					module.resource &&
					/\.js$/.test(module.resource) &&
					module.resource.indexOf(path.join(__dirname, '../node_modules') === 0)
				)
			}
		}),
		// 提取 webpack 运行时和模块 manifest 到单独的文件中
		new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest',
			chunks: ['vendor']
		})
	]
})

module.exports = webpackConfig