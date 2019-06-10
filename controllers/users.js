const bcrypt = require('bcryptjs');

const Users = require('../models/users');

exports.signup_get = (req, res) => {
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
}