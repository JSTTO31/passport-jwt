const express = require('express')
const passport = require('passport')

/* 
    ----------------GENERAL SETUP--------------
*/

// DOTENV PACKAGE It allows you to create environment variables in a . env file instead of putting them in your code.
// Make sure this package is always execute first to not encounter some errors.
require('dotenv').config()

// Our express application
const app = express()

// Initialize the user model to make it available in mongoose.model
require('./models/user.model')

// Configure the database and opens the global connection with mongoose.connection
require('./config/database.config')

// Pass the passport in the config passport function
require('./config/passport.config')(passport)

// Initialize the passport object in every incoming request
app.use(passport.initialize())

// to convert the json string to json object
app.use(express.json())

// to make the req.body available in every request
app.use(express.urlencoded({extended: true}))



/**
    ----------------Route--------------
 */

// Register all routes from ./routes/index.js
app.use(require('./routes'))

/**
    ----------------Server--------------
*/

// The application listen to env port or port 3000
app.listen(process.env.PORT || 3000, () => {
    console.log('The server is listening to port 3000');
})


