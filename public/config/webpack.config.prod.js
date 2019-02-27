const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
const px2rem = require('postcss-px2rem');
const webpack = require('webpack');
// 抽离公共css，webpack4.0开始用这个
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = require('./base');
const paths = require('./paths.js');
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
const getStyleLoaders = (cssOptions, preProcessor) => {
	const loaders = [{
			loader: MiniCssExtractPlugin.loader,
			options: Object.assign({}, {
				publicPath: '../'
			})
		},
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
				],
				sourceMap: shouldUseSourceMap,
			}
		}
	]
	if (preProcessor) {
		loaders.push({
			loader: preProcessor,
			options: {
				sourceMap: shouldUseSourceMap,
			},
		});
	}
	return loaders
}

module.exports = {
	mode: 'production',
	devtool: shouldUseSourceMap ? 'source-map' : false,
	entry: {
		index: paths.appIndexJs
	},
	output: {
		path: paths.appBuild,
		filename: 'static/js/[name].[chunkhash:8].js',
		chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
		publicPath: './'
	},
	resolve: {
		extensions: ['.js', '.jsx', '.css', 'scss', '.less', '.json'],
		alias: config.commonAlias
	},
	// 将公共的依赖模块提取到已有的入口 chunk 中
	optimization: {
		// minimize: true, //是否需要压缩，production环境中默认true
		minimizer: [//自行提供的压缩工具
		// 压缩css
			new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          parser: safePostCssParser,
          map: shouldUseSourceMap ? { inline: false, annotation: true, } : false,
        },
      }),
		] ,
		splitChunks: { //提取公共代码

			cacheGroups: {
				commons: {
					name: "commons",
					chunks: "initial",
					minChunks: 2
				}
			}
		},
		runtimeChunk: true, 
		// noEmitOnErrors: false,  //在编译时出现错误时，使用跳过发射阶段
		// namedModules: true, //webpack使用可读模块标识符以获得更好的调试,未在webpack配置中设置，则webpack将默认启用模式 development并禁用模式 production。
		// flagIncludedChunks: true, //告诉webpack确定并标记作为其他块的子集的块，其方式是当已经加载较大的块时不必加载子集
		// mergeDuplicateChunks: false, //告诉webpack合并包含相同模块的块,为false将禁用此优化
		// removeEmptyChunks: false, //删除空的块
		// removeAvailableModules: false, // 这些模块已包含在所有父项中时,告诉webpack检测并从块中删除模块,为false将禁用此优化
		// namedChunks: true, //告诉webpack使用可读的块标识符以获得更好的调试, 默认false
		// nodeEnv: 'production', //告诉webpack设置process.env.NODE_ENV为给定的字符串值
		// mangleWasmImports: false, //设置为true告诉webpack通过将导入更改为更短的字符串来减小WASM的大小。它会破坏模块和导出名称
	},
	module: {
		rules: [{
				// 在以下loader中查找对应处理方法，直到找到为止，找不到就用最后一个file-loader
				oneOf: [{
						test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
						use: [{
								loader: 'url-loader',
								options: {
									limit: 1024 * 30, //小于30kb的用url-loader转成base64
									name: 'static/media/[name].[hash:8].[ext]'
								},
							},
							{
								loader: 'image-webpack-loader', // 压缩图片
								options: {
									disable: false, //是否禁止压缩，默认false
									quality: 80, //压缩质量，也可以是'70-80'
								}
							}
						]
					},
					{
						test: /\.css$/,
						use: getStyleLoaders({
							importLoaders: 1,
							sourceMap: shouldUseSourceMap
						}),
						sideEffects: true
					},
					{
						test: /\.less$/,
						use: getStyleLoaders({
							importLoaders: 2,
							sourceMap: shouldUseSourceMap
						}, 'less-loader'),
						sideEffects: true
					},

					{
						test: /\.(js|jsx)/,
						include: paths.appSrc,
						loader: 'babel-loader'
					},
					{
						loader: require.resolve('file-loader'),
						exclude: [/\.(js|mjs|jsx)$/, /\.html$/, /\.json$/],
						options: {
							name: 'static/media/[name].[hash:8].[ext]',
						},
					},

				]
			}


		]
	},
	plugins: [
		// 压缩js
		new UglifyJSPlugin({
			uglifyOptions: {
				sourceMap: false,
				compress: {
					// warning: false, //压缩删除没有用到的代码时不发出警告
					drop_console: true, //删除所有console.log
				},
				output: {
					comments: false //删除所有注释
				}
			}

		}),
		// 定义环境变量
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		}),
		// 指定HTML入口模板
		new HtmlWebpackPlugin({
			inject: true,
			template: paths.appHtml,
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true,
			},
		}),
		// 提取外部引入的css
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: 'static/css/[name].[contenthash:8].css',
			chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
		}),
		new ManifestPlugin({
			fileName: 'asset-manifest.json'
		}),
	]
}