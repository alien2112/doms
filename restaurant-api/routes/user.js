const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const CryptoJS = require("crypto-js");
const User = require("../models/User");
const { default: mongoose } = require("mongoose");



// UPDATE 
// update user information (username-password-phonenumber)
router.put('/update/:id',verifyTokenAndAuthorization, async (req,res)=>{ // here we used this middleware function to verify that there is a token then is it valid then check its authorization is the id in the token is the same id in the parameter(in the link) or someone with different account trying to change the information of another account

    if(req.body.password){ // if user changing the password so another password is sent in the request

        if(req.body.password.length<6){ // we check if the new password is at least 6 characters long
           return res.status(400).json({ msg: "password should be at least 6 characters long"});
        };
       // we encrypt the new password sent in the request
       req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.DEC_PASSWORD_KEY).toString();
        
    };

    try{
    // here we find the user in the database by its id then update
    const updatedUser = await User.findByIdAndUpdate(req.params.id,{ // we could've not used req.user.id however that the id in both token and parameter is the same the one who is may be updating info is the admin so here will update his own info not the user's info
        $set: req.body // we use $set: req.body to set all what is sent in req.body as the new values in database
    },{new:true}); // {new:true} is used to make the function findByIdAndUpdate returns its result in variable updatedUser

    res.status(200).json(updatedUser); // here we respond by the updated user

    }catch(err){
        res.status(500).json(err);
    };

});


// DELETE
// users can delete their accounts also admin can delete any user
router.delete('/delete/:id',verifyTokenAndAuthorization, async (req,res)=>{ // we used verifyTokenAndAuthorization middleware function

    try{
        await User.findByIdAndDelete(req.params.id); // here we delete the user using their id in parameter and like updating we can't use req.user.id as it may be the admin who is deleting the account of the user so the admin will delete itself not the user
        res.status(200).json({ msg: "Account has been deleted"});

    }catch(err){
        res.status(500).json(err);
    };
});


// GET USER BY ID
// here only the admin can get any user
router.get('/find/:id',verifyTokenAndAdmin, async (req,res)=>{ // we used verifyTokenAndAdmin middleware function so only the admin can get any user by their id
    try{
       const user = await User.findById(req.params.id);
       const{password, ...others} = user._doc; // admin will get the user's info except the password of the user 

       res.status(200).json(others);


    }catch(err){
        res.status(500).json(err);
    };
});

// GET ALL USERS
router.get('/find',verifyTokenAndAdmin, async (req,res)=>{

    try{
    // here we put the property called new in req.query object in a variable called query
    const query = req.query.new;
    // here if req.query.new so if it is true then we will get only the last 5 users that registered as we sorted them descendingly according to their id in mongoDB which mongoDB puts timestamp in this id so they are sorted according to their creation time descendingly and then use .limit(5) to get only 5 of those sorted users
    const users = query ? await User.find().sort({_id: -1}).limit(5) : await User.find();
    // here we mapped on users array of objects that carries all users or last 5 users to make another array of objects that carries them without their passwords
    const usersWithoutPassword = users.map((user)=>{
        const {password, ...others} = user._doc;
        return others;
    });
    res.status(200).json(usersWithoutPassword);

    }catch(err){
        res.status(500).json(err);
    };
});

// GET STATS
// here we get how many users registered each month
router.get('/stats', async(req,res)=>{
   const date = new Date; // we made a date object which carries the current date and time
   // here we used the date we made that carries current date and time and get its year - 1 so the year before and sat it as its year and those specifications are done in the new object of Date that is assigned to lastYear variable
   // so now this lastYear variable will carry the date and time of one year before and this continues so in 2026 it will be 2025 in 2027 it will be 2026 and so on
   const lastYear = new Date(date.setFullYear(date.getFullYear() - 1)); 
    
   try{
   const data = await User.aggregate([ // here we used aggregate function which allows us to process data records and return computed results instead of the documents 
    {$match: {createdAt:{$gte: lastYear }}}, // here $match allows us to put a condition so we want the documents which createdAt field's value is greater than last year to get only the stats of a one year
    {$project: {month:{$month: "$createdAt"}}}, // here $project allows us to include,exclude and compute new fields so here we compute a new field called month which carries the month of createdAt field in each document
    {$group: {_id: "$month", total:{$sum: 1}}} // here $group allows us to group documents by a field so we grouped our documents by the new field we made month with the grouping key _id that will also represents the month number (september=9) then we used $sum to give us the total in each group and the value 1 in $sum: 1 is the value representing each document if we wrote 2 instead then each document will count as 2 so we multiply the total
   ]);
   res.status(200).json(data); // respond with this data
    }catch(err){
        res.status(500).json(err);
    };
});





module.exports = router;