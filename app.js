const express = require('express');
const hbs = require('hbs');

const app = express();
const port = 3000;

app.set('view engine', 'hbs');
app.set('views', 'views');

app.get('/', function(request, response) {
    response.render('index', {name: 'Noam'});
});

app.listen(port, function() {
    console.log('Server starting on http://localhost:' + port);
});