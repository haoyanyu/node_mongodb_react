'use strict';

const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const px2rem = require('postcss-px2rem');
const webpack = require('webpack');
const paths = require('./paths.js');
const config = require('./base');

process.env.PORT = '8058';
process.env.HOST = 'localhost'

const getStyleLoaders = (cssOptions, preProcessor) => {
	const loaders = [
		'style-loader',
		{
			loader: 'css-loader',
			options: cssOptions
		},
		{
			loader: 'postcss-loader',
			options: {
				ident: 'postcss',
				plugins: () => [
					require('postcss-flexbugs-fixes'),
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
	if (preProcessor) {
    loaders.push(preProcessor);
  }
	return loaders
}

module.exports = {
	mode: 'development',
	devtool: 'cheap-module-source-map',
	// 单文件入口
	// entry: paths.appIndexJs,
	// 单文件，启用nodejs的热更新
	entry: [
		'webpack-dev-server/client?http://' + process.env.HOST + ':' + process.env.PORT, // 热更新监听此地址                                                     
		'webpack/hot/dev-server', // 启用热更新
		paths.appIndexJs
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
	// 	filename:'./js/[name]/[name].js',
	// 	path: path.resolve(__dirname, '..', 'build')
	// },
	resolve: {
		extensions: ['.js', '.jsx', '.css', 'scss', '.less', '.json'],
		alias: config.commonAlias
	},
	module: {
		rules: [{
				test: /\.css$/,
				use: getStyleLoaders({
					importLoaders: 1
				})

			},
			{
				test: /\.less$/,
				use: getStyleLoaders({importLoaders: 2}, 'less-loader')
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
				include: paths.appSrc,
				loader: 'babel-loader'
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin([paths.appBuild]),
		new HtmlWebpackPlugin({
			inject: true,
			template: paths.appHtml,
			// title:'react-webpack', //HTML中的title

		}),
		new webpack.HotModuleReplacementPlugin(),
	],
	// devServer

}