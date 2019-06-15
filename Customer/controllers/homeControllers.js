const product = require('../models/product');

exports.home = async (req, res, next) => {
    const data = {
        topProducts: [{
            image: '/images/banner/banner-img.png',
            name: 'Sneaker',
            information: 'Dòng mô tả sản phẩm cho Sneaker',
        }, {
            image: '/images/banner/banner-img2.png',
            name: 'Blueberry',
            information: 'Dòng mô tả sản phẩm cho Blueberry',
        },],
        categories: [{
            image: '/images/category/c1.jpg',
            name: 'Dành cho Thể thao',
            class: 'col-lg-8 col-md-8'
        }, {
            image: '/images/category/c2.jpg',
            name: 'Dành cho Thời trang',
            class: 'col-lg-4 col-md-4'
        },{
            image: '/images/category/c3.jpg',
            name: 'Dành cho Cặp đôi',
            class: 'col-lg-4 col-md-4'
        },{
            image: '/images/category/c4.jpg',
            name: 'Dành cho Chạy bộ',
            class: 'col-lg-8 col-md-8'
        },{
            image: '/images/category/c5.jpg',
            name: 'Dành cho Vận động viên',
            class: 'col-lg-4 col-md-6'
        },],
        products: [{
            image: '/images/product/p1.jpg',
            name: 'Giày chạy bộ',
            price: '1.290.000 đ',
            salePrice: '890.000 đ',
        },{
            image: '/images/product/p2.jpg',
            name: 'Giày chạy bộ',
            price: '1.290.000 đ',
            salePrice: '890.000 đ',
        },{
            image: '/images/product/p3.jpg',
            name: 'Giày chạy bộ',
            price: '1.290.000 đ',
            salePrice: '890.000 đ',
        },{
            image: '/images/product/p4.jpg',
            name: 'Giày chạy bộ',
            price: '1.290.000 đ',
            salePrice: '890.000 đ',
        },{
            image: '/images/product/p5.jpg',
            name: 'Giày chạy bộ',
            price: '1.290.000 đ',
            salePrice: '890.000 đ',
        },{
            image: '/images/product/p6.jpg',
            name: 'Giày chạy bộ',
            price: '1.290.000 đ',
            salePrice: '890.000 đ',
        },{
            image: '/images/product/p7.jpg',
            name: 'Giày chạy bộ',
            price: '1.290.000 đ',
            salePrice: '890.000 đ',
        },{
            image: '/images/product/p8.jpg',
            name: 'Giày chạy bộ',
            price: '1.290.000 đ',
            salePrice: '890.000 đ',
        },]
    };
    data.dbProducts = await product.showAll();
    res.render('home/index', {title: 'Trang chủ', data, user: req.user})
};

// exports.loginGet = (req, res) => {
//     res.render('authen/login', { title: 'Đăng nhập' })
// };

// exports.recoverGet = (req, res) => {
//     res.render('authen/recover', { title: 'Quên mật khẩu' })
// };

// exports.registerGet = (req, res) => {
//     res.render('authen/register', { title: 'Đăng ký' })
// };