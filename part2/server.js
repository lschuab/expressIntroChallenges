//intended to be run from part2 dir
var express = require('express');
var app = express();
var port = process.env.PORT || 8000;
const fs = require('fs');



app.get('/yourroute', function(req, res) {
  res.send("stuff");
});

app.post('/create/:name/:age', function(req, res) {
  const users = fs.readFileSync('./storage.json', 'utf8');
  const usersArr = users ? JSON.parse(users) : [];
  const userData = {
    "id" : usersArr.length + 1,
    "name": req.params.name,
    "age": req.params.age
  };
  usersArr.push(userData);
  fs.writeFileSync('./storage.json', JSON.stringify(usersArr));
  res.sendStatus(200);
});

app.get('/', function(req, res) {
  res.json(JSON.parse(fs.readFileSync('./storage.json', 'utf8')));
});

// Made it work for a name or id, though the user does not need to specify which
app.get('/:nameOrId', function(req, res) {
  const users = fs.readFileSync('./storage.json', 'utf8');
  if (users) {
    const usersArr = JSON.parse(users);
    for (const user of usersArr) {
      if (user.name === req.params.nameOrId || user.id == req.params.nameOrId) {
        res.json(user);
      }
    }
  }
  res.sendStatus(400);
});

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
