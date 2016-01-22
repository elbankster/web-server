var express = require('express');
var app = express();
var PORT = 3000;

var middleware = {
    requireAuthentication: function(req, res, next) {
        console.log(req.url + ' - private route hit!');
        next();
    },
    logger: function(req, res, next) {

        console.log(new Date().toString() + ' Request: ' + req.method + ' ' + req.originalUrl);
        next();
    }
};

// application-level middleware
// app.use(middleware.requireAuthentication);
app.use(middleware.logger);

// route-level middleware, 2nd argument in route
app.get('/about', middleware.requireAuthentication, function(req, res) {
    res.send('About Us!');
});

function testPage(req, res) {
    res.send('Test!');
}

app.get('/test/', testPage);

app.use(express.static(__dirname + '/public'));

app.listen(PORT, function() {
    console.log('Express server started on port ' + PORT + '.');
});