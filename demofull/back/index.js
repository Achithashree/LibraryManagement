const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userDb =require("./db/db")
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Database Connected Successfully"))
.catch((err) => console.log(err));


app.post("/register", (req, res)=>{
   userDb.create(req.body)
   .then(user=>res.json(user))
   .catch(err=>res.status(400).json(err))
}
)
app.post("/login", (req, res)=>{
   userDb.findOne({username: req.body.username})
   .then(user=>res.json(user))
   .catch(err=>res.status(400).json(err))
})

app.listen(5000, () => {
    console.log("Server Started on Port 5000 🚀")
});