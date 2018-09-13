var express = require('express');
var app = express();
var port = process.env.PORT || 8000;

app.get('/yourroute', function(req, res) {
  res.send("stuff");
});

app.get('/hello',  function(req, res) {
  res.send("Hello!");
});

app.post('/create/:name', function(req, res) {
  const data = {
    "id":  1,
    "name": req.params.name
  };
  res.json(data);
});

app.get('/', function(req, res) {
  res.sendFile(__dirname+"/index.html");
});

app.get('/verify/:age', function(req, res) {
  if (req.params.age > 13) {
    res.sendStatus(200);
  }
  res.sendStatus(403);
});

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
