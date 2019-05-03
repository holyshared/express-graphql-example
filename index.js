const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser'); 

const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const graphql = require('./graphql');

const basicAuth = require("basic-auth-connect");
const strategy = require("./passport");
const sessionStore = require('./session-store');
const graphqlUploadExpress = require("graphql-upload").graphqlUploadExpress;

const app = express();

passport.use(strategy);

app.set("trust proxy", 1); // trust first proxy

const user = process.env.USERNAME;
const pass = process.env.PASSWORD;

if (user && pass) {
  app.use(basicAuth(user, pass));
}

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

app.use('/graphql', graphqlUploadExpress({ maxFileSize: 15 * 1024 * 1024, maxFiles: 10 }), graphql);
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(process.env.PORT || 3000);
