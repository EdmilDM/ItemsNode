const mongoose = require('mongoose');

const logger = require('../config/winston');
const Product = require('../database/models/product');

const getAllProducts = (req, res, next) => {
  logger.info('Retrieving all products.');
  Product.find({}, (e, products) => {
    if (e) {
      logger.error(e);
      res.status(500).send(e);
    } else {
      logger.info('Products successfully retrieved.');
      res.status(200).send(products);
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
      res.status(500).send(e);
    } else {
      logger.info('Product added successfully.');
      res.status(201).send('Product added successfully.');
    }
  });
};

const findProductById = (req, res, next) => {
  const _id = req.params._id;
  if (mongoose.Types.ObjectId.isValid(_id)) {
    Product.findById(_id).then( (product, e) => {
      if (e) {
        logger.error(e);
        res.status(500).send(e);
      } else {
        if (product) {
          logger.info('Products successfully retrieved.');
          res.status(200).send(product);
        } else {
          logger.error('No data exists for product.');
          res.status(200).send({error: 'No data exists for product.'});
        }
      }
    });
  } else {
    logger.error('Invalid MongoId');
    res.status(400).send({error: 'Invalid MongoId'});
  }
};

const updateProduct = (req, res, next) => {
  const {_id, name, description, quantity} = req.body;
  const productObject = Object.assign({},
      name && {name},
      description && {description},
      quantity && {quantity},
  );
  if (mongoose.Types.ObjectId.isValid(_id)) {
    Product.findByIdAndUpdate(_id, productObject).then( (product, e) => {
      if (e) {
        logger.error(e);
        res.status(500).send(e);
      } else {
        logger.info('Products successfully updated.');
        res.status(200).send('Product successfully updated.');
      }
    });
  } else {
    logger.error('Invalid MongoId');
    res.status(400).send({error: 'Invalid MongoId'});
  }
};

const deleteProduct = (req, res, next) => {
  const {_id} = req.body;
  if (mongoose.Types.ObjectId.isValid(_id)) {
    Product.findOneAndRemove(_id).then( (product, e) => {
      if (e) {
        logger.error(e);
        res.status(500).send(e);
      } else {
        logger.info('Products successfully removed.');
        res.status(200).send('Product successfully removed.');
      }
    });
  } else {
    logger.error('Invalid MongoId');
    res.status(400).send({error: 'Invalid MongoId'});
  }
};

module.exports = {
  getAllProducts: getAllProducts,
  createProduct: createProduct,
  findProductById: findProductById,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct,

};
