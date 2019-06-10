const express = require('express'),
  router = express.Router(),
  UsersController = require('../controllers/users');

router.get('/signup', UsersController.signup_get);
router.get('/login', UsersController.login_get);
router.post('/signup', UsersController.signup_post);
router.post('/login', UsersController.login_post);
router.get('/logout', UsersController.logout);

module.exports = router;
