const mongoose=require("mongoose");
const GradeSchema=new mongoose.Schema(
    {
        name:{type:String,required:true},
        privatenumber:{type:Number,required:true},
        subjects:[
            {
                subject:{type:String,required:true},
                grades:[
                    {
                        date:{type:Date,required:true},
                        grade:{type:Number,required:false},
                        attendance:{type:Boolean,required:true},
                    }
                ]
            }
        ] 
    }
)
module.exports=mongoose.model("Grade",GradeSchema)