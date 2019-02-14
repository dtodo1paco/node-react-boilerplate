const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const config = rootRequire('/config/app'); // eslint-disable-line

function verifyToken(req, res, next) {
  // check header or url parameters or post parameters for token
  const token = req.header('x-access-token');
  if (!token)
    res.status(401).send({ auth: false, message: 'error.unauthorized' });
  // verifies secret and checks exp
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      const msg = err.name || err;
      // console.log("error: " + JSON.stringify(err));
      res.status(409).send({
        auth: false,
        message: `error.${msg}`,
      });
    } else {
      // if everything is good, save to request for use in other routes
      req.userId = decoded.id;
      next();
    }
  });
}

function buildToken(key) {
  // if user is found and password is valid
  // create a token
  const token = jwt.sign({ id: key }, config.secret, {
    // expiresIn: 86400, // expires in 24 hours
    // expiresIn: 3600, // expires in 1 hour
    expiresIn: 300, // expires in 5 min
    // expiresIn: 60, // expires in 1 min
  });
  return token;
}

module.exports = {
  verifyToken,
  buildToken,
};
