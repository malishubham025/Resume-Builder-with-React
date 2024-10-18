import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
function SignUP(){
    const navigate = useNavigate();
    const [user,setUser]=React.useState({
        email:"",
        password:"",
        username:""
    })
    function handleChange(event){

        const { name, value } = event.target;
        setUser(prevValue => ({
            ...prevValue,
            [name]: value
        }));
        console.log(user);
    }
    function handleSubmit(event) {
        event.preventDefault();

    
    axios.post('http://localhost:5000/signup', user,{withCredentials:true})
    .then(res => {
            // if (res.status==409) {
                        
            //     // } else {
            //     alert("email or username  exists");
            //     setUser({
            //         email:"",
            //         password:"",
            //         username:""
            //     });
            // }
                    if (res.status==200) {
                       
                    // } else {
                        navigate("/");
                    setUser({
                        email:"",
                        password:"",
                        username:""
                    });
                    }
    })
    .catch(err => {
        if(err.response.status==409){

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
            <Link to="/login">login</Link>
            </form>
        </div>
    )
}
export default SignUP;