import React from "react";
import { produce } from "immer";
import Download from "./download";
import { useRef } from "react";
import axios from "axios";
import Form from "./AddProjectForm";
import { Navigate,useLocation } from "react-router-dom";
import ResumeContext from "../Contexts/ResumeContext";
import AddEducation from "./AddEducation";
import AboutMe from "./AddAboutMe";
import {AddList,HandleContact} from "./SoftHardSkills";
function FirstResume(){
    const location = useLocation();
    const [edit,setEdit]=React.useState(false);
    const pdfRef=useRef();
    let { resumeData } =  {}; 
    if(location && location.state){
        resumeData=location.state;
        // console.log(resumeData.data);
        
    }
    
    
    // console.log(typeof JSON.parse(resumeData));
    let {resume,setResume}=React.useContext(ResumeContext);
    resume=resumeData && resumeData.data?JSON.parse(resumeData.data):resume;
    function handleName(data){
        let name=data.name;
        let role=data.role;
        setResume((pvalue)=>{
            return produce(pvalue,(draft)=>{
                if(name)
                draft.name.name=name;
                if(role)
                draft.name.role=role
            })
        })
        // console.log(name,role);
    }
    function handleEdit(){
        setEdit(!edit);
    }
    function handleSkills(data){
        let index=data.index;
        const newSkill = data.data?.name; 
        console.log(newSkill,newSkill.length);
        setResume((prevResume) => {
            return produce(prevResume, (draft) => {
                    if(newSkill.length===1 && newSkill[0]==='\n' || newSkill.length===0){
                        draft.skills.splice(index,1);
                    }
                    else{
                            draft.skills[index]=newSkill;
                    }
                
            });
        });
        // console.log(data);
    }
    function handleContact(data){
        // console.log(data);
        let index=data.index;
        
        let name=data.data.name;
        let link=data.data.link;
        setResume((pvalue)=>{
            
            return produce(pvalue,(draft)=>{

                if(name.length===1 && name[0]==='\n' || name.length===0){
                    draft.my_contact.splice(index,1);
                }
                else{
                    draft.my_contact[index].name=name;
                    draft.my_contact[index].link=link;
                }
                })
            
        })
        

    }
    function handleSoftSkills(data){
        let index = data.index;
        let newSkill = data.data.name;
        setResume((pvalue) => {
            return produce(pvalue, (draft) => {
                // draft.soft_skills[index] = d;
                if(newSkill.length===1 && newSkill[0]==='\n' || newSkill.length===0){
                    draft.soft_skills.splice(index,1);
                }
                else{
                    draft.soft_skills[index]=newSkill;
                }
            });
        });
    }
    function handleEducation(data){
        let index = data.index;
        let name = data.data.name;
        let info = data.data.info;
        let percentage = data.data.percentage;
        setResume((pvalue) => {
            return produce(pvalue, (draft) => {

 
                if(name)
                    draft.education[index].name = name;

                if(info)
                    draft.education[index].info = info;
                if(percentage)
                    draft.education[index].percentage = percentage;
            });
        });
    }
    function handleAboutMe(data){
        let index = data.index;
        let info = data.info;
        setResume((pvalue) => {
            return produce(pvalue, (draft) => {
                
                if(info)
                    draft.about_me[index] = info;  // Changed from education to about_me
            });
        });
    }
    function handleExperience(data) {
        const { index, name, year, some_info, responsibilities } = data;
        // console.log(index,responsibilities,responsibilities.data.length);
        setResume((pvalue) =>
            produce(pvalue, (draft) => {
                if (name) draft.experience[index].name = name;
                if (year) draft.experience[index].year = year;
                if (some_info) draft.experience[index].some_info = some_info;
                
                if (responsibilities && responsibilities.index >= 0 && responsibilities.index < draft.experience[index].responsibilities.length) {
                    draft.experience[index].responsibilities[responsibilities.index] = responsibilities.data;
                } else if (responsibilities && responsibilities.index === draft.experience[index].responsibilities.length) {
                    // Optional: Add new responsibilities if the index is equal to the current length
                    draft.experience[index].responsibilities.push(responsibilities.data);
                } else if (responsibilities) {
                    console.error(`Invalid responsibilities index: ${responsibilities.index}`);
                }
                if(responsibilities.data.length==1 && responsibilities.data[0]==='\n' || responsibilities.data.length==0){
                    console.log("jo");
                    draft.experience[index].responsibilities.splice(responsibilities.index,1);
                }
            })
        );
    }
    
    function handleProjects(data) {
        const { index, name, year, some_info, responsibilities } = data;
    
        setResume((pvalue) =>
            produce(pvalue, (draft) => {
                if (name) draft.projects[index].name = name;
                if (year) draft.projects[index].year = year;
                if (some_info) draft.projects[index].some_info = some_info;
    
                if (responsibilities && responsibilities.index >= 0 && responsibilities.index < draft.projects[index].responsibilities.length) {
                    draft.projects[index].responsibilities[responsibilities.index] = responsibilities.data;
                } else if (responsibilities && responsibilities.index === draft.projects[index].responsibilities.length) {
                    draft.projects[index].responsibilities.push(responsibilities.data);
                } else if (responsibilities) {
                    console.error(`Invalid responsibilities index: ${responsibilities.index}`);
                }

                if(responsibilities.data.length==1 && responsibilities.data[0]==='\n' || responsibilities.data.length==0){
                    console.log("jo");
                    draft.projects[index].responsibilities.splice(responsibilities.index,1);
                }
            })
        );
    }
    
    function handleAchievements(data){
        let index=data.index;
        let newSkill=data.info;
        
        setResume((pvalue)=>{
            return produce(pvalue,(draft)=>{
                if(newSkill.length===1 && newSkill[0]==='\n' || newSkill.length===0){
                    draft.achievements.splice(index,1);
                }
                else
                draft.achievements[index]=newSkill;
            })
        })
    }
    function onSave(){
    
        const data={
          templateid:1,
          templatedata:JSON.stringify(resume)
        }
        axios.post("http://localhost:5000/saveTemplate",data).then((res)=>{
          if(res.status==200){
              alert("saved !");
            //   notify();
              // saveSnapshot();
            //   <Navigate to ="/temp1"></Navigate>
          }
      })
    }
    let name=resume.name;
    let my_contact=resume.my_contact;
    let skills=resume.skills;
    let soft_skills=resume.soft_skills;
    let education=resume.education,about_me=resume.about_me,achievements=resume.achievements,experience=resume.experience,projects=resume.projects;
    return (
        <>
        <div className="maindiv" ref={pdfRef} >
             
            <div className="name-photo">
                <div className="photo-one">
                    <div className="one-photo">
                        <img src="../images/cat.png" alt="" />
                        <input type="file" />
                    </div>
                </div>
                <div className="name-one">
                    <h1 
                    suppressContentEditableWarning={true}
                    contentEditable={edit}
                    onBlur={(event)=>{
                        handleName(
                            {
                                name:event.target.innerText,
                                role:""
                            }
                        );
                    }}

                    >{name.name}</h1>
                    <h3 
                    suppressContentEditableWarning={true}
                    contentEditable={edit}
                    onBlur={(event)=>{
                        handleName(
                            {
                                name:"",
                                role:event.target.innerText
                            }
                        );
                    }}

                    >{name.role}</h3>
                </div>
            </div>
            <div className="lower-section">
                <div className="left-section-one">
                    <div className="contact">
                        <h1 suppressContentEditableWarning={true} contentEditable={edit} onBlur={(event)=>{
                            handleContact(
                                {
                                    index:0,
                                    data:{
                                        name: event.target.innerText
                                    }
                                }
                            );
                        }}>{my_contact[0].name}</h1>
                        <div className="line-one"></div>
                        <div>
                        {
                                my_contact.map((data,index)=>{
                                    if(index!==0)return(
                                        <a href={data.link} 
                                        suppressContentEditableWarning={true}
                                        contentEditable={edit}
                                        onBlur={(event)=>{
                                            handleContact(
                                                {
                                                    index:index,
                                                    data:{
                                                        name: event.target.innerText,
                                                        link:""
                                                    }
                                                }
                                            );
                                        }}
                                        ><p>{data.name}</p></a>
                                    );
                                })
                        }
                        
                            
                        </div>
                    </div>
                    <div className="hard-skill">
                        <h1 contentEditable={edit}
                        onBlur={(event)=>{
                            handleSkills(
                                {
                                    index:0,
                                    data:{
                                        name: event.target.innerText
                                    }
                                }
                            );
                        }}
                         suppressContentEditableWarning={true}>{skills[0]}</h1>
                        <div className="line-one"></div>
                        <div className="hello">
                            <ul>
                                {skills.map((data,index)=>{
                                    if(index!=0)return(
                                        <p><li 
                                        contentEditable={edit}
                                        onBlur={(event)=>{
                                            handleSkills(
                                                {
                                                    index:index,
                                                    data:{
                                                        name: event.target.innerText
                                                    }
                                                }
                                            );
                                        }}
                                        suppressContentEditableWarning={true}
                                        >{data}</li></p>
                                    )
                                })}
                                <AddList project={false} index="0" experience={false} soft={false} hard={true}></AddList>
                            </ul>
                        </div>
                    </div>
                    <div className="soft-skill">
                        <h1 
                        contentEditable={edit}                                         
                        onBlur={(event)=>{
                                handleSoftSkills(
                                    {
                                        index:0,
                                        data:{
                                            name: event.target.innerText
                                        }
                                    }
                                );
                            }}
                        suppressContentEditableWarning={true}>{soft_skills[0]}</h1>
                        <div className="line-one"></div>
                        <ul>
                            {soft_skills.map((data,index)=>{
                                if(index!=0)return(
                                    <p><li contentEditable={edit}
                                    onBlur={(event)=>{
                                        handleSoftSkills(
                                            {
                                                index:index,
                                                data:{
                                                    name: event.target.innerText
                                                }
                                            }
                                        );
                                    }}
                                suppressContentEditableWarning={true}
                                    >{data}</li></p>
                                )
                            })}
                        <AddList project={false} experience={false} soft={true} index="0" hard={false}></AddList>
                        </ul>
                    </div>
                    <div className="Education-Background">
                        <h1 
                        contentEditable={edit}
                        onBlur={(event)=>{
                            handleEducation(
                                {
                                    index:0,
                                    data:{
                                        name: event.target.innerText,
                                        info:"",
                                        percentage:""
                                    }
                                }
                            );
                        }}
                    suppressContentEditableWarning={true}
                        >{education[0].name}</h1>
                        <div className="line-one"></div>
                        <ul >
                            {education.map((data,index)=>{
                                if(index!=0){
                                    return (
                                    <li>
                                        <p 
                                        onBlur={(event)=>{
                                            handleEducation(
                                                {
                                                    index:index,
                                                    data:{
                                                        name: event.target.innerText,
                                                        info:"",
                                                        percentage:""
                                                    }
                                                }
                                            );
                                        }}
                                        suppressContentEditableWarning={true}
                                        contentEditable={edit}>{data.name}</p>
                                        <p 
                                        onBlur={(event)=>{
                                            handleEducation(
                                                {
                                                    index:index,
                                                    data:{
                                                        name:"",
                                                        info:event.target.innerText,
                                                        percentage:""
                                                    }
                                                }
                                            );
                                        }}
                                        suppressContentEditableWarning={true}
                                        contentEditable={edit}>{data.info}</p>
                                        <p 
                                        onBlur={(event)=>{
                                            handleEducation(
                                                {
                                                    index:index,
                                                    data:{
                                                        name:"",
                                                        info:"",
                                                        percentage: event.target.innerText
                                                    }
                                                }
                                            );
                                        }}
                                        suppressContentEditableWarning={true}

                                    contentEditable={edit}>{data.percentage}</p>
                                    </li>
                                    );
                                }
                            })}
                            
                        </ul>
                    </div>
                </div>
                <div className="right-section-one">
                    <div>
                        <h1 contentEditable={edit}
                        onBlur={(event)=>{
                            handleAboutMe(
                                {
                                    index:0,
                                    info:event.target.innerText
                                }
                            );
                        }}
                        suppressContentEditableWarning={true}
                        >{about_me[0]}</h1>
                        <div className="line-one"></div>
                        <p 
                        onBlur={(event)=>{
                            handleAboutMe(
                                {
                                    index:1,
                                    info:event.target.innerText
                                }
                            );
                        }}
                        suppressContentEditableWarning={true}
                        contentEditable={edit}>{about_me[1]}</p>
                    </div>
                    <div className="Experience">
                        <h1 contentEditable={edit}
                            onBlur={(event)=>{
                                handleExperience(
                                    {
                                        index:0,
                                        // info:,
                                        name:event.target.innerText,
                                        year:"",
                                        some_info:"",
                                        responsibilities:[]
                                    }
                                );
                            }}
                            suppressContentEditableWarning={true}
                        
                        >{experience[0].name}</h1>
                        <div className="line-one"></div>
                        
                            {experience.map((data,index)=>{
                                if(index!=0){
                                    return(
                                    <div>
                                        <h2 
                                onBlur={(event)=>{
                                    handleExperience(
                                        {
                                            index:index,
                                            // info:,
                                            name:event.target.innerText,
                                            year:"",
                                            some_info:"",
                                            responsibilities:[]
                                        }
                                    );
                                }}
                                suppressContentEditableWarning={true}
                                        contentEditable={edit}>{data.name}</h2>
                                        <h5 
                                        onBlur={(event)=>{
                                            handleExperience(
                                                {
                                                    index:index,
                                                    // info:,
                                                    name:"",
                                                    year:event.target.innerText,
                                                    some_info:"",
                                                    responsibilities:[]
                                                }
                                            );
                                        }}
                                        suppressContentEditableWarning={true}
                                        contentEditable={edit}>{data.year}</h5>
                                        <p 
                                        onBlur={(event)=>{
                                            handleExperience(
                                                {
                                                    index:index,
                                                    // info:,
                                                    name:"",
                                                    year:"",
                                                    some_info:event.target.innerText,
                                                    responsibilities:[]
                                                }
                                            );
                                        }}
                                        suppressContentEditableWarning={true}
                                        contentEditable={edit}>{data.some_info}</p>
                                        <ul>
                                            {data.responsibilities.map((info,i)=>{
                                                return (
                                                    <li> <p
                                                    onBlur={(event)=>{
                                                        handleExperience(
                                                            {
                                                                index:index,
                                                                // info:,
                                                                name:"",
                                                                year:"",
                                                                some_info:"",
                                                                responsibilities:{
                                                                    index:i,
                                                                    data:event.target.innerText
                                                                }
                                                            }
                                                        );
                                                    }}
                                                    suppressContentEditableWarning={true}
                                                    
                                                    contentEditable={edit}>{info}</p></li>
                                                );
                                            })}
                                            <AddList project={false} experience={true} index={index} soft={false} hard={true}></AddList>
                                        </ul>
                                        </div>
                                    );
                                }
                            })}
                    </div>
                    <div className="Projects">
                        <h1 
                        onBlur={(event)=>{
                            handleProjects(
                                {
                                    index:0,
                                    // info:,
                                    name:event.target.innerText,
                                    year:"",
                                    some_info:"",
                                    responsibilities:[]
                                }
                            );
                        }}
                        suppressContentEditableWarning={true}
                        contentEditable={edit}>{projects[0].name}</h1>
                        <div className="line-one"></div>
                        {projects.map((data,index)=>{
                                if(index!=0){
                                    return(
                                    <div>
                                        <h2 
                                        onBlur={(event)=>{
                                            handleProjects(
                                                {
                                                    index:index,
                                                    // info:,
                                                    name:event.target.innerText,
                                                    year:"",
                                                    some_info:"",
                                                    responsibilities:[]
                                                }
                                            );
                                        }}
                                        suppressContentEditableWarning={true}
                                        contentEditable={edit}>{data.name}</h2>
                                        <h5 
                                        onBlur={(event)=>{
                                            handleProjects(
                                                {
                                                    index:index,
                                                    // info:,
                                                    name:"",
                                                    year:event.target.innerText,
                                                    some_info:"",
                                                    responsibilities:[]
                                                }
                                            );
                                        }}
                                        suppressContentEditableWarning={true}
                                        contentEditable={edit}>{data.year}</h5>
                                        <p 
                                        onBlur={(event)=>{
                                            handleProjects(
                                                {
                                                    index:index,
                                                    // info:,
                                                    name:"",
                                                    year:"",
                                                    some_info:event.target.innerText,
                                                    responsibilities:[]
                                                }
                                            );
                                        }}
                                        suppressContentEditableWarning={true}
                                        contentEditable={edit}>{data.some_info}</p>
                                        <ul>
                                            {data.responsibilities.map((info,i)=>{
                                                return (
                                                    <li><p 
                                                    onBlur={(event)=>{
                                                        handleProjects(
                                                            {
                                                                index:index,
                                                                // info:,
                                                                name:"",
                                                                year:"",
                                                                some_info:"",
                                                                responsibilities:{
                                                                    index:i,
                                                                    data:event.target.innerText
                                                                }
                                                            }
                                                        );
                                                    }}
                                                    suppressContentEditableWarning={true}
                                                    
                                                    
                                                    contentEditable={edit}>{info}</p></li>
                                                );
                                            })}
<AddList project={true} experience={false} index={index} soft={false} hard={false}></AddList>

                                        </ul>
                                        </div>
                                    );
                                }
                            })}
                    </div>
                    <div className="Achievements" >
                        {/* <a href="tel:+"></a> */}
                        <h1 
                        onBlur={(event)=>{
                            handleAchievements(
                                {
                                    index:0,
                                    info:event.target.innerText,
                                }
                            );
                        }}
                        suppressContentEditableWarning={true}
                        contentEditable={edit}>{achievements[0]}</h1>
                        <div className="line-one"></div>
                        {achievements.map((data,index)=>{
                            if(index!=0)return(
                                <p 
                                onBlur={(event)=>{
                                    handleAchievements(
                                        {
                                            index:index,
                                            info:event.target.innerText,
                                        }
                                    );
                                }}
                                suppressContentEditableWarning={true}
                                contentEditable={edit}>{data}</p> 
                            );
                        })}
                       
                    </div>
                </div>
            </div>
           
        </div>

        <div className="lower-sec">
        <button onClick={handleEdit}>Edit</button>
        <button onClick={onSave}>Save</button>
        <Form isProject={true}></Form>
        <Form isProject={false}></Form>
        <AddEducation></AddEducation>
        {/* <AboutMe AboutMe={true}></AboutMe> */}
        <AboutMe AboutMe={false}></AboutMe>
        <HandleContact></HandleContact>
        <Download  current={pdfRef}></Download>
        </div>
        </>
    )
}
export default FirstResume;