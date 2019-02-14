const bcrypt = require('bcryptjs');
const config = rootRequire('/config/app'); // eslint-disable-line
const User = rootRequire('/models/User'); // eslint-disable-line
const Token = rootRequire('/services/TokenManager'); // eslint-disable-line
const RESPONSE_LOGOUT = { auth: false, token: null, data: null };

function doLogin(userid, password, callback) {
  console.log(`AccountManager.login: [${JSON.stringify(userid)}]`); // eslint-disable-line
  User.model.findOne({ userid }, (err1, user) => {
    if (err1) {
      callback(500, 'error.internal');
    } else if (!user) {
      callback(401, 'error.unauthorized');
    } else {
      // check if the password is valid
      const passwordIsValid = bcrypt.compareSync(password, user.password);
      if (!passwordIsValid) callback(401, 'error.unauthorized');
      else {
        // if user is found and password is valid
        // create a token
        const token = Token.buildToken(user._id); // eslint-disable-line
        user.lastLogin = new Date(); // eslint-disable-line
        User.model.findByIdAndUpdate(user._id, user, (err2, user) => { // eslint-disable-line
          if (err2) callback(500, 'error.internal');
          else if (!user) callback(401, 'error.unauthorized');
          else {
            // return the information including token as JSON
            callback(200, {
              auth: true,
              token,
              data: User.toJSON(user),
            });
          }
        });
      }
    }
  });
}

function doReauth(userId, callback) {
  console.log(`AccountManager.reAuth: [${JSON.stringify(userId)}]`); // eslint-disable-line
  User.model.findById(userId, { password: 0 }, (err, user) => {
    if (err) callback(500, `error.internal.${err}`);
    if (!user) callback(404, 'error.unauthorized');
    const token = Token.buildToken(user._id); // eslint-disable-line
    callback(200, { auth: true, token, data: User.toJSON(user) });
  });
}

function doSignup(userid, password, rest, callback) {
  console.log(`AccountManager.signup: [${JSON.stringify(userid)}]`); // eslint-disable-line
  User.model.countDocuments({ userid }, (err1, totalUsers) => {
    if (totalUsers > 0) {
      callback(409, 'error.register.user.already.exists');
    } else {
      User.model.countDocuments(
        {
          created: {
            $lte: new Date(),
            $gt: new Date(new Date().setDate(new Date().getDate() - 1)),
          },
        },
        (err2, totalToday) => {
          if (err2) callback(500, `error.internal.${err2}`);
          if (totalToday > config.MAX_SIGNUPS_PER_DAY) {
            callback(409, 'error.register.accounts.per.day.limit.reached');
          } else {
            const hashedPassword = bcrypt.hashSync(password, 8);
            const newUser = {
              created: new Date(),
              lastLogin: new Date(),
              userid,
              password: hashedPassword,
            };
            Object.keys(rest).forEach(key => {
              if (!key.startsWith('_')) {
                const value = rest[key];
                newUser[key] = value; // eslint-disable-line
              }
            });
            newUser.key = bcrypt.hashSync(JSON.stringify(newUser), 8);
            User.model.create(newUser, (err3, user) => {
              if (err3) callback(500, `error.internal.${err3}`);
              else {
                const token = Token.buildToken(user._id); // eslint-disable-line
                callback(200, {
                  auth: true,
                  token,
                  data: User.toJSON(user),
                });
              }
            });
          }
        },
      );
    }
  });
}

function doLogout(userId, lastRoute, callback) {
  User.model.findById(userId, { password: 0 }, (err1, user) => {
    if (err1) callback(500, `error.internal.${err1}`);
    else if (!user) callback(401, 'error.unauthorized');
    else {
      if (!user.settings) {
        user.settings = {}; // eslint-disable-line
      }
      user.settings.lastRoute = lastRoute; // eslint-disable-line
      User.model.findByIdAndUpdate(user._id, user, (err2, user) => { // eslint-disable-line
        if (err2) callback(500, `error.internal.${err2}`);
        else if (!user) callback(401, 'error.unauthorized');
        else {
          // return the information including token as JSON
          callback(200, RESPONSE_LOGOUT);
        }
      });
    }
  });
}

module.exports = {
  doLogin,
  doReauth,
  doSignup,
  doLogout,
};
