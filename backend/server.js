const express = require("express");  //    this is a package  it lets you to do the line no 10  means let you call the function
const cors = require("cors");    //frontend and backend communication 

require("dotenv").config();   //load the environment variables into node.js  from .env 

const db = require("./config/db");   

const authRoutes = require("./routes/authRoutes");

const watchListRoutes = require("./routes/watchListRoutes");

const app = express();   //this creates server object

//Now what this app can do go to the documentation of notes.md

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://movie-watchlist-app-khaki.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);   //register cors middleware allow req from frontend

app.use(express.json());   //registr json middleware see docum

app.use("/api/auth",authRoutes);

app.get("/",(req,res)=>{
    res.send("API is Running")  //this is just a simple check when browser visits the website 
});

app.use("/api/watchlist",watchListRoutes);


// app.post("/test",(req,res)=>{
//     console.log("TEST HIT");
//     res.send("working");
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{                                        //most important line Start the server after this line server starts listning requests 
    console.log(`Server Running on Port ${PORT}`);
})






