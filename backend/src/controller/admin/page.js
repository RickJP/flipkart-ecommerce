const Page = require('../../models/page');

exports.createPage = (req, res) => {
  const { banners, products } = req.files;
  const { _id, type } = req.body;

  if (banners?.length > 0) {
    req.body.banners = banners.map((banner, index) => ({
      img: `${process.env.API}/public/${banner.filename}`,
      navigateTo: `/bannerClicked?categoryId=${_id}&type=${type}`,
    }));
  }
  if (products?.length > 0) {
    req.body.products = products.map((product, index) => ({
      img: `${process.env.API}/public/${product.filename}`,
      navigateTo: `/productClicked?categoryId=${_id}&type=${type}`,
    }));
  }

  req.body.createdBy = req.user._id;

  const page = new Page(req.body);

  page.save((error, page) => {
    if (error) return res.status(500).json({ error });
    if (page) return res.status(201).json({ page });
  });
};
