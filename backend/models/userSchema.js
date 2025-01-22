const mongoose=require("mongoose");
const Schema=new mongoose.Schema({
    _id:{
        required:true,
        type:Number
    },
    username:{
        type:String,
        unique:true,
        required:true
    },
    email:{
        require:true,
        unique:true,
        type:String
    }
    ,
    password:{
        require:true,
        type:String
    }
})
const model=mongoose.model('user',Schema);
module.exports=model;