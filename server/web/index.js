/*
 'use strict' is not required but helpful for turning syntactical errors into true errors in the program flow
 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
*/
'use strict';



/*
 Modules make it possible to import JavaScript files into your application.  Modules are imported
 using 'require' statements that give you a reference to the module.

  It is a good idea to list the modules that your application depends on in the package.json in the project root
 */
 var express = require('express')
, request = require("request")
, morgan = require('morgan')
, bodyParser = require('body-parser')
, cookieParser = require('cookie-parser')
, methodOverride = require('method-override')
, compression = require('compression')
var util = require('util');

// This is used for fileupload handling
// Refer to: https://github.com/expressjs/multer
var multer  = require('multer')
var upload = multer()


/*
 Once you 'require' a module you can reference the things that it exports.  These are defined in module.exports.

 For a controller in a127 (which this is) you should export the functions referenced in your Swagger document by name.

 Either:
  - The HTTP Verb of the corresponding operation (get, put, post, delete, etc)
  - Or the operationId associated with the operation in your Swagger document

  In the starter/skeleton project the 'get' operation on the '/hello' path has an operationId named 'hello'.  Here,
  we specify that in the exports of this module that 'hello' maps to the function named 'hello'
 */
module.exports = {
  init: init  
};

function init(app, config, passport_instance) {
  var domain        = config.domain;
  var http_port     = config.http_port;
  var https_port    = config.https_port;
  var server_mode = process.env.NODE_ENV;


  // Sets the server mode to dev or production
  app.set('server constants',config.CONSTANTS);
  app.enable('etag') // use strong etags
  // app.set('etag', 'strong') // same
  app.set('etag', 'weak') // weak etags

  // Sets the port nodeJS listens to
  app.set('port', process.env.PORT || http_port || 3000);
  app.set('https_port', process.env.HTTPS_PORT || https_port || 8443);

  // Sets the server mode to dev or production
  app.set('server mode',server_mode);

  // enable gzip compression
  app.use(compression());

  // app.locals are local variables merged with res.render()
  app.locals.domain = domain;

  if(server_mode !== config.CONSTANTS.SERVER_MODE.DEV){
    app.locals.host = domain + ((http_port)? ":"+ http_port:"" ); 
  }

  app.use(morgan('common'));

  app.use(function(req,res,next){
    if(server_mode === config.CONSTANTS.SERVER_MODE.DEV){
      //res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    }
    next();
  });
  // Sets the default document root to the "public" directory
  app.use(express.static(config.clientPublicPath, { maxAge: config.cacheMaxAge }));

  // Session uses cookies, so must be called before express.session
  app.use(cookieParser());
  app.use(methodOverride());

  // Configure passport, used for user authentication
  app.use(passport_instance.initialize());

  // MUST be AFTER express/passport session calls
  // AND BEFORE app.use(app.router)
  app.use(function(req,res,next){ res.locals.user = req.user; next(); });

  app.use('/api/v1', function(req, res){
    var url = req.protocol+"://127.0.0.1:10010"+req.url;
    var r = request(url, function(err, resp, body){
      if(err) res.send(404);
    });
    req.pipe(r).pipe(res);
  });
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  // Allow cross origin from localhost
  app.use(function(req,res,next){
    var origin=req&&req.headers&&req.headers.origin;
    if (!/^http:\/\/localhost/i.test(origin)) return next();

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
  });

  return app;
}
