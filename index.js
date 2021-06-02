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

let topMovies = [
  {
    title: 'Army of the Dead',
    director: 'Zack Snyder'
  },
  {
    title: 'The Woman in the Window',
    author: 'Joe Wright'
  },
  {
    title: 'They Want me Dead',
    author: 'Taylor Sheridan'
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
  res.json(topMovies);
});

app.get('/movies', (req, res) => {
   res.send('Successful GET request returning data on all movies');
 });

 app.get('/movies/[movie title]', (req, res) => {
   res.send('Successful GET request returning data about specific movie');
 });

 app.get('movies/[genre]', (req, res) => {
    res.send('Successful GET request returning data about list of movies by genre');
  });

  app.get('/directors/[directors info]', (req, res) => {
   res.send('Successful GET request returning data information about specific director');
 });

 app.post('/user', (req, res) => {
   res.send('Successful POST request returning data that user to register a new account');
 });

 app.get('/users/[username]', (req, res) => {
   res.send('Successful GET request returning data that User can view their account details');
 });

 app.remove('/users/[username]', (req, res) => {
   res.send('Successful REMOVE request returning data Allows a user unregister and delete their account');
 });

 app.put('/users/[user-name]', (req, res) => {
   res.send('Successful PUT request returning data that Update a users information');
 });

 app.post('/users/[username]/Movies/[Movie ID]', (req, res) => {
   res.send('Successful POST request returning data that Adds a movie to the users favorites list');
 });

 app.post('/users/[username]/Movies/remove/[MovieID]', (req, res) => {
   res.send('Successful POST request returning data that Removes a movie from the users favorites list');
 });

// listen for requests
app.listen(8080, () =>{
  console.log('Your app is listening on port 8080.');
});
