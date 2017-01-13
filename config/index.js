var path = require('path')

module.exports = {
	build: {
		env: require('./prod.env'),
		// 用来指定打包后生成的 html 文件名
		index: path.resolve(__dirname, '../dist/index.html'),
		assetsRoot: path.resolve(__dirname, '../dist'),
		assetsSubDirectory: 'static',
		assetsPublicPath: '/',
		productionSourceMap: true,
		// Gzip 默认是关闭的，因为服务器会帮助做这一工作，如果要开启需要先安装 compression-webpack-plugin
		productionGzip: false,
		productionGzipExtensions: ['js', 'css']
	},
	dev: {
		env: require('./dev.env'),
		port: 8080,
		assetsSubDirectory: 'static',
		assetsPublicPath: '/',
		// 可配置代理
		proxyTable: {},
		// 是否开启 css source map
		cssSourceMap: false
	}
}