import admin from './admin'
import business from './business'
import shop from './shop'

module.exports = function(app) {
	app.use('/api/user/', admin)
	app.use('/api/business/', business)
	app.use('/api/shop/', shop)
}