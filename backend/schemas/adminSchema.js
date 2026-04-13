const mongoose=require("mongoose");
const adminSchema= new mongoose.Schema({
    name:{
    type:String,
    required:true,
    trim:true
    },
   
    password:{
        type:String,
        required:true,
        trim:true,
     min:8,
     max:16
    }
});
 
module.exports = mongoose.model("Admin", adminSchema);