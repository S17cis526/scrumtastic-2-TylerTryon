"use strict";


var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('scrumtastic.sqlite3', function(err) {
  if(err) console.error(err);
});

var router = require('./lib/route').Router;

router.get('/', function (req, res){
  fs.readFile('/public/index.html', function(err, body){
    res.end(body);
  });
});

router.get('/app.js', function (req, res){
  fs.readFile('/public/index.html', function(err, body){
    res.end(body);
  });
});

router.get('/projects', function(req, res){
  db.all('SELECT * FROM projects', [], function(err, projects){
    res.setHeader('Content-Type', 'test/json');
    res.end(JSON.stringify(projects));
  });
});


var migrate = require('./lib/migrate');
migrate(db, 'migrations', function(err){

  var server = new http.Server(function(req, res){
    router.route(req, res);
  });

  server.listen(3005, function(){
    console.log("listening on port " + 3005)
  });
});
