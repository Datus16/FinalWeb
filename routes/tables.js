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

router.get('/tables-order', ensureAuthenticated, tablesController.tableOrder);


router.post('/tables-account/:accountID', ensureAuthenticated, tablesController.removeAccount);

router.post('/tables-product/:productID', ensureAuthenticated, tablesController.removeProduct);

router.post('/tables-category/:categoryID', ensureAuthenticated, tablesController.removeCategory);

router.post('/tables-brand/:brandID', ensureAuthenticated, tablesController.removeBrand);

router.post('/tables-customer/:customerID', ensureAuthenticated, tablesController.removeCustomer);

router.post('/tables-order/:orderID', ensureAuthenticated, tablesController.removeOrder);

// Product
router.get('/tables-product/edit/:productID', ensureAuthenticated, tablesController.editProduct);

router.post('/tables-product/edit/:productID', ensureAuthenticated, tablesController.editConfirmation);

router.get('/tables-product/add', ensureAuthenticated, tablesController.addProduct);

router.post('/addProduct', ensureAuthenticated, tablesController.postProduct);

// Category
router.get('/tables-category/edit/:categoryID', ensureAuthenticated, tablesController.editCategory);

router.post('/tables-category/edit/:categoryID', ensureAuthenticated, tablesController.editCateConfirm);

router.get('/tables-category/add', ensureAuthenticated, tablesController.addCategory);

router.post('/addCategory', ensureAuthenticated, tablesController.postCategory);

// Brand
router.get('/tables-brand/edit/:brandID', ensureAuthenticated, tablesController.editBrand);

router.post('/tables-brand/edit/:brandID', ensureAuthenticated, tablesController.editBranConfirm);

router.get('/tables-brand/add', ensureAuthenticated, tablesController.addBrand);

router.post('/addBrand', ensureAuthenticated, tablesController.postBrand);

// Customer
router.get('/tables-customer/edit/:customerID', ensureAuthenticated, tablesController.editCustomer);

router.post('/tables-customer/edit/:customerID', ensureAuthenticated, tablesController.editCustConfirm);

router.get('/tables-customer/add', ensureAuthenticated, tablesController.addCustomer);

router.post('/addCustomer', ensureAuthenticated, tablesController.postCustomer);

// Order
router.get('/tables-order/edit/:orderID', ensureAuthenticated, tablesController.editOrder);

router.post('/tables-order/edit/:orderID', ensureAuthenticated, tablesController.editOrdeConfirm);

module.exports = router;
