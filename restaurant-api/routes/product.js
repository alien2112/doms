const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("../middlewares/verifyToken");
const CryptoJS = require("crypto-js");
const User = require("../models/User");
const { default: mongoose } = require("mongoose");
const Product = require("../models/Product");




// router.get("/random", async (req, res) => {
//   try {
//       let count = await Product.countDocuments();
//       let random = Math.floor(Math.random() * count);
//       let randomProducts = await Product.find().skip(random).limit(3);  
//       res.status(200).json(randomProducts);
//   } catch (err) {
//       res.status(500).json(err);
//   }
// });
// CREATE 
// here we create a new product to be on our menu
router.post('/create',verifyTokenAndAdmin, async (req,res)=>{ // only admins can create new products

    const newProduct = new Product(req.body); // here we used req.body as we don't need to apply anything on the properties unlike in register in auth we needed to encrypt the password property
    try{
    const savedProduct = await newProduct.save(); // save product in database
    res.status(201).json(savedProduct); // send the product in the response
    }catch(err){
        res.status(500).json(err);
    };
});

// UPDATE
// update product information by admins only
router.put("/update/:id", verifyTokenAndAdmin, async (req, res) => { // note: id parameter here is the product id not the user's id

  try {
    // here we find the product in the database by its id then update
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id,
      {
        
        $set: req.body, // we use $set: req.body to set all what is sent in req.body as the new values in database
      },
      { new: true }
    ); // {new:true} is used to make the function findByIdAndUpdate returns its result in variable updatedProduct

    res.status(200).json(updatedProduct); // here we respond by the updated product
  } catch (err) {
    res.status(500).json(err);
  };
});

// DELETE
// only admins can delete products
router.delete("/delete/:id", verifyTokenAndAdmin, async (req, res) => { // id parameter is the id of the product
  

  try {
    await Product.findByIdAndDelete(req.params.id); // here we delete the product using its id in parameter 
    res.status(200).json({ msg: "Product has been deleted" }); // we send a message for deletion
  } catch (err) {
    res.status(500).json(err);
  };
});

// GET PRODUCT BY ITS ID
// here anyone can get products even guest users so we don't need any middlewares
router.get("/find/:id", async (req, res) => {
  
  try {
    const product = await Product.findById(req.params.id); // here we find product in our database by its id
    res.status(200).json(product); // we send product in our response
  } catch (err) {
    res.status(500).json(err);
  };
});

// GET ALL PRODUCTS
// any user can see all products even guest users so we don't need any middlewares
router.get("/find", async (req, res) => {
  try {
    // here we put the property called new in req.query object in a variable called qNew
    const qNew = req.query.new;
    // here we put the property called category in req.query object in a variable called qCategory
    const qCategory = req.query.category;

    let products;
    // here if req.query.new and req.query.category so both are true then we will get only the last 5 products in the category specified in query
    if (qNew && qCategory) {
      products = await Product.find({ categories: { $in: [qCategory] } })
        .sort({ createdAt: -1 })
        .limit(5);
    }
    // here if req.query.new so if it is true then we will get only the last 5 created products as we sorted them descendingly according to their createdAt and then use .limit(5) to get only 5 of those sorted products
    else if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(5);
      // here if req.query.category so if it is true then we will get only the products which their categories field includes the category written in query
    } else if (qCategory) {
      products = await Product.find({ categories: { $in: [qCategory] } });
      // here all products 
    } else {
      products = await Product.find();
    }

    res.status(200).json(products); // send products in response
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
