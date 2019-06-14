var express = require('express');
var router = express.Router();
const tablesController = require('../controllers/tablesController');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

/* GET home page. */
// router.get('/tables-basic', tablesController.tablesBasic);

// router.get('/tables-data', tablesController.tablesData);

router.get('/tables-account', ensureAuthenticated, tablesController.tablesAccount);

router.get('/tables-product', tablesController.tablesProduct);

router.get('/tables-customer', tablesController.tablesCustomer);

router.get('/tables-category', tablesController.tableCategory);

router.get('/tables-brand', tablesController.tableBrand);

router.get('/add', tablesController.add);
router.post('/add', tablesController.addPost);

module.exports = router;
