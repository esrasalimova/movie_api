/**
* The data of the constant is stored in an environmental variable
* and is used for encoding and decoding the JWT token
* @ constant
* @ type {string}
*/

const jwtSecret = 'your_jwt_secret'; //This has to be the same key used in the JWTStrategy

const jwt = require('jsonwebtoken'),
passport = require('passport');

require('./passport'); //Your local passport file

/**
* creates a JWT token to verify the user is the same
* @ function generateJWTToken
* @param {object} user - The object user is passed in along with its data
*/

let generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username, //This is the username you are encoding in the JWT
    expiresIn: '7d', //This specifies that the token will expire in 7 days
    algorithm: 'HS256' //This is the algorithm used to "sign" or encode the values of the JWT
  });
}

/* POST login. Creates an endpoint for users to login with verification */
module.exports = (router) => {
  router.post('/login', (req, res) => {
    console.log(req.body)
    console.log(req.params.esra)
    passport.authenticate('local', {session: false }, (error, user, info) => {
      if (error || !user) {
        console.log(error)
        console.log(user)
        return res.status(400).json({
          message: 'Something is not right',
          user: user
        });
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          console.log(error)
          res.send(error);
        }
        let token = generateJWTToken(user.toJSON());
        return res.json({ user, token });
      });
    })(req,res);
  });
}
