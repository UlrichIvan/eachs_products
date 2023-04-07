const mongoose = require("mongoose");
const { fieldsaRequired } = require("../models/product/product");
const {
  creatorValidation,
  fieldsValidator,
} = require("../models/product/validators");
const productServices = require("../services/productServices");
// create one product
const createProduct = async (req, res) => {
  try {
    let body = req.body || {};
    let fields = Object.keys(body);

    if (fields.length) {
      // verify fields on body
      let { validate } = fieldsValidator(fields, fieldsaRequired);

      // if body have invalid fields
      if (!validate) {
        return res.status(401).json({ message: "invalid data!!!" });
      }
      // fill data to store in database
      let data = {};
      fields.filter((f) => {
        data[f] = body[f];
      });

      let product = await productServices.createProduct(data);
      console.log("###########################");
      console.log({ product: product?._id });
      console.log("###########################");
      res
        .status(200)
        .json({ message: "product has been created successfully!!!" });
    } else {
      res.status(401).json({ message: "invalid data!!!" });
    }
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Error occured during a creation of product!!!" });
  }
};
// delete one product
const deleteProduct = async (req, res) => {
  try {
    // check if creator have authorization
    let { validate, creator } = await creatorValidation(req.body?._creator);
    console.log({ validate });
    // find and delete product
    let productDeleted = await productServices.deleteOne(
      {
        _id: req.params?.id,
        deletedAt: null,
      },
      { _creator: creator, deletedAt: Date.now() }
    );

    // if product not exits or had already deleted
    if (!productDeleted) {
      return res
        .status(401)
        .json({ message: "product not exists or already deleted" });
    }
    // product exits and had deleted successfully(set the date of deletion,no drop product)
    if (productDeleted.deletedAt) {
      console.log({ productDeleted: productDeleted._id });
      return res
        .status(200)
        .json({ message: "product has been delete sucessfully" });
    } else return res.status(500).json({ message: "delete product failed" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "errors occured during the deletion of product!!!" });
  }
};

// get products
const fetchProducts = async (req, res) => {
  try {
    if (mongoose.Types.ObjectId.isValid(req.query?.restaurant)) {
      // fetch product by restaurant
      let products = await productServices.findProducts({
        restaurant: req.query?.restaurant,
      });

      res.status(200).json({ products });
    } else {
      res.status(401).json({ message: "invalid params sent!!!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error occured during get request!!!" });
  }
};

// update product
const updateProduct = async (req, res) => {
  // verify all fields in body
  try {
    let body = req.body || {};
    let fields = Object.keys(body);
    if (fields.length && mongoose.Types.ObjectId.isValid(req.params?.id)) {
      // verify fields on body
      let { validate } = fieldsValidator(fields, fieldsaRequired);
      console.log({ validate, body });
      // if body have invalid fields
      if (!validate) {
        return res.status(401).json({ message: "invalid data sent!!!" });
      }
      // fill data to store in database
      let data = {};
      fields.filter((f) => {
        data[f] = body[f];
      });
      // check if creator have authorization
      let { validate: validated, creator } = await creatorValidation(
        body?._creator
      );
      console.log({ validated });
      if (validated) {
        data["_creator"] = creator; //update creator
        let product = await productServices.updateProduct(
          { _id: req.params?.id },
          data
        );
        if (!product) {
          res.status(401).json({
            message: "unable to update product because product not found",
          });
        } else {
          console.log("###########################");
          console.log({ product: product?._id });
          console.log("###########################");
          res
            .status(200)
            .json({ message: "product has been update successfully!!!" });
        }
      } else {
        res.status(401).json({
          message:
            "you have not authorization to do the current action,please see your administrator to perform it!!!",
        });
      }
    } else {
      res.status(401).json({ message: "invalid data sent!!!" });
    }
  } catch (error) {}
};
module.exports = {
  createProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
};
