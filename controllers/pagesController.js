const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');

exports.loginPage = (req, res) => {
    var success_msg = req.flash('success_msg');
    res.render('pages/page-login', { title: 'Đăng nhập', success_msg});
};

exports.register = (req, res) => {
    res.render('pages/page-register', { title: 'Đăng ký' });
};

exports.forget = (req, res) => {
    res.render('pages/page-forget', { title: 'Quên mật khẩu' });
};

exports.information = (req, res) => {
    res.render('pages/page-info', { title: 'Thông tin tài khoản' , user: req.user});
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
      res.render('pages/page-register', {
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
          res.render('pages/page-register', {
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
                  res.redirect('/pages/page-login');
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
      failureRedirect: '/pages/page-login',
      failureFlash: true
    })(req, res, next);
};
  
// Logout
exports.logout = (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/pages/page-login');
};