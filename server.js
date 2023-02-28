// Install the depedencies
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;

// Import the sequelize file for the connection to the db
const sequelize = require('./config/connection');
// Import connect session sequelize so you can create a session
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Create the session object which will be saved
const sess = {
  secret: 'secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

// Invoke the session
app.use(session(sess));

const hbs = exphbs.create({});


// Set handlebars as the engine for the view
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');



// Invoke express
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Import the controllers which contain the routes
app.use(require('./controllers/'));

// Launch the server so it is active
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
  sequelize.sync({ force: false });
});