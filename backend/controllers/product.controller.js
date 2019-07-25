const logger = require('../config/winston');
const Product = require('../database/models/product');

const getAllProducts = (req, res, next) => {
  logger.info('Retrieving all products.');
  Product.find({}, (e, products) => {
    if (e) {
      logger.error(e);
      res.send(e);
    } else {
      logger.info('Products successfully retrieved.');
      res.send(products);
    }
  });
};

const createProduct = (req, res, next) => {
  const {name, description, quantity} = req.body;
  const productInstance = new Product({
    name: name,
    description: description,
    quantity: quantity,
  });
  logger.info(`Adding product: \n${productInstance}`);
  productInstance.save((e) => {
    if (e) {
      logger.error(e);
      res.send(e);
    } else {
      logger.info('Product added successfully.');
      res.send('Product added successfully.');
    }
  });
};

module.exports = {
  getAllProducts: getAllProducts,
  createProduct: createProduct,
};
