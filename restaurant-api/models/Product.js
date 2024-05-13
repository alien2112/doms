const mongoose = require("mongoose");

// schema for products
const ProductSchema = new mongoose.Schema(

    {

        title: {type: String, required: true, unique: true},
        description: {type: String, required: true},
        img: {type: String, required: false},
        categories: {type: Array},
        size: {type: Array},
        price: {type: Number, required: true},
        inStock: {type: Boolean, default: false}

    },

    {timestamps: true},

);

module.exports = mongoose.model('Product',ProductSchema);