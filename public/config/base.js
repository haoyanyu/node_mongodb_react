const path = require('path');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
	commonAlias: {
		'@': resolve('src'),
		'Config': resolve('src/configs'),
		'Page': resolve('src/pages'),
		'Store': resolve('redux'),
	}
}