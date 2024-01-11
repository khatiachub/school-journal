const mongoose=require("mongoose");


const UserSchema=new mongoose.Schema(
    { 
        name:{type:String,required:true},
        lastname:{type:String,required:true},
        email:{type:String,required:true, unique:true},
        privatenumber:{type:String,required:true, unique:true},
        status:{type:String,required:true},
        password:{type:String,required:true},
        confirmpassword:{type:String,required:true},
        verified:{type:Boolean,default:false},
        image:{type:String,required:false}
    },
    {timestamps:true}
)
const User=mongoose.model("User",UserSchema)
module.exports= User