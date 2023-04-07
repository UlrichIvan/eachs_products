const { Product } = require("../models/product/product");

/**
 *
 * @param {Object} productBody [Body to create new product in database]
 * @returns {Promise}
 */
const createProduct = async (productBody = {}) => {
  const product = await Product.create(productBody);
  return product;
};
/**
 *
 * @param {Object} query [query to find one product in database]
 * @returns {Promise}
 */
const findOneProduct = async (query = {}) => {
  const product = await Product.findOne(query);
  return product;
};
/**
 *
 * @param {Object} query [query to delete one product in database]
 * @returns {Promise}
 */
const deleteOne = async (query = {}, bodyUpdate = {}) => {
  const product = await Product.findOneAndUpdate(
    query,
    { $set: { ...bodyUpdate } },
    { new: true }
  );
  return product;
};
/**
 *
 * @param {Object} query [query to get products in database]
 * @returns {Promise}
 */
const findProducts = async (query = null) => {
  const products = await Product.find(query);
  return products;
};

const updateProduct = async (query = null, bodyUpdate = {}) => {
  const product = await Product.findOneAndUpdate(
    query,
    { ...bodyUpdate },
    { new: true }
  );
  return product;
};

module.exports = {
  createProduct,
  findOneProduct,
  deleteOne,
  findProducts,
  updateProduct,
};
