var express = require('express');

var app = express();

// set up handlebars view engine
var handlebars = require('express-handlebars')
                 .create({ defaultLayout: 'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

var fortunes = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know.",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple."
];

// hiden information about of server host.
app.disable('x-powered-by')

// ############## REQUEST ##############

app.get('/api/tours', function(req, res) {
    var tours = [ 
        { id: 1, name: 'Hood River', price: 99.99 },
        { id: 2, name: 'Oregon Coast', price: 149.95 }
    ];

    res.type('application/json');
    res.json(tours);
});


app.get('/', function(req, res) {
    res.render('home');
});

app.get('/about', function(req, res) {
    var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('about', { fortune: randomFortune });
});

app.get('/headers', function(req, res) {
    var pointsHeaders = [];

    for(var name in req.headers)
        pointsHeaders.push(name + ': ' + req.headers[name]);

    res.render('headers', { lista : pointsHeaders});
});

// ############## REQUEST ##############


// custom 404 page
app.use(function(req, res, next) {
    res.status(404);
    res.render('404');
});

// custom 500 page
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});





var portSelected = app.get('port') || 3000;

app.listen(portSelected, function() {
    console.log('Express started on http://localhost:' + portSelected + '; press Ctrl + C to terminate.');
});