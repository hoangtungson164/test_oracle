require('dotenv').config();
var config = {
	database: {
		host: '1.55.215.214',
		user: 'root',
		password: 'infocity12!@',
		port: 3969,
		database: 'scrap',
		dialect: 'mysql',
		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000
		  }
	},
	redis: {
		host: 'localhost',
		port: 6379
	},
	server: {
		host: '127.0.0.1',
		port: '3200'
    },
    secret: {
        'secret': process.env.SECRET
    }
}

module.exports = config;