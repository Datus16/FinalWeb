function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const product = require('../models/product');
const category = require('../models/category');

exports.cart = (req, res) => {
    res.render('shop/cart', { title: 'Giỏ hàng'})
};

exports.categoryAll = async (req, res) => {
    const dbProducts = await product.showAll();
    const dbCategories = await category.showAll();
    res.render('shop/category', { title: 'Danh mục', dbProducts, dbCategories})
};

exports.category = async (req, res) => {
    const dbProducts = await product.showCategory(req.params.categoryID);
    const dbCategories = await category.showAll();
    res.render('shop/category', { title: 'Danh mục', dbProducts, dbCategories})
};

exports.checkout = (req, res) => {
    res.render('shop/checkout', { title: 'Thanh toán' })
};

exports.confirmation = (req, res) => {
    res.render('shop/confirmation', { title: 'Xác nhận' })
};

exports.singleProduct = async (req, res) => {
    const dbProduct = await product.detail(req.params.productID);
    res.render('shop/single-product', { title: 'Thông tin chi tiết', dbProduct})
};