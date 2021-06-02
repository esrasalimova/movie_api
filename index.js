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


 app.get('/movies/:movie title', (req, res) => {
   res.json(movies.find((title) =>
   { return movie.title ===req.params.title }));
 });

 app.get('movies/:genre', (req, res) => {
    res.json(movies.find((genre) =>
    {return movies.genre === req.params.genre }));
  });

  app.get('/directors/:directors info', (req, res) => {
   res.json(directors.find((directors) =>
   { return directors.info === req.params.info}));
 });

 app.post('/user', (req, res) => {
   let user = req.body;
   if (!newUser.name) {
     const message = 'Missing name in request body';
     res.status(400).send(message);
   } else {
     newUser.id = uuid.v4();
     user.push(newUser);
     res.status(201).send(newUser);
   }
 });

 app.get('/users/:username', (req, res) => {
   res.json(users.find((user) =>
   { return user.name === req.params.username}));
 });

 app.delete('/users/:username', (req, res) => {
   let users = users.find((user) => { return user.name ===req.params.name});
   if (user) {
     users = users.filter((obj) => { return obj.name !==req.params.name});
     res.status(201).send('User' + req.params.name + ' was deleted.');
     }
 });

 app.put('/users/:name', (req, res) => {
   let user = users.find((user) => { return user.name ===req.params.name});

   if (user) {
     user.name[req.params.name] =(req.params.name);
     res.status(201).send('User' + req.params.name + 'information updated');
   } else {
     res.status(404).send('User with name' + req.params.name + 'was not found.');
   }
 });

 app.put('/users/:username/:movies/:movie ID', (req, res) => {
   let user = users.find((user) => { return user.name ===req.params.name});

   if (user) {
     user.movies[req.params.movie] = parseInt(req.params.movieid);
     res.status(201).send('User' + req.params.username + 'added to favorites' + req.params.movie + req.params.movieid);
   } else {
     res.status(404).send('User with the name ' + req.params.name + 'was not found.');
   }
 });

 app.delete('/users/:username/:movies/:remove/:movieID', (req, res) => {
   let user = users.find((user) => {return movie.name === req.params.name });

   if (user) {
     users = users.filter((obj) => {return obj.name !== req.params.name});
     res.status(201).send('movie was removed.');
   }
 });

// listen for requests
app.listen(8080, () =>{
  console.log('Your app is listening on port 8080.');
});
