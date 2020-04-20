var express = require('express');

var app = express();

var handlebars = require('express-handlebars')
                 .create({defaultLayout: 'main'});

// Custom module created 
var fortune = require('./lib/fortune.js');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    // TODO: Module for cookies fortune
    res.render('home', { fortune: fortune.getFortune() });
});




// custom pages, 404 and 500
app.use(function(req, res) {
    res.status(404);
    res.render('404');
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

var portSelected = app.get('port') || 3000;

app.listen(portSelected, function() {
    console.log('Express started on http://localhost:' + portSelected + '; press Ctrl + C to terminate.');
})