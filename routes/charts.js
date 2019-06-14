var express = require('express');
var router = express.Router();
const chartsControllers = require('../controllers/chartsController');


/* GET home page. */
router.get('/chartsChartjs', chartsControllers.chartsChartjs) ;

router.get('/chartsFlot', chartsControllers.chartsFlot);

router.get('/chartsPeity', chartsControllers.chartsPeity);

module.exports = router;
