var express = require('express');
var router = express.Router();
const shopControllers = require("../controllers/shopControllers");

/* GET categories listing. */
router.get('/', shopControllers.categoryAll);

router.get('/:categoryID', shopControllers.category);

/* GET product detail. */
router.get('/single-product/:productID', shopControllers.singleProduct);

router.get('/checkout', shopControllers.checkout);

router.get('/cart', shopControllers.cart);

router.get('/confirmation', shopControllers.confirmation);

module.exports = router;