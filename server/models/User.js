const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  userid: String,
  password: String,
  key: String,
  created: Date,
  lastLogin: Date,
  name: String,
  email: String,
  settings: mongoose.Schema.Types.Mixed,
});
mongoose.model('User', UserSchema);

function toJSON(user) {
  return {
    userid: user.userid,
    name: user.name,
    email: user.email,
    lastLogin: user.lastLogin,
    settings: user.settings,
  };
}

module.exports = {
  model: mongoose.model('User'),
  toJSON,
};
