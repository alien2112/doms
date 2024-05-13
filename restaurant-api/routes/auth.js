const express = require("express");
const router = express.Router();
// User model
const User = require('../models/User');
// library for encryption
const CryptoJS = require("crypto-js");
// import JWT library
const jwt = require("jsonwebtoken");


// REGISTER
router.post('/register',async (req,res)=>{
  // here we used async await as Save() function is a promisified asynchronous function

  if (!req.body.username) {
    return res.status(400).json({ msg: "username field is required" });
  };
  if (!req.body.email) {
    return res.status(400).json({ msg: "username field is required" });
  };
  if (!req.body.password) {
    return res.status(400).json({ msg: "password field is required" });
  };
  if (!req.body.phonenumber) {
    return res.status(400).json({ msg: "phonenumber field is required" });
  };
  if(req.body.password.length<6){
    return res.status(400).json({ msg: "password should be at least 6 characters long"})
  }
  // here we create a new instance of User model
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.DEC_PASSWORD_KEY
    ).toString(), // here we encrypted the password the user entered so it won't be shown at the database when we save that user in our database as we don't want whoever opens our database see the passwords of our users instead a hashed code will be shown
    phonenumber: req.body.phonenumber,
  });
  // we use try catch in every async await
  try {
    // here we saved our new user in the database using .save() function then we sent that user in the response without the password for security reasons
    const savedUser = await newUser.save();
    const {password, ...others} = savedUser._doc
    res.status(201).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN
router.post('/login', async (req,res)=>{
  // we used async await as we search in the database (asynchronous as it takes time) using findOne() function
  
  if(!req.body.username){
    return res.status(400).json({msg: "username field is required"})
  };
  if(!req.body.password){
    return res.status(400).json({msg: "password field is required"})
  };

  try {
    // here we will search in our database in the User model if there is a user with username property that carries the same value of the username sent in request
    // if we find that then put this user in variable user so if the user entered a correct username a user from database will be in the user variable
    const user = await User.findOne({ username: req.body.username });
    // if user variable is null so there is no user with the username sent in the request
    if (!user) {
      return res.status(401).json({ msg: "Wrong Username, please try again" });
    };
    // if user variable is not null so we need to compare the password in the request with the one in user variable
    // here we decrypt the password in user variable which is encrypted in our database in order to compare it with the one sent in the request
    const originalPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.DEC_PASSWORD_KEY
    ).toString(CryptoJS.enc.Utf8);
    // compare passwords
    if (originalPassword !== req.body.password) {
      return res.status(500).json({ msg: "Wrong Password, please try again" });
    };
    // here we made access token for the user that successfully logged in so we can monitor this user and give him the right access
    const accessToken = jwt.sign({
      id: user._id,
      isAdmin: user.isAdmin
      },
      process.env.JWT_KEY,
      {expiresIn: "3d"}
  );
    // if username is correct and password is correct too so we send the user but we don't want to send the password property that is in the user
    // so we made that object to separate password from the other properties
    const { password, ...others } = user._doc; // we used user._doc as user in database contains a lot of other things that will be saved in our property (others) so we need the properties only which are located in _doc they will be saved in others property which we will send in response
    res.status(200).json({...others,accessToken}); 
  } catch (err) {
    res.status(500).json(err);
  }


});






module.exports = router;
