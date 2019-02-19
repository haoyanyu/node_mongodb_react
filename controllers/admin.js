import AdminModel from './../models/admin'
import dtime from 'time-formater';
import crypto from 'crypto';


function md5(password) {
	const md5 = crypto.createHash('md5');
	return md5.update(password).digest('base64')
}

module.exports = {
	async login(req, res, next) {
		if(!req.body.username ||!req.body.password) {
			return next(new Error('缺少参数'))
		}
		const admin = await AdminModel.findOne({user_name: req.body.username})
		if(!admin) {
			res.send({
				code: '1',
				desc: '用户不存在，请注册用户'
			})
		}else {
			if(admin.password === md5(req.body.password)) {
				req.session.username = req.body.username
				res.send({
					code: '0',
					desc: '登录成功'
				})
			} else {
				res.send({
					code: '4',
					desc: '密码输入错误'
				})
			}
		}
	},
	async register(req, res, next) {
		if(!req.body.username ||!req.body.password || !req.body.password_again) {
			return next(new Error('缺少参数'))
		}
		if(req.body.password !== req.body.password_again) {
			res.send({
				code: '2',
				type:'PASSWORD_AND_AGAIN_DISFRENT',
				desc: '两次密码输入不一致'
			}) 
		}
		const {username, password, password_again} = req.body
		const admin = await AdminModel.findOne({user_name: username})
		if(admin) {
			res.send({
				code: '3',
				type:'USER_IS_EXIST',
				desc: '用户已存在，请直接登录'
			}) 
		} else {
			const newAdmin = {
				user_name: username,
				password: md5(password),
				status: 1,
				create_time: dtime().format('YYYY-MM-DD HH:mm')
			}
			await AdminModel.create(newAdmin)
			req.session.username = username
			res.send({
				code: '0',
				desc: '用户注册成功',
				type:'REGISTER_SUCCESS'
			})
		}
	}

	
}