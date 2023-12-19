const mongoose=require("mongoose");
const NewGradeSchema=new mongoose.Schema(
    {
        weeks:[
            {
                week:{type:String,required:true},
                days:[
                    {
                        day:{type:String,required:true},
                        subject:[
                            {
                                subject:{type:String,required:true},
                                grade:[
                                   {type:Number,required:true},
                                ]
                            }
                        ]
                    }
                ]
            }
        ] 
    }
)
module.exports=mongoose.model("NewGrade",NewGradeSchema)