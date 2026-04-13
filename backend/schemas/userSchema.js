const mongoose=require("mongoose")

const createSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
       
    },
    password:{
        type:String,
        required:true,
        trim:true,
     min:8,
     max:16
    }
}
,{
    timestamps:true
})

module.exports=mongoose.model("User",createSchema)