const express = require('express');
const app = express();

const morgan = require('morgan');

// HTML Requests
app.use(morgan('common'));

/**
 * CORS config
 */
const cors = require('cors');
app.use(cors());

const {check, validationResult} = require('express-validator');

const mongoose = require('mongoose');
const Models = require('./models.js');
const bodyParser = require('body-parser');

const passport = require('passport');
require('./passport');

const Movies = Models.Movie;
const Users = Models.User;
const Directors = Models.Director;
const Genres = Models.Genre;

mongoose.connect(process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true });
//mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

require('./auth')(app);


app.use(express.static('public'));
// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to my movie club!');
});

app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', { root: __dirname });
});

app.get('/secreturl', (req, res) => {
  res.send('This is a secret url with super top-secret content.');
});

/**
 * Get all movies and movie details
 * @method GET
 * @param {string} endpoint
 * @returns {object} containing all movies and movie data
 * @requires authentication JWT
 */
//gets list of movies
app.get("/movies", passport.authenticate('jwt', {session: false}), (req, res) => {
 Movies.find()
  .then((movies) => {
    res.status(201).json(movies);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

/**
 * Return data (description, genre, director, image URL, whether it’s featured or not) about a single movie by title to the user
 * @method GET
 * @param {string} (title) endpoint
 * @returns {object} data about a single movie
 * @requires authentication JWT
 */
//gets movies by title
app.get("/movies/:Title", (req, res) => {
  Movies.findOne({ Title: req.params.Title})
  .then((movie) => {
    res.json(movie);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

/**
 * Return data (description, genre, director, image URL, whether it’s featured or not) about a single movie by title to the user
 * @method GET
 * @param {string} (id) endpoint
 * @returns {object} data about a single movie
 * @requires authentication JWT
 */
//gets genre information
app.get("/genres", (req, res) => {
  Genres.find()
  .then((genreSearch) => {
    res.status(201).json(genreSearch);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

/**
 * Return data about a genre
 * @method GET
 * @param {string} (name) endpoint
 * @returns {object} data about a genre
 * @requires authentication JWT
 */
//gets genre by its name
app.get("/genres/:Name", (req, res) => {
  Genres.findOne({ Name: req.params.Name})
  .then((genres) => {
    res.json(genres);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

//gets list of directors
app.get('/directors', (req,res)=>{
  Directors.find()
  .then((directorSearch) => {
    res.status(201).json(directorSearch);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

/**
 * Return data about a director by name
 * @method GET
 * @param {string} (name) endpoint
 * @returns {object} data about a director
 * @requires authenticate JWT
 */
//gets directors by name
app.get("/directors/:Name", (req,res) => {
  Directors.findOne({ Name: req.params.Name })
  .then((nameDirector) => {
    res.json(nameDirector);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

/**
 * Get all users
 * @method GET
 * @param {string} endpoint
 * @returns {object} containing all users
 * @requires authentication JWT
 */
  // Get all users
  app.get('/users', (req, res) => {
    Users.find()
      .then((users) => {
        res.status(201).json(users);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });

  /**
   * Get information on one user
   * @method GET
   * @param {string} (username) endpoint
   * @returns {object} containing details of one user
   * @requires authentication JWT
   */
  // Get a user by username
app.get('/users/:Username', (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

/**
 * Allow new users to register
 * @method POST
 * @param {object} object containing user details
 * @returns {object} json-object added user
 * @requires properties username, password, email
 * @requires auth no authentication - public
 */
//posts new user
app.post('/users',
  [
    check('Username', 'Username is required').isLength({min: 5}),
    check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail()
  ], (req, res) => {

  // check the validation object for errors
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOne({ Username: req.body.Username }) // Search to see if a user with the requested username already exists
      .then((user) => {
        if (user) {
          //If the user is found, send a response that it already exists
          return res.status(400).send(req.body.Username + ' already exists');
        } else {
          Users
            .create({
              Username: req.body.Username,
              Password: hashedPassword,
              Email: req.body.Email,
              Birthday: req.body.Birthday
            })
            .then((user) => { res.status(201).json(user) })
            .catch((error) => {
              console.error(error);
              res.status(500).send('Error: ' + error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      });
  });

  /**
   * Allow users to update their username
   * @method PUT
   * @param {object} object containing user details
   * @returns {object} json-object added user
   * @requires properties username, password, email
   * @requires authentication JWT
   */
app.put('/users/:Username', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
  { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

/**
 * Allow users to deregister
 * @method DELETE
 * @param {string} (username) endpoint
 * @returns {statusMessage} success/error
 * @requires authentication JWT
 */
// Delete a user by username
app.delete('/users/:Username', (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

/**
 * Allow users to add a movie to their list of favorites
 * @method POST
 * @param {string} (username, movieId) endpoint
 * @returns {statusMessage} success/error
 * @requires authentication JWT
 */
// Add a movie to a user's list of favorites
app.post('/users/:Username/Movies/:MovieID', passport.authenticate('jwt', {session: false}), (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
     $push: { FavoriteMovies: req.params.MovieID }
   },
   { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

//................................get the favorite movies
/**
 * Get the favoritemovies array of a user
 * @method GET
 * @param {string} (username) endpoint
 * @returns {object} containing favoritemovies array of user
 * @requires authentication JWT
 */
app.get(
  "/users/:username/favorites",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOne({
      username: req.params.username,
    })
      .then((user) => {
        res.json(user.favorites);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

/**
 * Allow users to remove a movie from their list of favorites
 * @method DELETE
 * @param {string} (username, movieId) endpoint
 * @returns {statusMessage} success/error
 * @requires authentication JWT
 */
//................................Remove a movie from a users fav movies list
app.delete('/users/:Username/Movies/:MovieID', passport.authenticate('jwt', {session: false}), (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username },
    {
      $pull: { FavoriteMovies: req.params.MovieID }
    },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    });
});

// listen for requests
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0',() => {
 console.log('Listening on Port ' + port);
});
