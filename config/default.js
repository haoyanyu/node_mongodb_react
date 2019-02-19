module.exports = {
	url: 'mongodb://127.0.0.1:27017/test',
	session: {
		name: 'SID',
		secret: 'SID',
		cookie: {
			httpOnly: true,
			secure:   false,
			maxAge:   365 * 24 * 60 * 60 * 1000,
		}
	}
}