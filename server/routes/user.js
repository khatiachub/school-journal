const User=require("../models/User")
const express=require("express");
const router=express.Router();
const jwt=require("jsonwebtoken")
const Token = require("../models/Token");
const { verifyTokenAndAuthorization } = require("./verifyToken");
const sendEmail=require('./emailsend')
const crypto = require('crypto');
const Useremail = require("../models/Usermail");
const CryptoJS = require('crypto-js');
const multer = require('multer');




const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../images'); // Define the destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Define the filename for uploaded files
  },
});
const upload = multer({ storage });


router.post("/signup", async(req,res)=>{
    let {name,lastname,email,privatenumber,status,password,confirmpassword}=req.body
    console.log("Request body:", req.body);

    const newUser = new User({
          email,
          name,
          lastname,
          privatenumber,
          status,
          confirmpassword: CryptoJS.AES.encrypt(
            confirmpassword,
            process.env.PASS_SEC
          ).toString(),          
          password: CryptoJS.AES.encrypt(
            password,
            process.env.PASS_SEC
          ).toString(),
        });
      
        try {
          const user = await newUser.save();
          const token=new Token(
            {
              userId:user._id,
              token:crypto.randomBytes(16).toString("hex")
            }
          )
          
          await token.save()
          const url=`${process.env.BASE_URL}/${user._id}/verify/${token.token}`
          await sendEmail(user.email,"verify email",url)
          res.status(201).send({message:"Please verify email, link is sent to your account"})
        } catch (err) {
          console.error("Error sending verification email:", err);
          // res.status(500).json({ error: "Error sending verification email" });       
          res.status(500).json({
            error: "Internal Server Error",
            message: "An error occurred while sending verification email",
            details: err.message || "No specific error message available",
          }); 
        }
  })


  router.post("/signin",async(req,res)=>{
    try {
      const user = await User.findOne({ email: req.body.email });
      !user && console.log("wrong email");
      console.log(req.body.email);
      const hashedPassword = CryptoJS.AES.decrypt(
        user?.password,
        process.env.PASS_SEC
    );
  const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
  console.log(originalPassword);

      if(originalPassword!==req.body.password){
         return console.log("incorrect password");
      }

      const accessToken = jwt.sign(
        {
          id: user._id,
          status:user.status
        },
        process.env.JWT_SEC,
        // {expiresIn:"10h"}
      );
      const { password, ...others } = user._doc;
      if(!user.verified){
        const existingToken = await Token.findOne({ userId: user._id });
        if(existingToken){
          existingToken.updatedAt = new Date();
          await existingToken.save();
          const url = `${process.env.BASE_URL}/${user._id}/verify/${existingToken.token}`;
          await sendEmail(user.email, "verify email", url);
      
          return res.status(400).json({ message: "Verification email resent" });
        }else{
          const token=new Token(
            {
              userId:user._id,
              token:crypto.randomBytes(16).toString("hex")
            }
          )
          await token.save()
          console.log(token);
            const url=`${process.env.BASE_URL}/${user._id}/verify/${token.token}`
            await sendEmail(user.email,"verify email",url)
            return res.status(400).json({message:"Please verify email, link is sent to your account"})
        }
      }else{
        return res.status(200).json({...others,password, accessToken});
      }      
    } catch (err) {
      console.error('Error during sign-in:', err);

      return res.status(500).json(err);

    }
});
//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id",upload.single('image'), verifyTokenAndAuthorization, async (req, res) => {
  try {
    if (req.file) {
      // Save the file path to the user's profile photo field
      req.body.image = req.file.path;
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});
//delete profile image
router.delete("/:id/image", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json("avatar has been deleted...");
    if (!user.image) {
      return res.status(400).json("User does not have an image");
    }
    user.image = undefined;
    await user.save();

    return res.status(200).json("User image has been deleted...");

  } catch (err) {
    console.log(err);
  }
});

//change password

router.put('/changepassword/:id', verifyTokenAndAuthorization, async (req, res) => {
  const { id } = req.params;
  const { password, newPassword,confirmNewpassword } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC).toString(CryptoJS.enc.Utf8);
    if (password !== decryptedPassword) {
      return res.status(401).json({ error: 'Incorrect current password' });
    }
    if (newPassword !== confirmNewpassword) {
      return res.status(400).json({ error: 'New password and confirm password do not match' });
    }
    const encryptedNewPassword = CryptoJS.AES.encrypt(newPassword, process.env.PASS_SEC).toString();
    const encryptedNewConfirmPassword = CryptoJS.AES.encrypt(confirmNewpassword, process.env.PASS_SEC).toString();
    user.password= encryptedNewPassword;
    user.password=encryptedNewConfirmPassword;
    user.confirmpassword= encryptedNewPassword
    user.confirmpassword=encryptedNewConfirmPassword
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//recover password
router.post("/sendemail", async (req, res) => {
  try {
    let { email } = req.body;
    console.log(req.body.email);
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }  
    const newUser = await Useremail.findOneAndUpdate(
      { email },
      { $set: { email } },
      { upsert: true, new: true }
    );
   
    const accessToken = jwt.sign(
      {
        id: user._id
      },
      process.env.JWT_SEC,
      {expiresIn:"10m"}
    );
    const url = `${process.env.BASE_URL}/recoverpassword/${user._id}/${accessToken}`;
    await sendEmail(newUser.email, "Update Password", url);
    const userId=user._id
    if(email){
      return res.status(200).json({ message: "Password update email sent successfully",accessToken,userId });
    }
  } catch (err) {
    return res.status(500).json(err); 
  }
});

//verify email

router.get("/:id/verify/:token",async(req,res)=>{
  try{
    const token=await Token.findOne({
      token:req.params.token
    })
    if (!token) {
      console.error('Token not found');
      return res.status(400).send({ error: 'Invalid verification token' });
    }
   await User.updateOne({_id:token.userId},{$set:{verified:true}})
   console.log('success verified');
    return res.status(200).send({message:"Email verified successfully"}) 
  }catch(error){
    console.error('Failed to verify email:', error);
  return res.status(500).send({ error: 'Internal Server Error' });
  }
})

  module.exports=router
