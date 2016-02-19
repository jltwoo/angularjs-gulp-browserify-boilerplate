'use strict';

var SwaggerExpress = require('swagger-express-mw')
, express = require('express')
, appREST = express()
, appWeb = express()
, path = require('path')
, http = require('http')
, web = require('./web');

var passport = require('passport');


module.exports = appREST; // for testing

var config = {
  appRoot: __dirname // required config
};

var webConfig = {
	domain: 'localhost',
	http_port: 3000,
	https_port: 8443,
	clientPublicPath: path.join(__dirname, '../build/'),

	cacheMaxAge: 345600,
	sessionMaxAge : 5184000000,

	CONSTANTS:{
		SERVER_MODE:{
			DEV: 'dev',
			PROD:'prod'
		}
	}, 
	passport:{
		secretOrKey: 'secret'
	}
}

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(appREST);

  var port = 10010;
  appREST.listen(port);

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  }
});

web.init(appWeb, webConfig, passport);
require('./util/passport')(appWeb,webConfig,passport);

http.createServer(appWeb).listen(appWeb.get('port'), function() {
  console.log("Express server listening on port " + appWeb.get('port'));
}); 
