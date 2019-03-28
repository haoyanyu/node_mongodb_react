'use strict';

process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';
process.env.STATIC_ENV = 'production';

process.env.GENERATE_SOURCEMAP = 'false'

const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const ora = require('ora'); //加个图标转圈圈的
const rm = require('rimraf'); //清空指定的文件夹 rm-rf

const spinner = ora('building for production...')
spinner.start()

const paths = require('../config/paths');
const webpackConfig = require('./../config/webpack.config.prod.js');


rm(path.join(paths.appBuild), err => {
	if (err) throw err
	webpack(webpackConfig, (err, stats) => {
		spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
	process.exit();
	});
})