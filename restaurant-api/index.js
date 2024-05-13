const express = require("express");
const app = express();
const mongoose = require("mongoose");
// dotenv library to keep our secret keys like the mongoDB url for our database 
const dotenv = require("dotenv");
const cors = require("cors")
app.use(cors())
// configuration for the library
dotenv.config();

// here we connect our MONGO database
mongoose
  .connect(process.env.MONGO_URL) // we replaced the url for mongo database by MONGO_URL in our .env file to keep it safe so no stranger can access it
  .then(()=> console.log("Database connected succesfully!"))
  .catch((err)=>console.log(`Error: ${err}`));

app.listen(5000,()=>console.log("server assigned to port 5000!"));

// middleware to send json 
const { json } = require("body-parser");
app.use(json());

const auth = require("./routes/auth");
app.use('/api/v1/auth',auth);

const user = require("./routes/user");
app.use("/api/v1/users",user);

const product = require("./routes/product");
app.use('/api/v1/products',product);

const cart = require("./routes/cart");
app.use("/api/v1/carts", cart);

const order = require("./routes/order");
app.use("/api/v1/orders", order);


  