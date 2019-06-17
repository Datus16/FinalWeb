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
      errors.push({ msg: 'Xin nhập thông tin' });
    }
  
    if (password != password2) {
      errors.push({ msg: 'Mật khẩu không trùng khớp' });
    }
  
    if (password.length < 6) {
      errors.push({ msg: 'Mật khẩu phải chứa ít nhất 6 kí tự' });
    }
  
    if (errors.length > 0) {
      res.render('page/registration', {
        errors,
        name,
        email,
        password,
        password2
      });
    } else {
      User.findOne({ email: email }).then(user => {
        if (user) {
          errors.push({ msg: 'Địa chỉ Email đã được sử dụng' });
          res.render('page/registration', {
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
                    'Tạo tài khoản thành công. Bạn có thể đăng nhập.'
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