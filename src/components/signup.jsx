import React from "react";
import { Link } from "react-router-dom";
function SignUP(){
    return (<div>
            <h3>New User ? </h3>
            <input type="text" placeholder="username"/>
            <input type="email" placeholder="email"/>
            <input type="password" placeholder="password"/>
            <input type="submit" placeholder="submit" />
            <Link to="/"><h1>login</h1></Link>
        </div>
    )
}
export default SignUP;