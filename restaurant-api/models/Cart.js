const mongoose = require("mongoose");
const { type } = require("os");


// schema for cart
const CartSchema = new mongoose.Schema(
 
    {
    userId: { type: String, required: true },

    product: [
      {
        productId: { type: String },

        quantity: { type: Number, default: 1 },
      },
    ],
  },

  { timestamps: true },

);

module.exports = mongoose.model('Cart',CartSchema);