import ShopModel from './../models/shop';
import dtime from 'time-formater';

module.exports = {
	async queryUserShop(req, res, next) {
		if(!req.body.username)  {
			return next(new Error('缺少参数'))
		}
		const shops = await ShopModel.find({user_name: req.body.username})
		res.send({
			code: '0',
			desc: '成功',
			data: shops
		})
	}
}