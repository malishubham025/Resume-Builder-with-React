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
                    if (res.status==200) {
                       
                    // } else {
                        navigate("/");
                    setUser({
                        username: "",
                        password: ""
                    });
                    }
    })
    .catch(err => {
        if (err.response && err.response.status === 401) {
                alert("hi");
                setUser({
            username: "",
            password: ""
        });
        navigate("/signup");
    }
      console.log(err);
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
            <button type="submit" onClick={handleSubmit}>Submit</button>
            <Link to="/login">login</Link>
            </form>
        </div>
    )
}
export default SignUP;