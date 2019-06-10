const express = require('express'),
  router = express.Router(),
  bcrypt = require('bcryptjs'),
  User = require('../models/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  res.render('template', {
    locals: {
      title: 'BR Users',
      is_logged_in: req.session.is_logged_in,
      userID: req.session.user_id
    },
    partials: {
      partial: 'partial-index'
    }
  })
});

router.get('/signup', (req, res) => {
  res.render('template', {
    locals: {
      title: 'Signup Page',
      is_logged_in: req.session.is_logged_in,
      userID: req.session.user_id
    },
    partials: {
      partial: 'partial-signup-form' 
    }
  })
})

router.post('/signup', (req,res) => {
  const {first_name, last_name, email, password} = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password,salt);

  const userInstance = new User(null, first_name, last_name, email, hash);

  userInstance.save().then(response => {
    console.log(response);
    res.sendStatus(200);
  });
})

router.get('/login', (req, res) => {
  res.render('template', {
    locals: {
      title: 'Login Page',
      is_logged_in: req.session.is_logged_in,
      userID: req.session.user_id
    },
    partials: {
      partial: 'partial-login-form'
    }
  })
})

router.post('/login', (req,res) => {
  const {email, password} = req.body;

  const userInstance = new User (null, null, null, email, password);
  console.log("userInstance:", userInstance)
  userInstance.login().then(response => {
    req.session.is_logged_in = response.isValid;
    if (!!response.isValid) {
      req.session.first_name = response.first_name;
      req.session.last_name = response.last_name;
      req.session.user_id = response.user_id;
      res.redirect('/books');
    } else {
      res.sendStatus(401);
    }
  })
})

router.get('/logout', (req,res) => {
  req.session.destroy();
  res.redirect('/books');
})

module.exports = router;
