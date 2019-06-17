
const product = require('../models/product');
const category = require('../models/category');
const brand = require('../models/brand');
const comment = require('../models/comment');
const ObjectId = require('mongodb').ObjectId;
const { dbs } = require('../dbs');

exports.cart = (req, res) => {
    res.render('shop/cart', { title: 'Giỏ hàng'})
};

exports.categoryAll = async (req, res) => {
    const dbProducts = await product.showAll();
    const dbCategories = await category.showAll();
    const dbBrands = await brand.showAll();
    res.render('shop/category', { title: 'Danh mục', dbProducts, dbCategories, dbBrands})
};

exports.category = async (req, res) => {
    const dbProducts = await product.showCategory(req.params.categoryID);
    const dbCategories = await category.showAll();
    const dbBrands = await brand.showAll();
    res.render('shop/category', { title: 'Danh mục', dbProducts, dbCategories, dbBrands})
};

exports.brand = async (req, res) => {
    const dbProducts = await product.showBrand(req.params.brandID);
    const dbCategories = await category.showAll();
    const dbBrands = await brand.showAll();
    res.render('shop/category', { title: 'Danh mục', dbProducts, dbCategories, dbBrands})
};

exports.checkout = (req, res) => {
    res.render('shop/checkout', { title: 'Thanh toán' })
};

exports.confirmation = (req, res) => {
    res.render('shop/confirmation', { title: 'Xác nhận' })
};

exports.singleProduct = async (req, res) => {
    const dbProduct = await product.detail(req.params.productID);
    const dbCategory = await category.detail(dbProduct.category);
    const dbComments = await comment.showAll();
    res.render('shop/single-product', { title: 'Thông tin chi tiết', dbProduct, dbCategory, dbComments});
};

exports.postComment = async (req, res) => {
    const { name, email, message } = req.body;
    await dbs.production.collection('comments').insertOne({product: req.params.productID, name: name, email: email,
        message: message});
    res.redirect('/shop/single-product/' + req.params.productID);
};