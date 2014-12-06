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

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.get('/', function (req, res) {
    res.send('Endpoint:<br>&nbsp;&nbsp;&nbsp;&nbsp;(GET) /Messages<br>&nbsp;&nbsp;&nbsp;&nbsp;(POST) /Message<br>&nbsp;&nbsp;&nbsp;&nbsp;(DELETE) /Message/:id<br><br>Message Structure:<br>{<br>  username: "Mariov",<br>  text: "Where are you Luigiov?"<br>}');
});

app.get('/messages', function (req, res) {
    res.json(messages);
});

app.post('/message', function (req, res) {
    var newMessage = req.body.message;

    newMessage.id = currentId++;
    newMessage.date = new Date().getTime();
    messages.push(newMessage);

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

var server = app.listen(process.env.PORT || 3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
