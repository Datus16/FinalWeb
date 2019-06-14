const product = require('../models/product');
const customer = require('../models/customer');
const category = require('../models/category');
const brand = require('../models/brand');
const User = require('../models/User');

exports.tablesBasic = (req, res) => {
    res.render('tables/tables-basic', { title : 'tableBasic'})
};

exports.tablesData = (req, res) => {
    res.render('tables/tables-data', { title : 'tableData'})
};

exports.tablesAccount = (req, res) => {
    User.find({}, function(err, users) {
        var dbAccounts = {};
        users.forEach(function(user) {
          dbAccounts[user._id] = user;
        });
        res.render('tables/tables-account', { title : 'Bảng danh sách tài khoản', dbAccounts});
    });
};

exports.tablesProduct = async (req, res) => {
    const dbProducts = await product.list();
    res.render('tables/tables-product', { title : 'tableProduct', dbProducts})
};

exports.tablesCustomer = async (req, res) => {
    const dbCustomers = await customer.list();
    res.render('tables/tables-customer', { title : 'tableCustomer', dbCustomers})
};

exports.tableCategory = async (req, res) => {
    const dbCategories = await category.list();
    res.render('tables/tables-category', { title : 'tableCategory', dbCategories})
};

exports.tableBrand = async (req, res) => {
    const dbBrands = await brand.list();
    res.render('tables/tables-brand', { title : 'tableBrand', dbBrands})
};

exports.removeItem = async (id) => {
    await product.remove(id);
    res.redirect('./');
};

exports.add = (req, res, next) => {
    res.render('tables/add', { category: 'Sản phẩm', categoryLink: '/tables', title: 'Thêm sản phẩm' });
};

exports.addPost = async (req, res, next) => {
    await product.add(req.body);
    res.redirect('./');
};