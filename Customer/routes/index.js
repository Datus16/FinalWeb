var express = require('express');
var router = express.Router();
const homeControllers = require('../controllers/homeControllers');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

/* GET home page. */
router.get('/', homeControllers.home);

module.exports = router;
