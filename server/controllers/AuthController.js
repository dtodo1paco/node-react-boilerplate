const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const TokenManager = rootRequire('/services/TokenManager'); // eslint-disable-line
const AccountManager = rootRequire('/services/AccountManager'); // eslint-disable-line

//
// PUBLIC ROUTES
//
router.post('/login', (req, res) => {
  AccountManager.doLogin(req.body.userid, req.body.password, (code, result) => {
    res.status(code).send(result);
  });
});

router.post('/register', (req, res) => {
  const { userid, password, ...rest } = req.body;
  AccountManager.doSignup(userid, password, rest, (code, result) => {
    res.status(code).send(result);
  });
});

//
// ROUTES WITH TOKEN
//
router.get('/me', TokenManager.verifyToken, (req, res) => {
  AccountManager.doReauth(req.userId, (code, result) => {
    res.status(code).send(result);
  });
});

router.post('/logout', TokenManager.verifyToken, (req, res) => {
  AccountManager.doLogout(req.userId, req.body.lastRoute, (code, result) => {
    res.status(code).send(result);
  });
});

module.exports = router;
