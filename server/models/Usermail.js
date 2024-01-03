const mongoose=require("mongoose");


const UserSchema=new mongoose.Schema(
    { 
        email:{type:String,required:true},
    },
    {timestamps:true}
)
const Useremail=mongoose.model("Useremail",UserSchema)
module.exports= Useremail