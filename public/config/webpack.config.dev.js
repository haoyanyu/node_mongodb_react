'use strict';

const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const px2rem = require('postcss-px2rem');
const webpack = require('webpack');
const config = require('./base');
// 获取文件夹路径
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, 'public',relativePath);

process.env.PORT = '8058';
process.env.HOST = 'localhost'
// console.log(process.env.HOST)
module.exports = {
	mode: 'development',
	// 单文件入口
	// entry: resolveApp('src/index.js'),
	// 单文件，启用nodejs的热更新
	entry: [
		'webpack-dev-server/client?http://' + process.env.HOST + ':' + process.env.PORT, // 热更新监听此地址                                                     
		'webpack/hot/dev-server', // 启用热更新
		resolveApp('src/index.js')
	],
	// 多文件入口
	// entry:{
	// 	pageOne: resolveApp('src/pageOne/index.js'),
	// 	pageTwo: resolveApp('src/pageTwo/index.js'),
	// },
	// 单文件出口
	output: {
		path: path.resolve(__dirname, '..', 'build'),
		filename: 'bundle.js',
		chunkFilename: '[name].chunk.js',
		publicPath: '/'
	},

	// 多入口
	// output:{
	// 	filename:'[name].js',
	// 	path: path.resolve(__dirname, '..', 'build')
	// },

	resolve: {
		extensions: ['.js', '.jsx', '.css', 'scss', '.less', '.json'],
		alias: config.commonAlias
	},

	module: {
		rules: [{
				test: /\.css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							plugins: () => [
								require('postcss-preset-env')({
									autoprefixer: {
										browsers: [
											'>1%',
											'last 4 versions',
											'Firefox ESR',
											'not ie < 9', // React doesn't support IE8 anyway
										],
										flexbox: 'no-2009',
									},
									stage: 3,
								}),
								px2rem({
									remUnit: 16
								})
							]
						}
					}
				]
			},
			{
				test: /\.less$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							plugins: () => [
								require('postcss-preset-env')({
									autoprefixer: {
										browsers: [
											'>1%',
											'last 4 versions',
											'Firefox ESR',
											'not ie < 9', // React doesn't support IE8 anyway
										],
										flexbox: 'no-2009',
									},
									stage: 3,
								}),
								px2rem({
									remUnit: 16
								})
							]
						}
					},
					'less-loader'
				]
			},
			{
				test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: 'static/media/[name].[hash:8].[ext]',
				},
			},
			{
				test: /\.(js|jsx)/,
				include: resolveApp('src'),
				loader: 'babel-loader'
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: true,
			template: resolveApp('index.html'),
			// title:'react-webpack', //HTML中的title

		}),
		new webpack.HotModuleReplacementPlugin(),
	],
	// devServer

}