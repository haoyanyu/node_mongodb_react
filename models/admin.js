import mongoose, { mongo } from 'mongoose';

const Schema = mongoose.Schema;

const adminSchema = new Schema({
	user_name: String,
	password: String,
	id: Number,
	status: Number,
	create_time: String,
	
})
adminSchema.index({id: 1})

const Admin = mongoose.model('Admin', adminSchema)

export default Admin