import React from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
axios.defaults.withCredentials=true;
function Login() {
    const [user, setUser] = React.useState({
        username: "",
        password: ""
    });

    const navigate = useNavigate();

    function handleLogin(event) {
        event.preventDefault();

    
    axios.post('http://localhost:5000/login', user,{withCredentials:true})
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
                alert("credentials does not exist");
                setUser({
            username: "",
            password: ""
        });
        navigate("/login");
    }
      console.log(err);
    });

}
    function handleUser(event) {
        const { name, value } = event.target;
        setUser(prevValue => ({
            ...prevValue,
            [name]: value
        }));
    }
    function handleSignUP(event){
        navigate("/signup");
    }
    return (
        <div className="login-div">
            
            <form className="login-form" onSubmit={handleLogin}>
            <h1>Login</h1>
            {/* <button></button> */}
                <input 
                    type="text" 
                    placeholder="username" 
                    name="username" 
                    onChange={handleUser} 
                    value={user.username} 
                />
                <br />
                <input 
                    type="password" 
                    placeholder="password" 
                    name="password" 
                    onChange={handleUser} 
                    value={user.password} 
                />
                <br />
                <a href="/signup">Signup</a>
                <br />
                <button type="submit" className="login-button"> Submit</button>
            </form>
        </div>
    );
}

export default Login;
