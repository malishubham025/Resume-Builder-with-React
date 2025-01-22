import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { GoogleOAuthProvider,useGoogleLogin } from "@react-oauth/google";

import axios from 'axios';
function SignUP(){
    const navigate = useNavigate();
    const [user,setUser]=React.useState({
        email:"",
        password:"",
        username:""
    })
    const [otp,setOtp]=React.useState({
        one:"",
        two:"",
        three:"",
        four:""
    })
    function handleOtp(event) {
        const { name, value } = event.target; // Destructure 'name' and 'value' from event.target
        setOtp((prevValue) => {
            return {
                ...prevValue,
                [name]: value, // Use computed property syntax to update the correct field
            };
        });
    }
    
    function handleChange(event){

        const { name, value } = event.target;
        setUser(prevValue => ({
            ...prevValue,
            [name]: value
        }));
        console.log(user);
    }
    function verifyOtp(event){
        let userotp=otp.one+otp.two+otp.three+otp.four;
        // console.log(userotp);
        axios.post('http://localhost:5000/signup', {user,userotp},{withCredentials:true})
        .then(res => {
            if (res.status===200) {
                alert("signup successfull !");
                document.querySelector(".otp-container").classList.add("not-visible");
                setUser({
                    email:"",
                    password:"",
                    username:""
                });
                navigate("/");
            }
        })
        .catch(err => {
            if(err.response.status===409){
    
                alert("Wrong otp !");
                
            }
            if (err.response && err.response.status === 401) {
                    alert("error occured !");
                    setUser({
                        email:"",
                        password:"",
                        username:""
            });
            navigate("/signup");
        }
        //   console.log(err);
        });
        event.preventDefault();
    }
    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:5000/send-otp', user,{withCredentials:true})
        .then(res => {
            if (res.status===200) {
                alert("Otp sent successfully !");
                document.querySelector(".otp-container").classList.remove("not-visible");
            }
        })
        .catch(err => {
            if(err.response.status===409){
    
                alert("username or email exist !");
                setUser({
                    email:"",
                    password:"",
                    username:""
        });
            }
            if (err.response && err.response.status === 401) {
                    alert("error occured !");
                    setUser({
                        email:"",
                        password:"",
                        username:""
            });
            navigate("/signup");
        }
        //   console.log(err);
        });
    



}
    return (
        <div className="login-div">

            <form onSubmit={handleSubmit} className="login-form" >
            <h3>New User ? </h3>
            <input onChange={handleChange} type="text" name="username" placeholder="username" required="true"/>
            <br />
            <input onChange={handleChange} type="email" name="email" placeholder="email" required="true"/>
            <br />
            <input onChange={handleChange} type="password" name="password" placeholder="password" required="true"/>
            <br />
            {/* <input placeholder="submit" /> */}
            <button type="submit" onClick={handleSubmit} className="login-button">Submit</button>
            <div class="otp-container not-visible">
                <div id="inputs" class="inputs">
                    {/* <form action=""> */}
                    <input onChange={handleOtp} class="input" type="text" 
                        inputmode="numeric" maxlength="1" name="one"/>
                    <input onChange={handleOtp} class="input" type="text" 
                        inputmode="numeric" maxlength="1"  name="two"/>
                    <input onChange={handleOtp} class="input" type="text" 
                        inputmode="numeric" maxlength="1" name="three"/>
                    <input onChange={handleOtp} class="input" type="text" 
                        inputmode="numeric" maxlength="1" name="four"/>
                        
                    {/* </form> */}
                </div>
                <button onClick={verifyOtp}>Verify OTP</button>
            </div>
            <Link to="/login">login</Link>
            </form>

        </div>
    )
}
export default SignUP;