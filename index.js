const express = require('express');
const app = express();

const morgan = require('morgan');
app.use(morgan('common'));


const bodyParser = require('body-parser'),

app;use;(bodyParser.urlencoded({
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




// listen for requests
app.listen(8080, () =>{
  console.log('Your app is listening on port 8080.');
});
