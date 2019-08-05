const passport = require('passport');

const logger = require('../config/winston');
const User = require('../database/models/user');

const createUser = (req, res, next) => {
  const {name, email, username, password} = req.body;

  const userInstance = new User({
    name: name,
    email: email,
    username: username,
  });

  if (password) {
    userInstance.setPassword(password);
    logger.info('Adding user to database.');
    userInstance.save((e) => {
      if (e) {
        logger.error(e);
        next(e);
      } else {
        logger.info('User created successfully');
        res.json({user: userInstance.toAuthJSON()});
      }
    });
  } else {
    logger.error('Password must be specified.');
    res.next(new Error('Password must be specified.'));
  }
};

const login = (req, res, next) => {
  passport.authenticate('local', {session: false}, (req, passportUser, e) => {
    if (e) {
      return next(e.error);
    } else if (passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();

      return res.json({user: user.toAuthJSON()});
    }
  })(req, res, next);
};

module.exports = {
  createUser: createUser,
  login: login,
};
