// let fs = require('fs');
//
// let http = require('http');
//
// let server = http.createServer(function(req, res) {
//   console.log('url' + req.url);
//   res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
//   let obj = {
//     model: 'bmw',
//     speed: 200
//   };
//   res.end(JSON.stringify(obj));
// });
//
// server.listen(3000, '127.0.0.1');
// console.log('hello1');

let express = require('express');
var bodyParser = require('body-parser')

let app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.set('view engine', 'ejs');

app.use('/public', express.static('public'));

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/about', function(req, res) {
  res.render('about');
});

app.post('/about', urlencodedParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);
  console.log(req.body);
  res.render('about');
});

app.get('/news/:id', function(req, res) {
  let obj = {title: "new", id: 4, p: [1, 2, 3, 4]};
  res.render('news', {newsId: req.params.id, newParam: 234, obj: obj});
});

app.listen(3000);
