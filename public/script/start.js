const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./../config/webpack.config.dev.js');
const devServerConfig = require('./../config/webpack.devServer.js');
const path = require('path');
const chalk = require('chalk');

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

process.env.PORT = '8058';
// process.env.HOST = 'localhost';
devServerConfig.publicPath = config.output.publicPath;

// console.log(devServerConfig)
var server = new WebpackDevServer(webpack(config), devServerConfig);
var default_port = parseInt(process.env.PORT, 10) || 8080;

server.listen(default_port,process.env.HOST,function(err){
	if(err) {
		return console.log(err)
	}
	console.log(chalk.cyan('Starting the development server...\n'));
})