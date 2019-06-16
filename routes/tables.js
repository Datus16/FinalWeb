var express = require('express');
var router = express.Router();
const tablesController = require('../controllers/tablesController');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

/* GET home page. */
// router.get('/tables-basic', tablesController.tablesBasic);

// router.get('/tables-data', tablesController.tablesData);

router.get('/tables-account', ensureAuthenticated, tablesController.tablesAccount);

router.get('/tables-product', ensureAuthenticated, tablesController.tablesProduct);

router.get('/tables-customer', ensureAuthenticated, tablesController.tablesCustomer);

router.get('/tables-category', ensureAuthenticated, tablesController.tableCategory);

router.get('/tables-brand', ensureAuthenticated, tablesController.tableBrand);

router.post('/tables-account/:accountID', ensureAuthenticated, tablesController.removeAccount);

router.post('/tables-product/:productID', ensureAuthenticated, tablesController.removeProduct);

router.get('/tables-product/edit/:productID', ensureAuthenticated, tablesController.editProduct);

router.post('/tables-product/edit/:productID', ensureAuthenticated, tablesController.editConfirmation);

router.get('/tables-product/add', ensureAuthenticated, tablesController.addProduct);

module.exports = router;
