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
const { stringify } = require("querystring");

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
        // ,(err,user)=>{
            // if (err) return res.status(403).send({ message: "Invalid token" });
            // req.user = user;
            // console.log(req.user)
            res.status(200).send({ message: "success" });
            // next();
        // }
        
    } catch (err) {
        console.error("JWT verification error:", err);
        res.status(500).send({ message: "Internal server error" });
    }
});

// app.get("/setuser",(req,res)=>{
//     const user=req.user;
//     return 
// });
const templateSchema = new mongoose.Schema({
    _id: String,
    username: String,
    data: String
});
const templateModel = mongoose.model("template", templateSchema);
app.get("/profile",(req,res)=>{
    const user = jwt.decode(req.cookies.userid);
    console.log(user.username);
    templateModel.find(({username:user.username})).then((result)=>{
        // console.log(result.length);
        // req.data=result;
        res.status(200).send({message:"success",data:result});
    }).catch((err)=>{
        res.status(401).send({message:"unable to access"});
    })
})
const ResumeSnapshotSchema = new mongoose.Schema({
    
    image: {
      type: String, // Storing the image as a base64 string
      required: true,
    }
    
  });
  const ResumeSnapshot = mongoose.model('ResumeSnapshot', ResumeSnapshotSchema);
app.post('/checkuser', async (req, res) => {
        let user=jwt.decode(req.body.user);
        console.log(user);
        let username=user.username;
        let id=req.body.template;
        console.log(username+id);
        templateModel.findOne({ _id: username+id, username: username }).then((result) => {
            if (result) {
                // Update existing document
                // console.log("already saved");
                res.status(200).send({ message: true,result:result });

              
            } 
            else{
                res.status(200).send({ message: false });
            }
            
        }).catch((err) => {
            console.log(err);
            res.status(500).send({ message: "An error occurred while checking the template" });
        });
        // res.status(200).send({ message: "Template updated successfully" });
  });
  
app.post("/signout",(req,res)=>{
        try{
        res.clearCookie("userid");
        res.status(200).send("signout");
        }
        catch(err){
            res.status(401).send("signout");
        }

})
app.post("/saveTemplate", (req, res) => {
    try {
        const user = jwt.decode(req.cookies.userid);
        const id = req.body.templateid;
        const data = req.body.templatedata;
        const username = user.username;

        templateModel.findOne({ _id: username+id, username: username }).then((result) => {
            if (result) {
                // Update existing document
                console.log("already saved");
                templateModel.updateOne({ _id: username+id, username: username }, { $set: { data: data } }).then(() => {
                    res.status(200).send({ message: "Template updated successfully" });
                }).catch((err) => {
                    console.log(err);
                    res.status(500).send({ message: "An error occurred while updating the template" });
                });
            } else {
                // Insert new document
                const entry = new templateModel({
                    _id: username+id,
                    username: username,
                    data: data
                });

                entry.save().then(() => {
                    res.status(200).send({ message: "Template saved successfully" });
                }).catch((err) => {
                    console.log(err);
                    res.status(500).send({ message: "An error occurred while saving the template" });
                });
            }
        }).catch((err) => {
            console.log(err);
            res.status(500).send({ message: "An error occurred while checking the template" });
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "An error occurred" });
    }
});
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
app.post("/signup", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    // console.log(req.body);
    // // Create a new instance of the model
    const newUser = new model({
        _id: new Date().getTime(),  // Use a timestamp as an example unique ID
        username: username,
        password: password, // You should hash this password before saving
        email: email
    });

    // Save the new user instance
    newUser.save()
        .then(() => {
            console.log("Signup successful");

            // Sign the JWT token with the user info (excluding password for security)
            const id = jwt.sign({ username: newUser.username }, secret);

            // Set the JWT token as a cookie
            res.cookie("userid", id, { httpOnly: true, secure: true });

            res.status(200).send({ message: "Signup successful" });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send({ message: "Internal server error" });
        });
});


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