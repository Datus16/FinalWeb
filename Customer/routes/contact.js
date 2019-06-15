var express = require('express');
var router = express.Router();
const contactControllers = require('../controllers/contactControllers');

router.get('/', contactControllers.contact);

module.exports = router;