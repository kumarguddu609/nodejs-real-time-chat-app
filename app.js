require('dotenv').config()
var express = require("express");
var app = express();
var port = process.env.PORT || 3700;
var http = require('http').Server(app); // Create HTTP server

// Set view of '/' end point
app.set('views', __dirname + '/views');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.get("/", function(req, res){
    res.render("page");
});

// Use our public/chat.js file as a listener
app.use(express.static(__dirname + '/public'));

// Set port
http.listen(port, function () {
    console.log('Node.js listening on port ' + port);
});

var io = require('socket.io')(http); // Initialize Socket.IO

// Set up socket connection
io.on('connection', function (socket) {
    console.log('A user connected');
    socket.emit('message', { message: 'Welcome to the Real Time Web Chat' });

    socket.on('send', function (data) {
        io.emit('message', data);
    });

    socket.on('disconnect', function () {
        console.log('User disconnected');
    });
});
