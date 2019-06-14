exports.chartsChartjs = (req, res) => {
    res.render('charts/charts-chartjs', { title : 'chartjs'})
};

exports.chartsFlot = (req, res) => {
    res.render('charts/charts-flot', { title : 'flot'})
};

exports.chartsPeity = (req, res) => {
    res.render('charts/charts-peity', { title : 'peity'})
}; 