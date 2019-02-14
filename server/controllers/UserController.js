const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const UserManager = rootRequire('/services/UserManager'); // eslint-disable-line
const TokenManager = rootRequire('/services/TokenManager'); // eslint-disable-line

router.post('/settings', TokenManager.verifyToken, (req, res) => {
  UserManager.saveSettings(req.userId, req.body, (code, result) => {
    res.status(code).send(result);
  });
});

/*
 router.get('/:id', function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
});
*/

module.exports = router;
