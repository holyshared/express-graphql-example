const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser'); 

const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const graphql = require('./graphql');

const strategy = require("./passport");
const sessionStore = require('./session-store');

const app = express();

passport.use(strategy);


const SESSION_SECRET = process.env.SESSION_SECRET || 'xyz';

const sessionOptions = {
  name: "example",
  secret: SESSION_SECRET,
  saveUninitialized: false,
  resave: false
};

app.use(helmet());
app.use(express.static("public"));
app.use(cookieParser(SESSION_SECRET));

app.use(
  session({
    store: sessionStore({
      url: process.env.REDIS_URL || 'redis://127.0.0.1:6379'
    }),
    sessionOptions,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/graphql', graphql);
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(process.env.PORT || 3000);
