var path = require('path')
var extractTextPlugin = require('extract-text-webpack-plugin')
var config = require('../config')
var projectRoot = path.resolve(__dirname, '../')

// 这个函数用来把传入的参数和打包文件夹拼接
// 至于为什么要写成一个函数，因为会调用两次，如果每次都这样写不是很麻烦吗？现在只要调用一个函数就可以了
exports.assetsPath = (_path) => {
	var assetsSubDirectory = process.env.NODE_ENV === 'production'
		? config.build.assetsSubDirectory
		: config.dev.assetsSubDirectory
	return path.posix.join(assetsSubDirectory, _path)	
}

// 样式的 loader
exports.cssLoaders = (options) => {
	options = options || {}
	// 生成 loaders
	function generateLoaders (loaders) {
		var sourceLoader = loaders.map(loader => {
			var extraParamChar
			// 判断 loader 是否有 ?
			if(/\?/.test(loader)) {
				// 
				loader = loader.replace(/\?/, '-loader')
				extraParamChar = '&'
			} else {
				loader = `${loader}-loader`
				extraParamChar = '?'
			}

			//
			return loader + (options.sourceMap ? `${extraParamChar}sourceMap` : '')
			// return loader
		})

		// 如果传入的配置项中要求打包 css 文件
		if(options.extract) {
			return extractTextPlugin.extract(sourceLoader)
		} else {
			return sourceLoader.join('!')
		}
	}

	return {
		css: generateLoaders(['css']),
		// postcss: generateLoaders(['css']),
		// scss: generateLoaders(['css', 'sass']),
	}
}

// 暴露出来的方法，传入配置项，返回 loaders 数组
exports.styleLoaders = (options) => {
	var output = []
	// 返回 loaders
	var loaders = exports.cssLoaders(options)
	for(var extension in loaders) {
		var loader = loaders[extension]
		output.push({
			test: new RegExp('\\.' + extension + '$'),
			loader
		})
	}
	return output
}