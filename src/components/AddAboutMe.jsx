import React from "react";
import ResumeContext from "../Contexts/ResumeContext";
import { produce } from "immer";
function AboutMe(props){
    let {resume,setResume}=React.useContext(ResumeContext);
    const [info,setInfo]=React.useState("");
    function handleChange(event){
        let info=event.target.value;
        setInfo(info);
    }
    function handleSubmit(event){
        if(props.AboutMe){
            // console.log("ji");
            setResume((pvalue)=>{
                return produce(pvalue,(draft)=>{
                    draft.about_me.push(info);
                })
            })
        }
        else{
            setResume((pvalue)=>{
                return produce(pvalue,(draft)=>{
                    draft.achievements.push(info);
                })
            })
        }
        setInfo("");
        event.preventDefault();
    }
    return(
        <form >
            <textarea onChange={handleChange} value={info} name="info"  id=""></textarea>
            <button onClick={handleSubmit}>{props.AboutMe?"Add About Me":"Add Achievements"}</button>
        </form>
    )
}
export default AboutMe;