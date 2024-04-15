const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'USERNAME', //YOUR USERNAME
  password: 'PASSWORD', //YOUR PASSWORD
  database: 'DATABASE_NAME'// YOUR DATABASE NAME
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});

passport.use(new LocalStrategy(
  { usernameField: 'email' }, // Specify that the email field should be used for authentication
  (email, password, done) => {
    db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, result) => {
      if (err) {
        return done(err);
      }
      if (result.length === 0) {
        return done(null, false);
      }
      return done(null, result[0]);
    });
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  db.query('SELECT * FROM users WHERE id = ?', [id], (err, result) => {
    if (err) {
      return done(err);
    }
    done(null, result[0]);
  });
});

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send('Unauthorized');
};

app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;
  db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password], (err, result) => {
    if (err) {
      res.status(500).send('Error saving user');
    } else {
      res.status(200).send('User saved successfully');
    }
  });
});

app.post('/login', passport.authenticate('local'), (req, res) => {
  res.status(200).send('Login successful');
});

app.get('/account', ensureAuthenticated, (req, res) => {
  res.json({
    username: req.user.username,
    email: req.user.email
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
