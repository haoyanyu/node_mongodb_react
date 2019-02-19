import config from './../config/default.js';
import chalk from 'chalk';
import mongoose from 'mongoose';

mongoose.connect(config.url,{ useNewUrlParser: true })
// console.log(precess.NODE_ENV)
var db = mongoose.connection;

db.on('open', function(){
	console.log(
		chalk.green('数据库连接成功')
	)
})

db.on('error', function(error){
	console.error(
		chalk.red('Error in MongoDb connection: ' + error)
	);
	mongoose.disconnect();
})

db.on('close', function(){
	console.log(
		chalk.red('数据库断开，重新连接')
	)
	mongoose.connect(config.url,{server:{auto_reconnect:true}})
})

export default db