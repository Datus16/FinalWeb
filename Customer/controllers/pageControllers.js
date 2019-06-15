const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');

exports.loginPage = (req, res) => {
    res.render('page/login', { title: 'Đăng nhập' })
};

exports.tracking = (req, res) => {
    res.render('page/tracking', { title: 'Theo dõi đơn hàng' })
};

exports.information = (req, res) => {
  res.render('page/information', { title: 'Thông tin tài khoản' , user: req.user});
};

exports.registrationPage = (req, res) => {
    res.render('page/registration', { title: 'Đăng kí tài khoản' });
};

exports.registration = (req, res) => {
    
    const { name, email, password, password2 } = req.body;
    let errors = [];
  
    if (!name || !email || !password || !password2) {
      errors.push({ msg: 'Please enter all fields' });
    }
  
    if (password != password2) {
      errors.push({ msg: 'Passwords do not match' });
    }
  
    if (password.length < 6) {
      errors.push({ msg: 'Password must be at least 6 characters' });
    }
  
    if (errors.length > 0) {
      res.render('registration', {
        errors,
        name,
        email,
        password,
        password2
      });
    } else {
      User.findOne({ email: email }).then(user => {
        if (user) {
          errors.push({ msg: 'Email already exists' });
          res.render('registration', {
            errors,
            name,
            email,
            password,
            password2
          });
        } else {
          const newUser = new User({
            name,
            email,
            password
          });
  
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(user => {
                  req.flash(
                    'success_msg',
                    'You are now registered and can log in'
                  );
                  res.redirect('/page/login');
                })
                .catch(err => console.log(err));
            });
          });
        }
    });
    }
};
  
// Login
exports.login = (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/page/login',
      failureFlash: true
    })(req, res, next);
};
  
// Logout
exports.logout = (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/page/login');
};