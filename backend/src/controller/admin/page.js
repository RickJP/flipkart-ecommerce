const Page = require('../../models/page');

exports.createPage = (req, res) => {
  const { banners, products } = req.files;
  const { category, type } = req.body;

  const api = process.env.API;

  if (banners?.length > 0) {
    req.body.banners = banners.map((banner, index) => ({
      img: `${api}/public/${banner.filename}`,
      navigateTo: `/bannerClicked?categoryId=${category}&type=${type}`,
    }));
  }
  if (products?.length > 0) {
    req.body.products = products.map((product, index) => ({
      img: `${api}/public/${product.filename}`,
      navigateTo: `/productClicked?categoryId=${category}&type=${type}`,
    }));
  }

  req.body.createdBy = req.user._id;

  Page.findOne({ category: category }).exec((error, page) => {
    if (error) return res.status(400).json({ error });
    if (page) {
      Page.findOneAndUpdate({ category: category }, req.body).exec(
        (error, updatedPage) => {
          if (error) return res.status(400).json({ error });
          if (updatedPage) {
            return res.status(201).json({ page: updatedPage });
          }
        },
      );
    } else {
      const page = new Page(req.body);

      page.save((error, page) => {
        if (error) return res.status(400).json({ error });
        if (page) return res.status(201).json({ page });
      });
    }
  });
};

exports.getPage = (req, res) => {
  const { category, type } = req.params;
  if (type == 'page') {
    Page.findOne({ category: category }).exec((error, page) => {
      if (error) return res.status(400).json({ error });
      if (page) return res.status(200).json({ page });
    });
  }
};
