import db from './mongodb/db.js';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import config from './config/default';
import connectMongo from 'connect-mongo';
import Routes from './routes/';

const app = express();

app.use(bodyParser.json());

// 拆分后台和前端页面
app.all('*', function(req, res, next){
	const {origin, Origin, referer, Referer} = req.headers;
	const allowOrigin = origin || Origin || referer || Referer || '*';
	res.header("Access-Control-Allow-Origin", allowOrigin);
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("Access-Control-Allow-Credentials", true); //可以带cookies
	res.header("X-Powered-By", 'Express');
	if (req.method == 'OPTIONS') {
  	res.sendStatus(200);
	} else {
    next();
	}
})

// 解析cookie
app.use(cookieParser())
// 会话
var MongoStore = connectMongo(session)
app.use(session({
	name: config.session.name, //返回客户端的key名称，默认是connect_sid
	secret: config.session.secret, //加密字符串
	resave: true, //强制保存session
	saveUninitialized: false, //强制将未初始化的session存储，
	cookie: config.session.cookie,
	rolling: true, //每次请求时进行设置cookie，将处置cookie的过期时间
	store: new MongoStore({ //将session存储到mongodb数据库中
		url: config.url, //数据库地址
		touchAfter: 24*3600, //多长时间往数据库更新存储一下
	})
}))

// app.get('/', function(req, res, next){
// 	if(req.session.username) {
// 		next()
// 	} else {

// 		// res.send('找我干嘛？123')
// 		// res.send({code: '999' ,msg: '未登录'})
// 	}
// })

Routes(app)


/**
 * 前端页面和后台不分离
 * 访问page时，跳转到public/index.html页面
 * 需要使用webpack打包，打包后的js和css 需要手动引入index.html中，每次打包需要手动更新
 * 具体插入js， css文件待解决
 * react在production环境中运行
 * React is running in production mode, but dead code elimination has not been applied. 
 * Read how to correctly configure React for production: https://fb.me/react-perf-use-the-production-build
    at <anonymous>:1:205
 */
// app.use('*-page', function(req, res, next){
// 	res.sendfile('public/index.html')
// })
app.use('/images', express.static('./public/src/images'))
app.use(express.static('./public'));

app.listen(3001)
