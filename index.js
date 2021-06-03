const express = require('express');
const app = express();

const morgan = require('morgan');
app.use(morgan('common'));


const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

let movies = [
  {
    title: 'Army of the Dead',
    director: 'Zack Snyder',
    genre: 'Action, Crime, Horror',
  },
  {
    title: 'The Woman in the Window',
    director: 'Joe Wright',
    genre: 'Crime, Drama, Mystery',
  },
  {
    title: 'They Want me Dead',
    director: 'Taylor Sheridan',
    genre: 'Action, Drama, Thriller',
  }
];
app.use(express.static('public'));
// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to my movie club!');
});

app.get('/secreturl', (req, res) => {
  res.send('This is a secret url with super top-secret content.');
});



app.get('/movies', (req, res) => {
  res.send('this gets list of all available movies with image and title');
});


 app.get('/movies/:title', (req, res) => {
   res.send('this gets available data about specific movie' + req.params.name);
 });

 app.get('movies/:genre', (req, res) => {
   res.send('this gets a list of movies by genre' + req.params.genre);
 });

  app.get('/directors/:info', (req, res) => {
    res.send('this gets a information about specific director' + req.params.info);
  });



// listen for requests
app.listen(8080, () =>{
  console.log('Your app is listening on port 8080.');
});
