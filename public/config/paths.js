const path = require('path');
const fs = require('fs');

// 获取文件夹路径
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, 'public',relativePath);

module.exports = {
	appIndexJs: resolveApp('src/index.js'),
	appSrc: resolveApp('src'),
	appHtml: resolveApp('index.html'),
	appDist: resolveApp('dist'),
	appBuild: resolveApp('build'),
	appStatic: resolveApp('build/static'),
	
}