const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://shubham:mali@cluster0.u02oy.mongodb.net/").then(()=>{
    console.log("connected !");
}).catch((err)=>{
    console.log(err);
})