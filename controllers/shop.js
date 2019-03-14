import ShopModel from './../models/shop';
import dtime from 'time-formater';

module.exports = {
	async queryUserShop(req, res, next) {
		if(!req.body.username)  {
			return next(new Error('缺少参数'))
		}
		const shops = await ShopModel.find({shop_admin_name: req.body.username})
		res.send({
			code: '0',
			desc: '成功',
			data: shops
		})
	},
	async addShop(req, res, next) {
		const {
			shopName,
			merchantName,
			shopAdminPhone,
			shopCity,
			shopCityName,
			shopAddress,
			shopAdminName
		} = req.body

		await ShopModel.insertMany({
			shop_name: shopName,
			shop_no: new Date().getTime(),
			create_time: dtime().format('YYYY-MM-DD HH:mm:ss'),
			status: 1,
			shop_admin_name: shopAdminName,
			shop_address: shopAddress,
			shop_city: shopCityName,
			shop_city_code: shopCity,
			shop_admin_phone: shopAdminPhone,
			merchant_name: merchantName
		})

		res.send({
			code: '0',
			desc: '店铺新增成功',
			type:'ADDSHOP_SUCCESS'
		})
	}
}