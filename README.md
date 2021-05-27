# movie_api
This project includes a REST API for an
application called “myFlix” that interacts with a database that stores data about different movies. Also including the client-side component of this same application using REACT.

Purpose
-The users of the myFlix application will be
movie enthusiasts who enjoy reading information about different movies.

-The app will consist of a well-designed REST API and
architected database built using JavaScript, Node.js, Express, and MongoDB. The REST API
will be accessed via commonly used HTTP methods like GET and POST.

-Whenever users of myFlix are interacting with the application, the server-side of the
application will be in use, processing their requests and performing operations against the
data in the database. These users will be able to use the myFlix application whenever they like
to read information about different movies or update their user information, for instance, their
list of “Favorite Movies.”

—The application will be hosted online. The myFlix application itself is responsive and
can therefore be used anywhere and on any device, giving all users the same experience.

—Movie enthusiasts want to be able to access information about different movies,
directors, and genres. The server-side of the myFlix application will ensure they have access
to this information, that their requests can be processed, and that all necessary data can be
stored.

Design Criteria
User Stories
- As a user, I want to be able to receive information on movies, directors, and genres so that I
can learn more about movies I’ve watched or am interested in.
- As a user, I want to be able to create a profile so I can save data about my favorite movies.

Essential Features
-Return a list of ALL movies to the user
- Return data (description, genre, director, image URL, whether it’s featured or not) about a
single movie by title to the user
- Return data about a genre (description) by name/title (e.g., “Thriller”)
- Return data about a director (bio, birth year, death year) by name
- Allow new users to register
- Allow users to update their user info (username, password, email, date of birth)
- Allow users to add a movie to their list of favorites
- Allow users to remove a movie from their list of favorites
- Allow existing users to deregister
