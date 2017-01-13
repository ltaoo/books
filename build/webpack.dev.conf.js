var path = require('path')
var config = require('../config')
var webpack = require('webpack')
var baseWebpackConfig = require('./webpack.base.conf')
var utils = require('./utils')

var merge = require('webpack-merge')
var htmlWebpackPlugin = require('html-webpack-plugin')
var friendlyError = require('friendly-errors-webpack-plugin')

// 由于支持热重载，所以配置文件中的 entry 字段需要加上 /build/dev-client
Object.keys(baseWebpackConfig.entry).forEach(name => {
	baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})
var projectRoot = path.resolve(__dirname, '../')
// 导出配置
module.exports = merge(baseWebpackConfig, {
	module: {
		loaders: utils.styleLoaders({sourceMap: config.build.productionSourceMap})
	},
	devtool: '#eval-source-map',
	plugins: [
		new webpack.DefinePlugin({
			'process.env': config.dev.env
		}),
		// ?
		new webpack.optimize.OccurrenceOrderPlugin(),
		// 支持热重载
		new webpack.HotModuleReplacementPlugin(),
		// https://github.com/ampedandwired/html-webpack-plugin
		// 将 html 文件插入 script 标签、并拷贝到静态服务器目录下 ps: 文件是看不见的
		new htmlWebpackPlugin({
			filename: 'index.html',
			template: 'index.html',
			inject: true
		}),
		// 代码出错后在浏览器页面也显示
		new friendlyError()
	]
})
