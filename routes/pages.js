var express = require('express');
var router = express.Router();
const pagesController = require('../controllers/pagesController');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

router.get('/page-login', forwardAuthenticated, pagesController.loginPage);

router.get('/page-register', forwardAuthenticated, pagesController.register);

router.get('/page-forget', pagesController.forget);

router.post('/page-register', pagesController.registration);

router.post('/page-login', pagesController.login);

router.get('/page-logout', pagesController.logout);

router.get('/page-info', ensureAuthenticated, pagesController.information);

module.exports = router;