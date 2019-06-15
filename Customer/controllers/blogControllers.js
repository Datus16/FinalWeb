exports.blog = (req, res) => {
    res.render('blog/blog', { title: 'Blog' })
};

exports.detail = (req, res) => {
    res.render('blog/detail', { title: 'Bài viết' })
};