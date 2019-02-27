# webpack常用配置
* 处理es6
- 处理es6需要babel转码，babel-core babel-loader
`npm i -D babel-core babel-loader`
- 编译es6的预设babel-preset-env
`npm i -D babel-preset-env`
```
	{
		"preset": ["env"]
	}
```
- 安装ES6插件(处理es6的新api，transform-runtime，babel-polyfill，babel-runtime)
`npm i -D babel-plugin-transform-runtime babel-runtime`

* 处理css
- css
`npm i -D style-laoder css-loader`
- 分离css，(production环境中使用)
	webpack3.0是用extract-text-webpack-plugin， webpack4.0用的是mini-css-extract-plugin
	webpack.config.js的配置
	```
	module:{
		rules: [
			test: /\.css$/,
			use: [
				// 使用 MiniCssExtractPlugin 插件后就不做需要style-loader了
				MiniCssExtractPlugin.loader,
				'css-loader'
			]
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
		})
	]
	
	```
- less，sass, stylus 
	安装对应loader（less, less-loader node-sass,sass-laoder stylus-loader等等）
- postcss
	```
	// 安装 postcss-loader
	npm install -D postcss-loader
	// 安装postcss插件
	npm install -D postcss-preset-env  autoprefixer
	```
* 处理静态资源
- 资源路径
	file-loader(js和css中导入的图片路径转化为正确的路径)
	```
		options: {
			// 将图片打包到了path目录下，并生成原图片名加8位hash值的图片名
			name: 'static/media/[name].[hash:8].[ext]',
			// 将图片打包到该公共目录下
			outputPath: 'images/',
			// 图片引入资源的共路径，发布线上时很有用
			publicPath: 'assets/'
		}
	```
	url-loader(会将引入的图片编码，生成dataURl,减少HTTP请求)
	```
	options:{
		// name 同flie-loader
		name: 'static/media/[name].[hash:8].[ext]',
		// 小于10000字节的转换为DataUrl格式
		limit:10000,
		// 是否采用file-loader， 默认采用
		// 还可以用responsive-loader等一些其他loader
		fallback: 'file-loader',
		// 设置要处理的MIME类型，
		mimetype:'image/png',
	}
	```
	image-webpack-loader(压缩图片)
	```
	options: {
		disable: false //是否禁止压缩，默认false
		quality: 80, //压缩质量，也可以是'70-80'
	}
	```
* 处理目录文件
- 自动构建HTML
	html-webpack-plugin(自动生成HTML)
	html-webpack-template(定制HTML,提供了一个位于node_modules/html-webpack-template/index.ejs的模板，需要制定inject为false)
	```
	new HtmlWebpackPlugin({
		//使用自带模板时，设置为false,使用自己的html模板是设置为true
		inject: false, 
		// 模板路径'node_modules/html-webpack-template/index.ejs'
		template: require('html-webpack-template'),
		// template: './index.html', 
		//使用自己的模板时以下配置不起作用
		title: '模版html',
		links: [ // 引入<link>
				{
						href: 'http://webxiaoma.com/img/manong.jpg',
						rel: 'icon'
				}
		],
		scripts: [ // 引入<script>
				'http://example.com/somescript.js'
		]
	})
	```
- 清除打包遗留
	clean-webpack-plugin
	`new CleanWebpackPlugin(['dist'])`
- 复制文件
	copy-webpack-plugin
	```
	new CopyWebpackPlugin([
    	{
				// 要复制的目录
				from: path.resolve(__dirname, './static'),
				// 打包到输出目录下的static目录中
				to: 'static',
				// 忽略png文件，['.*']表示复制任何文件
				ignore: ['*.png']
    	})]
	```
* devServer
		```
		module.exports = {
			devServer:{
				// 设置服务器从那个目录提供内容，默认当前
				contentBase: path.join(__dirname, 'dist'),
				//告知服务器，观察 devServer.contentBase 下的文件。
				//文件修改后，会触发一次完整的页面重载
				watchContentBase: true,
				//一切服务都启用 gzip 压缩
				compress: true,
				// 刷新模式，false时启用iframe模式
				inline:false,
				//默认是 localhost。如果你希望服务器外部可访问设置'0.0.0.0'
				host: 'localhost',
				port: 9000 // 启动端口默认8080
				hot: false, // 是否启动热模块替换,(启用下也会启用自动刷新)
				hotOnly: true, // 仅启动自动刷新
				proxy:{}, // 设置请求代理
				open: true, // 启动后是否自动打开默认浏览器
				//指定打开浏览器时的导航页面。
				openPage: '/different/page',
				//当出现编译器错误或警告时，在浏览器中显示全屏覆盖层,默认false
				overlay:true,
				//允许浏览器使用本地 IP 打开。
				useLocalIp:true,
				watchOptions:{} // 和watch模式下的相同
			}
		}
		```
* 使用vue
`npm i -D babel-plugin-transform-vue-jsx babel-helper-vue-jsx-merge-props babel-plugin-syntax-jsx `
	对于 babel-plugin-transform-vue-jsx 插件
	如果使用Babel 7，使用4.x
	如果使用Babel 6，使用3.x
* 使用react,解析jsx语法
`npm i -D babel-preset-react`
.babelrc中加上
```
"presets": [
		"env",
		"react" 
],
```
* react-router4按需加载
- 安装react-loadable
- 安装babel-plugin-syntax-dynamic-import
* 提取公共代码
在 webpack v3.0+中我们提取公共代码使用的是 CommonsCHunkPlugin 插件, 而在 webpack v4.0+中我们使用SplitChunksPlugin 插件
- CommonsCHunkPlugin
```
new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks (module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
```
- SplitChunksPlugin
SplitChunksPlugin插件在webpack4 中已经内置了，我们只需要在配置文件中的optimization.splitChunks字段中去配置就可以
```
optimization:{
		splitChunks:{
					/*
						all  异步和同步都可以共享
						async 表示对动态（异步）导入的模块进行分离。
						initial 表示对初始化值进行分离优化。
					*/
				chunks:'all',//  async、 initial 、 all
				name:'jquery', //打包后的名字
				minSize:2000, //(默认是30000)：形成一个新代码块最小的体积
				//（默认是1）：在分割之前，这个代码块最小应该被引用的次数
				//（译注：保证代码块复用性，默认配置的策略是不需要多次引用也可以被分割）
				minChunks:1, 
				maxInitialRequests:3, //（默认是3）：一个入口最大的并行请求数
				maxAsyncRequests:5, //（默认是5）：按需加载时候最大的并行请求数。
				//  此选项允许您指定用于生成名称的分隔符 默认以~分割
				automaticNameDelimiter: '~',

				// 下面是缓存组的配置
				//缓存组会继承splitChunks的配置，
				//但是test、priorty和reuseExistingChunk只能用于配置缓存组。
				//可以通过optimization.splitChunks.cacheGroups.default: false禁用default缓存组
				cacheGroups: { 
						default: { // 默认缓存组的配置
								minChunks: 2,
								//定义缓存组的优先级 更高优先级的缓存组可以优先打包所选择的模块）（默认自定义缓存组优先级为0）
								priority: -20, 
								//选项允许复用已经存在的代码块，而不是新建一个新的，需要在精确匹配到对应模块时候才会生效。
								reuseExistingChunk: true,
						},
						vendors: {
								//选项用于控制哪些模块被这个缓存组匹配到 默认所有模块
								// 值得类型RegExp、String和Function
								test: /[\\/]node_modules[\\/]/, // 这里选的是node_modules中的模块
								priority: -10 //定义缓存组的优先级
						}
				}
		}
}
```
	



