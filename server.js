require('dotenv').config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const app = require('./router/app.js');
const port = process.env.PORT || 3000;

const https = require('https');
const fss = require('fs');
const privateKey = fss.readFileSync('./sslcert/key.pem', 'utf8');
const certificate = fss.readFileSync('./sslcert/cert.pem', 'utf8');

const credentials = { key: privateKey, cert: certificate };
const httpsServer = https.createServer(credentials, app);


var server = app.listen(port, function () {
	console.log('Server running at port', port);
});

