var User = rootRequire('/models/User'); // eslint-disable-line

function saveSettings(userid, settings, callback) {
  User.model.findById(userid, { password: 0 }, (err1, user1) => {
    if (err1) callback(500, `error.internal.${err1}`);
    else if (!user1) callback(401, 'error.unauthorized');
    else {
      // console.log("current user settings: " + JSON.stringify(user.settings));
      // eslint-disable-next-line
      user1.settings = user1.settings
        ? Object.assign(user1.settings, settings)
        : settings;
      // console.log("user settings: " + JSON.stringify(user.settings));
      User.model.findByIdAndUpdate(user1._id, user1, (err2, user2) => { // eslint-disable-line
        if (err2) callback(500, `error.internal.${err2}`);
        else if (!user2) callback(401, 'error.unauthorized');
        else {
          // return the information including token as JSON
          callback(200, {
            type: 'success',
            id: 'saveSettings',
            text: 'success.saved',
            data: null,
          });
        }
      });
    }
  });
}

module.exports = {
  saveSettings,
};
