const passport = require('passport');
const Strategy = require('passport-local').Strategy;

function resolve(username, password, done) {
  done(null, {
    id: 1,
    name: 'test'
  });
}

passport.serializeUser((user, done) =>
  done(null, user.id),
);

passport.deserializeUser((id, done) => {
  done(null, {
    id: 1,
    name: 'test'
  });
});

module.exports = new Strategy(resolve);
