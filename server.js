//dotenv file to encode password
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose")
const cors = require('cors')
const { Router } = require('express')

const app = express()
const port = process.env.PORT || 3000;
const connStr = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@generalassembly.odxzs.mongodb.net`;

//express use
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.options('/stock/saved/:id', cors())
app.use(cors({
  origin: '*'
}));


//extension of stock routes
const stockRoutes = require('./routers/stock_routes')
app.use('/stock', stockRoutes)

//extension of user routes
const userRoutes = require('./routers/user_routes')
app.use('/user', userRoutes)

//listening port
app.listen(port, async () => {
    try {
      await mongoose.connect(connStr, { dbName: "I-Bull" });
    } catch (err) {
      console.log(err);
      console.log(`Failed to connect to DB`);
      process.exit(1);
    }
    console.log("Connected to DB");
    console.log(`Example app listening on port ${port}`);
  });
  