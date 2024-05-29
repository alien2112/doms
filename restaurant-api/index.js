const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
app.use(cors());
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connected successfully!"))
  .catch((err) => console.log(`Error: ${err}`));

const { json } = require("body-parser");
app.use(json());

const auth = require("./routes/auth");
app.use('/api/v1/auth', auth);

const user = require("./routes/user");
app.use("/api/v1/users", user);

const product = require("./routes/product");
app.use('/api/v1/products', product);

const cart = require("./routes/cart");
app.use("/api/v1/carts", cart);

const order = require("./routes/order");
app.use("/api/v1/orders", order);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}!`));

module.exports = app;
