// importing dependencies and functions

const express = require("express");
const app = express();
const connectDB = require("./config/connectDB");
require("dotenv").config();
const cors = require("cors");
app.use(express.json());

// 1- Creating the server
app.use(cors({ origin: "http://localhost:3000" }));
const PORT = process.env.PORT || 6000;

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`SERVER IS RUNNING ON PORT: ${PORT}`);
});

// 2- Connecting to database
connectDB();
// 3-connecting the routes

app.use("/api/users", require("./routes/user"));
app.use("/api/cafes", require("./routes/cafeRoute"));
app.use("/api/hotels", require("./routes/hotelRoute"));
app.use("/api/musees", require("./routes/museeRoute"));
app.use("/api/orders", require("./routes/orderRoute"));
