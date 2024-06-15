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

    //     fetch("http://localhost:5000/login", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(user)
    //     })
    //     .then((res) => {
    //         if (!res.ok) {
    //             navigate("/login");
    //         } else {
    //             navigate("/home");
    //         }
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });

    //     setUser({
    //         username: "",
    //         password: ""
    //     });
    // }
    axios.post('http://localhost:5000/login', user,{withCredentials:true})
    .then(res => {
                    if (res.status==200) {
                       
                    // } else {
                        navigate("/home");
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
        navigate("/");
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

    return (
        <div>
            <form onSubmit={handleLogin}>
                <input 
                    type="text" 
                    placeholder="username" 
                    name="username" 
                    onChange={handleUser} 
                    value={user.username} 
                />
                <input 
                    type="password" 
                    placeholder="password" 
                    name="password" 
                    onChange={handleUser} 
                    value={user.password} 
                />
                <input type="submit" />
            </form>
        </div>
    );
}

export default Login;
