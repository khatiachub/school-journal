const express=require("express")
const app=express()
const mongoose = require("mongoose");
const dotenv = require("dotenv");


app.listen(5000,()=>{
    console.log("backend server is running");
})