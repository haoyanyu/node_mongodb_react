import admin from './admin'
import business from './business'

module.exports = function(app) {
	app.use('/api/user/', admin)
	app.use('/api/business/', business)
}