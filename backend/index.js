const express=require("express");
const bodyParser=require("body-parser");
const mysql=require("mysql");
const app=express();
const cors=require("cors");
var jwt = require('jsonwebtoken');
const secret="mysecret@123";
const { default: mongoose, mongo } = require("mongoose");
const { type } = require("os");
const cookieParser = require('cookie-parser');
app.use(cookieParser());
mongoose.connect('mongodb://127.0.0.1:27017/resumeBuilder').then(()=>{
   console.log("connected");
}).catch((err)=>{
    console.log(err);
})

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

app.use(bodyParser.json());
app.use(cors({ 
    origin: 'http://localhost:3000', // Update to match the origin of your React app
    credentials: true // Enable the usage of cookies in CORS requests
}));
app.get("/getuser", (req, res) => {
    const id = req.cookies.userid;
    if (!id) {
        return res.status(401).send({ message: "No cookie found" });
    }
    try {
        const verified = jwt.verify(id, secret);
        if (!verified) {
            return res.status(401).send({ message: "Invalid token" });
        }
        res.status(200).send({ message: "success" });
    } catch (err) {
        console.error("JWT verification error:", err);
        res.status(500).send({ message: "Internal server error" });
    }
});

// app.get("/setuser",(req,res)=>{
//     const user=req.user;
//     return 
// });

app.post("/login",(req,res)=>{
    const m="hello";
    res.cookie("userid",m);
    const username=req.body.username;
    const password=req.body.password;
    // console.log(username,password);
    const user={
        username:username,
        password:password
    }
    model.find({username:username,password:password}).then((res1) => {
        if (res1.length > 0) {
            console.log("login successful");
            // const m="hellowwji";
            
            const id=jwt.sign(user,secret);
            res.cookie("userid",id);
            res.status(200).send({ message: "Login successful" });
        } else {
            console.log("hellp");
            res.status(401).send({ message: "Invalid username or password" });
        }
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send({ message: "Internal server error" });
    });
    
})
app.get("/save",(req,res)=>{
    res.send("hello");
})
app.get("/",(req,res)=>{
    res.hi="hello";
    res.send("hello");
})

app.listen("5000",function(){
    console.log("running ...");
})