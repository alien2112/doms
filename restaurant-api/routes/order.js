const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin, verifyTokenAndAuthorizationForCart} = require("../middlewares/verifyToken");
const CryptoJS = require("crypto-js");
const User = require("../models/User");
const { default: mongoose } = require("mongoose");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const Order = require("../models/Order");

// CREATE
// here we create a new order any logged in user can create an order so we used verifyToken middleware
router.post("/create", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body); // here we used req.body as we don't need to apply anything on the properties unlike in register in auth we needed to encrypt the password property
  try {
    const savedOrder = await newOrder.save(); // save order in database
    res.status(201).json(savedOrder); // send the order in the response
  } catch (err) {
    res.status(500).json(err);
  };
});

// UPDATE
// only admin can update order information that's why we used verifyTokenAndAdmin middleware function
router.put("/update/:id",verifyTokenAndAdmin,async (req, res) => {
    // note: id parameter here is the order id not the user's id

    try {
      // here we find the order in the database by its id then update
      const updatedOrder = await Order.findByIdAndUpdate(req.params.id,
        {
          $set: req.body, // we use $set: req.body to set all what is sent in req.body as the new values in database
        },
        { new: true }
      ); // {new:true} is used to make the function findByIdAndUpdate returns its result in variable updatedOrder

      res.status(200).json(updatedOrder); // here we respond by the updated order
    } catch (err) {
      res.status(500).json(err);
    };
  }
);

// DELETE
// delete order
// only admin can delete order from database we can't allow users to suddenly delete order from database that is not order cancellation as it won't notify us it will delete this order from database we can't give users this access
router.delete("/delete/:id", verifyTokenAndAdmin, async (req, res) => {
    // id parameter here is the id of the order

    try {
      await Order.findByIdAndDelete(req.params.id); // here we delete the order using its id in parameter
      res.status(200).json({ msg: "Order has been deleted" }); // we send a message for deletion
    } catch (err) {
      res.status(500).json(err);
    };
  }
);

// GET ORDERS BY USER'S ID
// here user can get his orders and also admin so we used authorization we made before verifyTokenAndAuthorization 
// as here the id is the user's id so we didn't need to make a special middleware for authorization in order
router.get("/find/:id",verifyTokenAndAuthorization,async (req, res) => {
    // note: id in id parameter is user's id we made it like this as there may be more than one order for one user so with the id of the user he gets all his orders like my orders page in websites
    try {
      const orders = await Order.find({userId: req.params.id}); // here we find all orders in our database which their userId property's value is req.params.id which is the id of the user
      res.status(200).json(orders); // we send orders in our response
    } catch (err) {
      res.status(500).json(err);
    };
  }
);

// GET ALL ORDERS
// only admin can get all orders so we used verifyTokenAndAdmin middleware
router.get("/find", verifyTokenAndAdmin, async (req, res) => {
  try {
    const query = req.query.new;
    const orders = query ? await Order.find().sort({createdAt: -1}).limit(5) : await Order.find(); // if query new we get last 5 orders if not we get all orders from database

    res.status(200).json(orders); // send all orders in response
  } catch (err) {
    res.status(500).json(err);
  };
});

// STATS
// get income for the last 2 months from today 
// remember: from today so if we are in day 15 of may it will give us the income of 15 days in may and income for all of april and income for the last 15 days of march not all march
router.get('/income',verifyTokenAndAdmin, async(req,res)=>{

    const date = new Date(); // new date of the exact date and time today
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1)) // here we make a new date that takes today's month minus 1 and put it as its month
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1)) // here in specifications of the new date of previous month we used new Date again to not use date which will affect lastMonth variable as we change in date object
                                                                                  // so we take the month of lastMonth variable minus 1 and put it as the month of our new date which gives us the previousMonth
    try{
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } }, // here get all orders where createdAt field is greater than previousMonth variable which carries the same day and year for today but 2 months ago
      { $project: { month: { $month: "$createdAt" }, sales: "$amount" } }, // here we make a new field in those orders called month which carries the month written in createdAt and a new field called sales which carries the amount in each order
      { $group: { _id: "$month", income: { $sum: "$sales" } } }, // here we group those documents by  month field we made and give each group income which has the sum of the group's sales
    ]);

    res.status(200).json(income); // we send the income in response

    }catch(err){
        res.status(500).json(err);
    };
    
});

module.exports = router;
