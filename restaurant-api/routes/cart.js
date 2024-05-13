const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {verifyToken,verifyTokenAndAuthorization, verifyTokenAndAdmin,verifyTokenAndAuthorizationForCart} = require("../middlewares/verifyToken");
const CryptoJS = require("crypto-js");
const User = require("../models/User");
const { default: mongoose } = require("mongoose");
const Product = require("../models/Product");
const Cart = require("../models/Cart");

// CREATE
// here we create a new cart any logged in user can create a cart so we used verifyToken middleware
router.post("/create", verifyToken, async (req, res) => {

  const newCart = new Cart(req.body); // here we used req.body as we don't need to apply anything on the properties unlike in register in auth we needed to encrypt the password property
  try {
    const savedCart = await newCart.save(); // save cart in database
    res.status(201).json(savedCart); // send the cart in the response
  } catch (err) {
    res.status(500).json(err);
  };
});

// UPDATE
// update cart information
// here we applied another middleware function for cart only to authorize the request as the id in parameter is cart's id not user's id
router.put("/update/:id", verifyTokenAndAuthorizationForCart, async (req, res) => { // note: id parameter here is the cart id not the user's id

  try {
    // here we find the cart in the database by its id then update
    const updatedCart = await Cart.findByIdAndUpdate(req.params.id,
      {
        $set: req.body, // we use $set: req.body to set all what is sent in req.body as the new values in database
      },
      { new: true }
    ); // {new:true} is used to make the function findByIdAndUpdate returns its result in variable updatedCart

    res.status(200).json(updatedCart); // here we respond by the updated cart
  } catch (err) {
    res.status(500).json(err);
  };
});


// DELETE
// delete cart 
// here again we used the middleware function that we made for cart authorization as the id in paramete is cart's id not user's id
router.delete("/delete/:id", verifyTokenAndAuthorizationForCart, async (req, res) => {
  // id parameter here is the id of the cart

  try {
    await Cart.findByIdAndDelete(req.params.id); // here we delete the cart using its id in parameter
    res.status(200).json({ msg: "Cart has been deleted" }); // we send a message for deletion
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET CART BY USER'S ID
// here user can get his cart and also admin so we used verifyTokenAndAuthorization
router.get("/find/:id",verifyTokenAndAuthorization, async (req, res) => {
  try {
    const wantedCart = await Cart.findOne({userId: req.params.id}); // here we find cart in our database by comparing user's id in parameter with the userId field in cart
    res.status(200).json(wantedCart); // we send cart in our response
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL CARTS
// only admin can get all carts so we used verifyTokenAndAdmin middleware
router.get("/find", verifyTokenAndAdmin, async (req, res) => {
  try {

     const carts = await Cart.find(); // get all carts from database
    
    res.status(200).json(carts); // send all carts in response
  } catch (err) {
    res.status(500).json(err);
  };
});

module.exports = router;