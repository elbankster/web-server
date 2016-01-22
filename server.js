var express = require('express');
var middleware = require('./middleware');
var app = express();
var PORT = process.env.PORT || 3000;

// application-level middleware
app.use(middleware.logger);

// route-level middleware, 2nd argument in route
app.get('/about', middleware.requireAuthentication, function(req, res) {
    res.send('About Us!!');
});

function testPage(req, res) {
    res.send('Named Function!');
}

app.get('/test/', testPage);

app.get('/name/', testPage);

app.use(express.static(__dirname + '/public'));

app.listen(PORT, function() {
    console.log('Express server started on port ' + PORT + '.');
});