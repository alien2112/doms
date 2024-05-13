// here is the first model in our database for user
const mongoose = require('mongoose');
const { type } = require('os');

// schema for users
const UserSchema = new mongoose.Schema(

    {
        username: {type: String, required: true, unique: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        phonenumber: {type: String, required: true, unique: true},
        isAdmin: {type: Boolean, default: false},
    },

    {timestamps: true}, // to show us when the document created at and updated at instead of using created at and updated at

);
// here we export mongoose model we write our model name then the schema as parameters for mongoose.model()
module.exports = mongoose.model('User',UserSchema); 