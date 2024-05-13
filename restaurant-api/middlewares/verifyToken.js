const jwt = require('jsonwebtoken');
const { findById } = require('../models/User');
const Cart = require("../models/Cart");
const { default: mongoose } = require("mongoose");



// middleware function to verify if there is a token or not and if this token is valid and really verified from jwt that this is a token and this is the advantage of jwt the security
const verifyToken = (req,res,next)=>{
    // the token is in the header of the request
    const authToken = req.headers.token;
    // if there is a token
    if(authToken){
        // in the token there is Bearer then space then the token we need so we split req.headers.token by space and choose index one [1] to have the token only
        const token = authToken.split(" ")[1];
        // we verify the token
        jwt.verify(token,process.env.JWT_KEY,(err,user)=>{
            if(err){ // if token is not valid
                res.status(403).json({msg: "this token is invalid!"});
            };
            // if token is valid
            req.user = user; // user that is a parameter in the callback function that is the properties in token that we put when we used sign() function to apply jwt after logging in
            next();
        });

    }
    // if there isn't a token
    else{
     return res.status(401).json({ msg: "you are not authenticated!"});
    };

};

// middleware function that contains the verifyToken function in addition to comparing the user's id in token with the id in the parameter object (in the link) 
// to make sure that the one that is trying to do somrthing with that id has the same id in the token 
const verifyTokenAndAuthorization = (req,res,next) =>{

    verifyToken(req,res,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){ // if has the same id or if they are an admin which is found as a property in their token
            next(); // apply the next router or middleware
        }
        else{ // if the id in token is not the id in link which means that you are using different account to access somethin in another account with another id
            res.status(403).json({ msg: "you are not allowed to do that!"}); // we don't need return here as in middle ware it will stop if we don't have next()
        };
    });

};
// here we made a middleware function to verify token then check if admin so next() if not we send a message saying you are not allowed to do that
const verifyTokenAndAdmin = (req,res,next)=>{

    verifyToken(req,res,()=>{

        if(req.user.isAdmin){
            next();
        }
        else{
            res.status(403).json({ msg: "you are not allowed to do that!"});
        };
    });
};


// here we made a middleware function to verify token then authorize it but for cart
// it is identical to verifyTokenAndAuthorization but we had a problem as verifyTokenAndAuthorization compare req.params.id with req.user.id 
// but req.params.id in cart routers is the id of the cart so it will compare the id of the cart with the id of the user in token
// so we replaced it by this middleware function
const verifyTokenAndAuthorizationForCart = (req,res,next)=>{

    verifyToken(req,res, async()=>{
        const cart = await Cart.findById(req.params.id); // here we find the cart by its id from the database
        if(cart.userId==req.user.id || req.user.isAdmin){ // if cart.userId equals req.user.id or if its an admin 
            next();
        }
        else{
            res.status(403).json({ msg: "you are not allowed to do that!" });
        };
    });
};




module.exports = {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin,verifyTokenAndAuthorizationForCart};