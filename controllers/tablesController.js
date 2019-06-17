const product = require('../models/product');
const customer = require('../models/customer');
const order = require('../models/order');
const category = require('../models/category');
const brand = require('../models/brand');
const User = require('../models/User');

const ObjectId = require('mongodb').ObjectId;
const { dbs } = require('../dbs');

exports.tablesBasic = (req, res) => {
    res.render('tables/tables-basic', { title : 'あなたに逢いたくて'})
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
    const dbBrands = await brand.list();
    res.render('tables/tables-product', { title : 'Bảng danh sách tài khoản', dbProducts, dbCategories, dbBrands})
};

exports.tablesCustomer = async (req, res) => {
    const dbCustomers = await customer.list();
    res.render('tables/tables-customer', { title : 'Bảng danh sách khách hàng', dbCustomers})
};

exports.tableCategory = async (req, res) => {
    const dbCategories = await category.list();
    res.render('tables/tables-category', { title : 'Bảng danh sách danh mục', dbCategories})
};

exports.tableBrand = async (req, res) => {
    const dbBrands = await brand.list();
    res.render('tables/tables-brand', { title : 'Bảng danh sách thương hiệu', dbBrands})
};

exports.tableOrder = async (req, res) => {
    const dbOrders = await order.list();
    const dbProducts = await product.list();
    const dbCustomers = await customer.list();
    res.render('tables/tables-order', { title : 'Bảng danh sách thương hiệu', dbOrders, dbProducts, dbCustomers})
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

exports.removeCategory = async (req, res) => {
    await dbs.production.collection('categories').deleteOne({_id: ObjectId(req.params.categoryID)});
    res.redirect('/tables/tables-category')
};

exports.removeBrand = async (req, res) => {
    await dbs.production.collection('brands').deleteOne({_id: ObjectId(req.params.brandID)});
    res.redirect('/tables/tables-brand')
};

exports.removeCustomer = async (req, res) => {
    await dbs.production.collection('products').deleteOne({_id: ObjectId(req.params.customerID)});
    res.redirect('/tables/tables-customer')
};

exports.removeOrder = async (req, res) => {
    await dbs.production.collection('orders').deleteOne({_id: ObjectId(req.params.orders)});
    res.redirect('/tables/tables-order')
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

exports.postProduct = async (req, res) => {
    const { name, category, brand, image, price, salePrice, availability } = req.body;
    await dbs.production.collection('products').insertOne({name: name, category: category,
        brand: brand, image: image, price: price, salePrice: salePrice, availability: availability, hitCount: 1});
    res.redirect('/tables/tables-product')
};

exports.editCategory = async (req, res) => {
    const dbCategory = await category.detail(req.params.categoryID);
    res.render('tables/editCategory', { title: 'Chỉnh sửa thông tin', dbCategory });
};

exports.editCateConfirm = async (req, res) => {
    const { name } = req.body;
    await category.editOne(req.params.categoryID, name);
    res.redirect('/tables/tables-category');
};

exports.addCategory = async (req, res) => {
    res.render('tables/addCategory', { title: 'Thêm danh mục'});
};

exports.postCategory = async (req, res) => {
    const { name } = req.body;
    await dbs.production.collection('categories').insertOne({name: name});
    res.redirect('/tables/tables-category')
};

exports.editBrand = async (req, res) => {
    const dbBrand = await brand.detail(req.params.brandID);
    res.render('tables/editBrand', { title: 'Chỉnh sửa thông tin', dbBrand });
};

exports.editBranConfirm = async (req, res) => {
    const { name } = req.body;
    await brand.editOne(req.params.brandID, name);
    res.redirect('/tables/tables-brand');
};

exports.addBrand = async (req, res) => {
    res.render('tables/addBrand', { title: 'Thêm thương hiệu'});
};

exports.postBrand = async (req, res) => {
    const { name } = req.body;
    await dbs.production.collection('brands').insertOne({name: name});
    res.redirect('/tables/tables-brand')
};

exports.editCustomer = async (req, res) => {
    const dbCustomer = await customer.detail(req.params.customerID);
    res.render('tables/editCustomer', { title: 'Chỉnh sửa thông tin', dbCustomer });
};

exports.editCustConfirm = async (req, res) => {
    const { name, phone, email } = req.body;
    await customer.editOne(req.params.productID, name, phone, email);
    res.redirect('/tables/tables-customer');
};

exports.addCustomer = async (req, res) => {
    res.render('tables/addCustomer', { title: 'Thêm sản phẩm'});
};

exports.postCustomer = async (req, res) => {
    const { name, phone, email } = req.body;
    await dbs.production.collection('customers').insertOne({name: name, phone: phone,
        email: email});
    res.redirect('/tables/tables-customer')
};

exports.editOrder = async (req, res) => {
    const dbOrder = await order.detail(req.params.orderID);
    const dbCustomers = await customer.list();
    const dbProducts = await product.list();
    res.render('tables/editOrder', { title: 'Chỉnh sửa thông tin', dbOrder, dbCustomers, dbProducts });
};

exports.editOrdeConfirm = async (req, res) => {
    const { customer, product, quantity, status } = req.body;
    await order.editOne(req.params.orderID, customer, product, quantity, status);
    res.redirect('/tables/tables-order');
};