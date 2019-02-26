const fs = require('fs');
const path = require('path');

// 获取文件夹路径
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const host = process.env.HOST || '0.0.0.0';

const devServer = {
	hot: true,
	port: 8058,
	compress: true,
	contentBase: resolveApp('build'),
	//html5接口,设置为true，所有路径均转到index.html
	historyApiFallback:true,
	inline: true,
	stats:{colors: true},
	proxy:{},
	host,
	
}

module.exports = devServer