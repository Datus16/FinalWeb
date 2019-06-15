var express = require('express');
var router = express.Router();
const blogControllers = require('../controllers/blogControllers');

/* GET categories listing. */
router.get('/', blogControllers.blog);

/* GET product detail. */
router.get('/detail', blogControllers.detail);

module.exports = router;