// https://github.com/shelljs/shelljs
// 加载该依赖后可以直接使用 shell 命令如 rm 等
require('shelljs/global')
env.NODE_ENV = 'production'

var path = require('path')
var ora = require('ora')
var webpack = require('webpack')
// 通用配置
var config = require('../config')
// webpack 打包配置
var webpackConfig = require('./webpack.prod.conf')

console.log(`
	提示:
	打包后得到的网站，必须在 HTTP 服务器下才能工作,
	不能直接打开
`)

// 显示进度
var spinner = ora('building for production')
spinner.start()

// 获取到打包的文件夹路径
var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
// 删除已经存在的打包文件夹, -rf 参数是用来删除非空文件夹
rm('-rf', assetsPath)
// 创建打包
mkdir('-p', assetsPath)
// 拷贝项目下的 static 文件夹到打包文件夹下
cp('-R', '/static/*', assetsPath)

webpack(webpackConfig, (err, stats) => {
	// 打包完成后停止终端的 loading
	spinner.stop()
	if(err) throw err

	process.stdout.write(stats.toString({
		colors: true,
		modules: false,
		children: false,
		chunks: false,
		chunkModules: false
	}) + '\n')
})
