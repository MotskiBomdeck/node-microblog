var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

var currentId = 4;
var now = new Date().getTime();
var messages = [
    {id: 1, username: 'Mariov', text: 'Where are you Luigiov?', date:now},
    {id: 2, username: 'Luigiov', text: 'Me iz here!', date: now+1000},
    {id: 3, username: 'Mariov', text: 'OK!', date: now+5000}
];

app.get('/', function (req, res) {
    res.send('Hello Bitches! Welcome to MotskiBomdeck microBlog');
});

app.get('/messages', function (req, res) {
    res.send(messages);
});

app.post('/message', function (req, res) {
    req.body.message.id = currentId++;
    messages.push(req.body.message);

    res.sendStatus(201);
});

app.delete('/message/:id', function (req, res) {
    var id = req.params.id;

    for(var i = 0, len = messages.length; i<len; i++){
        if(messages[i].id == id) {
            messages.splice(i, 1);
            return res.sendStatus(200);
        }
    }

    res.sendStatus(400);
});

var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});