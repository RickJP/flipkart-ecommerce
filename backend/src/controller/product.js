const Product = require('../models/product');
const shortId = require('shortid');
const slugify = require('slugify');
const Category = require('../models/category');

exports.createProduct = (req, res) => {
  const { name, price, description, quantity, category } = req.body;

  let productPictures = [];

  if (req.files.length > 0) {
    productPictures = req.files.map((file) => {
      return { img: file.filename };
    });
  }
  console.log('req.files.length:  ', req.files.length);

  const product = new Product({
    name,
    slug: slugify(name),
    price,
    quantity,
    description,
    productPictures,
    category,
    createdBy: req.user._id,
  });
  console.log('PRODUCT', product);

  product.save((error, product) => {
    if (error) return res.status(400).json({ error });
    if (product) {
      res.status(201).json({ product });
    }
  });
};

exports.getProductsBySlug = (req, res) => {
  const { slug } = req.params;

  Category.findOne({ slug })
    .select('_id')
    .exec((error, category) => {
      if (error) return res.status(400).json({ error });

      if (category) {
        Product.find({ category: category._id }).exec((error, products) => {
          products.length > 0
            ? res.status(200).json({
                products,
                productsByPrice: {
                  under5k: products.filter((product) => product.price <= 5000),
                  under10k: products.filter(
                    (product) => product.price > 5000 && product.price <= 10000,
                  ),
                  under15k: products.filter(
                    (product) =>
                      product.price > 10000 && product.price <= 15000,
                  ),
                  under20k: products.filter(
                    (product) =>
                      product.price > 15000 && product.price <= 20000,
                  ),
                  under30k: products.filter(
                    (product) =>
                      product.price > 20000 && product.price <= 30000,
                  ),
                },
              })
            : null;
        });
      }
    });
};

exports.getProductDetailsById = (req, res) => {
  const { productId } = req.params;
  if (productId) {
    Product.findOne({ _id: productId }).exec((error, product) => {
      if (error) return res.status(400).json({ error });
      if (product) res.status(200).json({ product });
    });
  } else {
    return res.status(400).json({ error: 'Params required' });
  }
};
