const passport = require('passport');
const PassportLocal = require('passport-local');

const User = require('../database/models/user');

passport.use(new PassportLocal((username, password, done) => {
  User.findOne({username})
      .then((user) => {
        if (!user || !user.validatePassword(password)) {
          return done(null, false, {error: 'Invalid username/password.'});
        }
        return done(null, user);
      }).catch(done);
}));
