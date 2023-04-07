const mongoose = require("mongoose");
// const User = require("../users");
const Schema = mongoose.Schema;
const ORDER_STATUS = require("../orderstatus");
const { RawMaterialsValidator, creatorValidator } = require("./validators");
const productObject = {
  price: {
    type: Number,
    required: true,
  },
  ids_MP: {
    required: true,
    default: undefined,
    type: [{ type: mongoose.Types.ObjectId, required: true }],

    validate: {
      validator: RawMaterialsValidator,
    },
  },
  _creator: {
    type: mongoose.Types.ObjectId,
    required: true,
    validate: {
      validator: creatorValidator,
    },
  },
  category: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  productName: {
    type: String,
    maxlength: 50,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  restaurant: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  pusharePrice: {
    type: Number,
  },
  costPrice: {
    type: Number,
  },
  sellingPrice: {
    type: Number,
  },
  orders: {
    type: [
      {
        id_client: { type: mongoose.Types.ObjectId, required: true },
        id_restaurant: { type: mongoose.Types.ObjectId, required: true },
        orderTile: { type: String, required: true },
        status: {
          type: String,
          enum: [
            ORDER_STATUS.DONE,
            ORDER_STATUS.BEING_PROCESSED,
            ORDER_STATUS.FREE,
          ],
        },
      },
    ],
    default: [],
  },

  promotion: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
  },
  devise: {
    type: String,
    default: "MAD",
  },
  cookingtime: {
    type: String,
  },

  image: {
    type: String,
    default: "/data/uploads/mcf.png",
  },
  liked: {
    type: Number,
    default: 0,
  },
  likedPersonCount: {
    type: Number,
    default: 0,
  },
  deletedAt: { type: Date, default: null },
};
const fieldsaRequired = Object.keys(productObject);
const productSchema = new Schema(productObject, { timestamps: true });

module.exports.fieldsaRequired = fieldsaRequired;
module.exports.Product = mongoose.model("Product", productSchema);
