const product = require('../models/product');
const customer = require('../models/customer');
const category = require('../models/category');
const brand = require('../models/brand');
const User = require('../models/User');

const ObjectId = require('mongodb').ObjectId;
const { dbs } = require('../dbs');

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

// exports.tablesAccount = async (req, res) => {
//     const dbAccounts = await account.list();
//     res.render('tables/tables-account', { title : 'tableCustomer', dbAccounts})
// };

exports.tablesProduct = async (req, res) => {
    const dbProducts = await product.list();
    const dbCategories = await category.list();
    res.render('tables/tables-product', { title : 'tableProduct', dbProducts, dbCategories})
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

exports.removeAccount = async (req, res) => {
    User.findByIdAndRemove(req.params.accountID, function(err, users) {
        res.redirect('/tables/tables-account');
    });
};

exports.removeProduct = async (req, res) => {
    await dbs.production.collection('products').deleteOne({_id: ObjectId(req.params.productID)});
    res.redirect('/tables/tables-product')
};

exports.editProduct = async (req, res) => {
    const dbProduct = await product.detail(req.params.productID);
    const dbCategories = await category.list();
    const dbBrands = await brand.list();
    res.render('tables/edit', { title: 'Chỉnh sửa thông tin', dbProduct, dbCategories, dbBrands });
};

exports.editConfirmation = async (req, res) => {
    const { name, category, brand, image, price, salePrice, availability } = req.body;
    await product.editOne(req.params.productID, name, category, brand, image, price, salePrice, availability);
    res.redirect('/tables/tables-product');
};

exports.addProduct = async (req, res) => {
    const dbCategories = await category.list();
    const dbBrands = await brand.list();
    res.render('tables/add', { title: 'Thêm sản phẩm', dbCategories, dbBrands});
};