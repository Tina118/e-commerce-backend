const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/dbconfig");
const cors = require('cors');
const authRouter = require("../routes/auth.router");
const productsRouter = require("../routes/products.router");
const orderRouter = require("../routes/order.router");
const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:4200"
}));
connectDB();
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/api/auth", authRouter);
app.use("/api", productsRouter);
app.use("/api", orderRouter);
const port = 5000; // Change the port number if needed
mongoose.connection.once("open", () => {
  console.log("Connected to DB");
  app.listen(port, () => {
    console.log("Server is up and running");
  });
});
//# sourceMappingURL=index.js.map