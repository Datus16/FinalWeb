
const product = require('../models/product');
const category = require('../models/category');
const brand = require('../models/brand');

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
    res.render('shop/single-product', { title: 'Thông tin chi tiết', dbProduct, dbCategory})
};