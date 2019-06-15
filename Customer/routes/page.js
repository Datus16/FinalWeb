var express = require('express');
var router = express.Router();
const pageControllers = require('../controllers/pageControllers');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

router.get('/login', forwardAuthenticated, pageControllers.loginPage);

router.get('/tracking', pageControllers.tracking);

router.get('/registration', forwardAuthenticated, pageControllers.registrationPage);

router.post('/registration', pageControllers.registration);

router.post('/login', pageControllers.login);

router.get('/logout', pageControllers.logout);

router.get('/information', ensureAuthenticated, pageControllers.information);

module.exports = router;