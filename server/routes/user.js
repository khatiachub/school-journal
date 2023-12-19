const User=require("../models/User")
const express=require("express");
const router=express.Router();
const jwt=require("jsonwebtoken")
const multer = require('multer');
const upload = multer();


router.post("/signup",upload.none(), async(req,res)=>{
    let {name,lastname,email,privatenumber,status,password,confirmpassword}=req.body
    console.log("Request body:", req.body);

    const newUser = new User({
          email,
          name,
          lastname,
          privatenumber,
          password,
          confirmpassword,
          status,
        //   password: CryptoJS.AES.encrypt(
        //     password,
        //     process.env.PASS_SEC
        //   ).toString(),
        });
      
        try {
          const user = await newUser.save();
          res.status(201).send(user)
        } catch (err) {
          res.status(500).json(err);
        }
  })


  router.post("/signin",async(req,res)=>{
    try {
      const user = await User.findOne({ email: req.body.email });
      !user && console.log("wrong email");
      console.log(req.body.email);

      if(user?.password!==req.body.password){
         return console.log("incorrect password");
      }

      const accessToken = jwt.sign(
        {
          id: user._id
        },
        process.env.JWT_SEC,
        {expiresIn:"10d"}
      );
  
      const { password, ...others } = user._doc;
      return res.status(200).json({...others, accessToken});
      
    } catch (err) {
      return res.status(500).json(err);
    }
});

  module.exports=router
