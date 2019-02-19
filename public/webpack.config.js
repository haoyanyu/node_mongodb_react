const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');//自动化css独立加载插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const paths = require('./webpack/paths.js')


//判断运行环境是development还是production
const ENV = process.env.NODE_ENV || "development";
const DEBUG = ENV == "development";


var entry, output;

entry = {
	index: path.join(__dirname, 'index.js',)
};
output = {
	path: path.join(__dirname + '/build/'),
	filename: 'js/[name].js',
	chunkFilename: 'js/[name].chunk.js'
}

var plugins = [
	new HtmlWebpackPlugin({
		inject: true,
		template: './public/index.html',
	}),
	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: DEBUG ? '"develpoment"' : '"production"'
		}
	}),
	new ExtractTextPlugin({
		filename: path.join(__dirname, '/build/','css/[name].[contenthash].css')
	})
]

var config = {
	entry,
	output,
	plugins,
	resolve: {
		extensions: ['.mjs', '.web.js', '.js', '.json', '.web.jsx', '.jsx'],
		alias: {
			'@': path.join(__dirname,'pages'),
    },
	},
	
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				loaders: [ 'babel-loader']
			},
			// css文件单独打包出来
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
				fallback: "style-loader",
				use: "css-loader"
				})
			},
			{
				test:/\.(scss|sass)/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use:[
						'css-loader',
						'sass-loader'
					]
				})
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 200000,
					name: path.join(__dirname,'/static/img/[name].[hash:7].[ext]')
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: path.join(__dirname,'/static/fonts/[name].[hash:7].[ext]')
				}
			}
		]
	}
}

if(DEBUG) {
	config.devServer = {
		port: '3001',
		host: '0.0.0.0',
		hot: true,
		overlay: {
			errors: true
		},
		// open: true,

	}
	config.plugins.push(
		new webpack.HotModuleReplacementPlugin()
	)
	config.plugins.push(
		new webpack.NoEmitOnErrorsPlugin()
	)
	config.devtool = '#cheap-module-eval-source-map'
} else {
	config.plugins.push(
		new CopyWebpackPlugin([{
			from: path.join(__dirname, 'static'),
			to: 'static',
			ignore: ['.*']
		}])
	)
	config.output.publicPath = './'
}

module.exports = config