const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();
const port = 3000;

app.set('view engine', 'hbs');
app.set('views', 'views');
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', function(request, response) {
    response.render('index', {name: 'Noam'});
});

app.get('/notes', function(request, response) {
    const rawData = fs.readFileSync('notes.json');
    const data = JSON.parse(rawData);
    response.render('notes', {notes: data.notes});
});

app.get('/notes/:id', function (request, response) {
    const rawData = fs.readFileSync('notes.json');
    const data = JSON.parse(rawData);
    let note;
    for (let i = 0; i < data.notes.length; i++) {
        if(data.notes[i].id == request.params.id) {
            note = data.notes[i];
            break;
        }
    }
    response.render('notes', { notes: [note]});
});

app.post('/add_note', function(request, response) {
    const rawData = fs.readFileSync('notes.json');
    const data = JSON.parse(rawData);
    const id = data.maxId;
    data.maxId++;
    data.notes.push({
        id: id,
        title: request.body.title,
        body: request.body.body,
    });
    fs.writeFileSync('notes.json', JSON.stringify(data));
    response.redirect('/notes');
});

app.listen(port, function() {
    console.log('Server starting on http://localhost:' + port);
});