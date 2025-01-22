const mongoose=require("mongoose");
const templateSchema = new mongoose.Schema({
    _id: String,
    username: String,
    data: String
});
const templateModel = mongoose.model("template", templateSchema);
module.exports=templateModel;