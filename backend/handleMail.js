const nodemailer = require('nodemailer');
let t=new nodemailer.createTransport(
    {
        service:'gmail',
        auth:{
            user:"malishubham025@gmail.com",
            pass:process.env.gmail_pass
        }
    }
)
function SendMail(email,data){
    let options={
        from: 'malishubham025@gmail.com',
        to: email,
        subject: 'Your OTP Code',
        text: data,
    }
    t.sendMail(options,(err,res)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("gamil sent");
        }
    })
}
module.exports =SendMail;