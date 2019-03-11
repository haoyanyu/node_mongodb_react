import mongoose, {mongo} from 'mongoose';

const Schema = mongoose.Schema;

const shopSchema = new Schema({
	id: Number,
	shop_name: String,
	shop_no: String,
	create_time: String,
	status: Number,
	shop_admin_no: String,
	shop_admin_name: String,
	shop_address: String,
	shop_admin_phone: String,
})

const Shop = mongoose.model('Shop', shopSchema)

export default Shop