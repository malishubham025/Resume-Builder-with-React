import axios from "axios";
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function AllResume(){
//    alert("hi");
   const [resume,setResume]=React.useState({
    data:""
});
useEffect(()=>{
    console.log("hi");
    axios.get("http://localhost:5000/profile").then((res)=>{
        if(res.status===200){
            const x=res.data.data
            setResume(x)
            // console.log(resume);
            // document.querySelector(".userresumes").innerHTML=resume[0].data;
            // resume.map((data)=>{
            //     document.querySelector(".userresumes").innerHTML=data.data;
            // })
        }
        else{
            alert("error !");
        }
    })
},[])

    return(
        <div className="userresumes">
            {resume.length > 0 ? (
                resume.map((data, index) => (
                    <div>
                    <div key={index} dangerouslySetInnerHTML={{ __html: data.data }} />
                    <button>Edit this </button>
                    </div>
                ))
            ) : (
                <div>
                <h1>No resume Found !</h1>
                <h6>Save the resume first ...</h6>
                </div>
            )}
            {/* {resume.length>0?resume.map((data)=>{return data.data}):<h1>loading</h1>} */}
        </div>
    )
}
function Profile(props){
    const navigate = useNavigate();
    function signout(){
        // alert("hi");
        axios.post("http://localhost:5000/signout").then((res)=>{
            if(res.status===200){
                alert("log out successfully");
                <Navigate to="/" />
            }
            else{
                alert("error !");
            }
        })
    }

    function profile() {
        console.log("hello");
        navigate("/allresume");
    }
    
    return(
        <div style={{position:"relative",right:"30px"}}>
        <div className="profile">
        <h6 onClick={profile} style={{cursor:"pointer"}}>{props.name}</h6>
        {/* <img src="" alt="" /> */}
        <img  src={"../images/user.png"} className="userimg" alt="" />
        <button onClick={signout} style={{cursor:"pointer"}}>signout</button>
        </div>
        </div>
    )
}
export  {Profile,AllResume};