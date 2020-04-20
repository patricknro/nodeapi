var express = require('express');

var app = express();

// set up handlebars view engine
var handlebars = require('express-handlebars')
                 .create({ defaultLayout: 'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

function getWeatherData() {
    return {
        locations: [
            {
                name: 'Portland',
                forecastUrl: 'http://www.wunderground.com/US/OR/Portland.html',
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/cloudy.gif',
                weather: 'Overcast',
                temp: '54.1 F (12.3 C)'
            },
            {
                name: 'Bend',
                forecastUrl: 'http://www.wunderground.com/US/OR/Bend.html',
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/partlycloudy.gif',
                weather: 'Partly Cloudy',
                temp: '55.0 F (12.8 C)'
            },
            {
                name: 'Manzanita',
                forecastUrl: 'http://www.wunderground.com/US/OR/Manzanita.html',
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/rain.gif',
                weather: 'Light Rain',
                temp: '55.0 F (12.8 C)'
            }
        ]
    };
}

app.use(function(req, res, next) {
    
    if(!res.locals.partials)
        res.locals.partials = {};
    
    res.locals.partials.weather = getWeatherData();
    next();
});

// hiden information about of server host.
app.disable('x-powered-by')

// ### The code below enable the cache for html (views).
//app.set('view cache', true);

// ############## REQUEST ##############

// API Rest
app.get('/api/tours', function(req, res) {
    
    var tours = [ 
        { id: 1, name: 'Hood River', price: 99.99 },
        { id: 2, name: 'Oregon Coast', price: 149.95 }
    ];
    res.status(200);
    res.type('application/json');
    res.json(tours);
});

// Specified different layout instead of main.handlerbars
app.get('/foo', function(req, res) {
    res.render('foo', { nome: 'Patrick Nascimento', layout: 'microsite' });
});


app.get('/', function(req, res) {
    
    var messageWelcome = 'Wellcome, ' + (req.query.name || 'Visitante') + '!';
     
    res.render('home', { bemvindo: messageWelcome, listaHtml: '<li>Primeiro</li><li>Segundo</li><li>Terceiro</li>' });
});

app.get('/about', function(req, res) {
    
    var fortunes = [
        "Conquer your fears or they will conquer you.",
        "Rivers need springs.",
        "Do not fear what you don't know.",
        "You will have a pleasant surprise.",
        "Whenever possible, keep it simple."
    ];

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