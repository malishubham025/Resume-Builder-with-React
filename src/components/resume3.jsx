import React from "react";
import ThirdContext from "../Contexts/ThirdContext";
import {Form,ProjectExperi,EducationForm,ContactForm} from "./handleList";
import { produce } from "immer";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Download from "./download";
function ResumeThree(){
    const location = useLocation();
    let  resumeData  =  {}; 
    if(location && location.state){
        resumeData=location.state;
        // console.log(resumeData.data);
        
    }
    let ref=React.useRef();
    let {resume,setResume}=React.useContext(ThirdContext);
    const [edit,setEdit]=React.useState(false);
    resume=resumeData && resumeData.data?JSON.parse(resumeData.data):resume;
    function handleEdit(){
        setEdit(!edit);
    }
    function handleName(data){
        let first_name=data.first_name;
        let last_name=data.last_name;
        let title=data.title;
        setResume((pvalue)=>{
            return produce(pvalue,(draft)=>{
                if(first_name)draft.name.first_name=first_name;
                if(last_name)draft.name.last_name=last_name;
                if(title)draft.name.title=title
            })
        })
    }
    function handleAboutMe(data){
        let name=data.name;
        let info=data.info;
        setResume((pvalue)=>{
            return produce(pvalue,(draft)=>{
                if(name)draft.about_me.name=name;
                if(info)draft.about_me.info=info;
            })
        })
    }
    function handleContact(data){
        let name=data.name;
        let link=data.link;
        let index=data.index;
        setResume((pvalue)=>{
            return produce(pvalue,(draft)=>{
                if(name)draft.contact[index].name=name;
                if(link)draft.contact[index].link=link;
            })
        })
    }
    function handleList(info){
        let data=info.data;
        let index1=info.index1;
        let index2=info.index2;
        setResume((pvalue)=>{
            if(index1===3){
                return produce(pvalue,(draft)=>{
                    if(data)draft.language[index2]=data;
                    if(data.length===1 && data[0]==='\n' || data.length==0 && index2!=0){
                        draft.language.splice(index2,1);
                    }
                })
                // if(data.length)
            }
            else if(index1===4){
                return produce(pvalue,(draft)=>{
                    if(data)draft.expertise[index2]=data;
                    if(data.length===1 && data[0]==='\n' || data.length==0 && index2!=0){
                        draft.expertise.splice(index2,1);
                    }
                })
            }
            else{
                return produce(pvalue,(draft)=>{
                    if(data)draft.skills[index2]=data;
                    if(data.length===1 && data[0]==='\n' || data.length==0 && index2!=0){
                        draft.skills.splice(index2,1);
                    }
                })
            }
        })
    }
    function handleInfo(info){
        let name=info.name;
        let year=info.year;
        let ifo=info.info;
        let index1=info.index1;
        let index2=info.index2;
        if(index1===6){
            setResume((pvalue)=>{
            return produce(pvalue,(draft)=>{
                if(name)draft.experience[index2].name=name;
                if(year)draft.experience[index2].year=year;
                if(ifo)draft.experience[index2].info=ifo;
            })
        });
        }
        else if(index1===7){
            setResume((pvalue)=>{
            return produce(pvalue,(draft)=>{
                if(name)draft.projects[index2].name=name;
                if(year)draft.projects[index2].year=year;
                if(ifo)draft.projects[index2].info=ifo;
            })
        });
        }

    }
    function handleEducation(info){
        let name=info.name;
        let year=info.year;
        let ifo=info.info;
        let index1=info.index1;
        setResume((pvalue)=>{
        return produce(pvalue,(draft)=>{
            if(name)draft.education[index1].name=name;
            if(year)draft.education[index1].year=year;
            if(ifo)draft.education[index1].info=ifo;
        })
    })

    }
    function handleEducationDelete(index){
        if(index!=0 && index!=1){
            setResume((pvalue)=>{
                return produce(pvalue,(draft)=>{
                    draft.education.splice(index,1);
                })
            })
        }
    }
    function handleProjectsDelete(index){
       
        if(index!=0 && index!=1){
            setResume((pvalue)=>{
                return produce(pvalue,(draft)=>{
                    draft.projects.splice(index,1);
                })
            })
        }
    }
    function handleExperienceDelete(index){
        // console.log(index);
        if(index!=0 && index!=1){
            setResume((pvalue)=>{
                return produce(pvalue,(draft)=>{
                    draft.experience.splice(index,1);
                })
            })
        }
    }
    function onSave(){
    
        const data={
          templateid:3,
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
    return (
        <>
        <div className="three-main" ref={ref}>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={onSave}>Save</button>
            <div className="three-name-photo">
                <div className="three-photo">
                    <img src="../images/jhon.png" alt="" />
                </div>
                <div className="three-name">
                    <div>
                        <h1
                        onBlur={(event)=>{
                            handleName({
                                first_name:event.target.innerText,
                                last_name:"",
                                title:""
                            })
                        }}
                        suppressContentEditableWarning={true}
                        contentEditable={edit}>{resume.name.first_name}</h1>
                        <h1
                        onBlur={(event)=>{
                            handleName({
                                first_name:"",
                                last_name:event.target.innerText,
                                title:""
                            })
                        }}
                        suppressContentEditableWarning={true}
                        contentEditable={edit}>{resume.name.last_name}</h1>
                    </div>
                    <p
                        onBlur={(event)=>{
                            handleName({
                                first_name:"",
                                last_name:"",
                                title:event.target.innerText
                            })
                        }}
                        suppressContentEditableWarning={true}
                        contentEditable={edit}>{resume.name.title}</p>

                </div>
            </div>
            <div className="three-lower">
                <div className="three-left">
                    <div className="three-about-me">
                        <h1
                        onBlur={(event)=>{
                            handleAboutMe({
                                name:event.target.innerText,
                                info:""
                        })
                        }}
                        suppressContentEditableWarning={true}
                        contentEditable={edit}>{resume.about_me.name}</h1>
                        <p
                        onBlur={(event)=>{
                            handleAboutMe({
                                name:"",
                                info:event.target.innerText
                        })
                    }}
                    suppressContentEditableWarning={true}
                    contentEditable={edit}>{resume.about_me.info}</p>
                    </div>
                    <div className="three-contact">
                        {resume.contact.map((data,i)=>{
                            return <p><a 
                                onBlur={(event)=>{
                                    handleContact({
                                        name:event.target.innerText,
                                        link:"",
                                        index:i
                                })
                            }}
                            suppressContentEditableWarning={true}
                            contentEditable={edit}href={data.link}>{data.name}</a></p>
                        })}
                        
                    </div>
                    <div className="three-language">
                        <h1 
                        onBlur={(event)=>{
                            handleList({
                                data:event.target.innerText,
                                index1:3,
                                index2:0
                            })
                        }}
                        suppressContentEditableWarning={true}
                        contentEditable={edit}className="blue">{resume.language[0]}</h1>
                        <ul>
                        {resume.language.map((data,index)=>{
                            return index!=0?<li
                            onBlur={(event)=>{
                                handleList({
                                    data:event.target.innerText,
                                    index1:3,
                                    index2:index
                                })
                            }}
                            suppressContentEditableWarning={true}
                            contentEditable={edit}>{data}</li>:null;
                        })}
                        </ul>
                        <Form language={true} skills={false} expertise={false}></Form>
                    </div>
                    <div className="three-expertise">
                        <h1 
                        onBlur={(event)=>{
                            handleList({
                                data:event.target.innerText,
                                index1:4,
                                index2:0
                            })
                        }}
                        suppressContentEditableWarning={true}
                        contentEditable={edit}className="blue">{resume.expertise[0]}</h1>

                        <ul>
                            {resume.expertise.map((data,index)=>{
                                return index!=0?<li
                                onBlur={(event)=>{
                                    handleList({
                                        data:event.target.innerText,
                                        index1:4,
                                        index2:index
                                    })
                                }}
                                suppressContentEditableWarning={true}
                                contentEditable={edit}>{data}</li>:null;
                            })}
                        </ul>
                        <Form language={false} skills={false} expertise={true}></Form>
                    </div>
                    <div className="three-skills">
                        <h1 
                        onBlur={(event)=>{
                            handleList({
                                data:event.target.innerText,
                                index1:5,
                                index2:0
                            })
                        }}
                        suppressContentEditableWarning={true}
                        contentEditable={edit}className="blue">{resume.skills[0]}</h1>
                        <ul>
                        {resume.skills.map((data,index)=>{
                                return index!=0?<li 
                                onBlur={(event)=>{
                                    handleList({
                                        data:event.target.innerText,
                                        index1:5,
                                        index2:index
                                    })
                                }}
                                suppressContentEditableWarning={true}
                                contentEditable={edit}>{data}</li>:null;
                            })}
                        </ul>
                        <Form language={false} skills={true} expertise={false}></Form>
                    </div>
                </div>
                <div className="three-right">
                <div className="three-experience"> 
                    <h1 
                    onBlur={(event)=>{
                        handleInfo({
                            name:event.target.innerText,
                            year:"",
                            info:"",
                            index1:6,
                            index2:0
                       })
                    }}
                        suppressContentEditableWarning={true}
                        contentEditable={edit}
                        className="blue-extended">{resume.experience[0].name}</h1>
                    {resume.experience.map((data,index)=>{
                        if(index!=0){
                            return(
                            <div className="actual-experience">
                                <h1
                                onBlur={(event)=>{
                                    handleInfo({
                                        name:event.target.innerText,
                                        year:"",
                                        info:"",
                                        index1:6,
                                        index2:index
                                    })
                                }}
                                    suppressContentEditableWarning={true}
                                    contentEditable={edit}>{data.name}</h1>
                                <h5
                                onBlur={(event)=>{
                                    handleInfo({
                                        name:"",
                                        year:event.target.innerText,
                                        info:"",
                                        index1:6,
                                        index2:index
                                    })
                                }}
                                    suppressContentEditableWarning={true}
                                    contentEditable={edit}><i>{data.year}</i></h5>
                                <p
                                onBlur={(event)=>{
                                    handleInfo({
                                        name:"",
                                        year:"",
                                        info:event.target.innerText,
                                        index1:6,
                                        index2:index
                                    })
                                }}
                                    suppressContentEditableWarning={true}
                                    contentEditable={edit}>{data.info}</p>
                                <button onClick={()=>{
                                    handleExperienceDelete(index);
                                }}>Delete</button>
                            </div>
                            );
                        }
                    })}

                </div>
                    <div>
                        <h1 
                        onBlur={(event)=>{
                            handleInfo({
                                name:event.target.innerText,
                                year:"",
                                info:"",
                                index1:7,
                                index2:0
                            })
                        }}
                        suppressContentEditableWarning={true}
                        contentEditable={edit}
                        className="blue-extended">{resume.projects[0].name}</h1>

                        {resume.projects.map((data,index)=>{
                            if(index!=0){
                                return (
                                <div className="actual-experience">
                                    <h1
                                    onBlur={(event)=>{
                                        handleInfo({
                                            name:event.target.innerText,
                                            year:"",
                                            info:"",
                                            index1:7,
                                            index2:index
                                        })
                                    }}
                                    suppressContentEditableWarning={true}
                                    contentEditable={edit}>{data.name}</h1>
                                    <h5
                                    onBlur={(event)=>{
                                        handleInfo({
                                            name:"",
                                            year:event.target.innerText,
                                            info:"",
                                            index1:7,
                                            index2:index
                                        })
                                    }}
                                    suppressContentEditableWarning={true}
                                    contentEditable={edit}><i>{data.year}</i></h5>
                                    <p
                                    onBlur={(event)=>{
                                        handleInfo({
                                            name:"",
                                            year:"",
                                            info:event.target.innerText,
                                            index1:7,
                                            index2:index
                                        })
                                    }}
                                    suppressContentEditableWarning={true}
                                    contentEditable={edit}>{data.info}</p>
                                    <button onClick={()=>{
                                    handleProjectsDelete(index);
                                }}>Delete</button>
                                </div>
                                );
                            }
                        })}
                        
                    </div>
                    <div>
                        <h1 
                        onBlur={(event)=>{
                            handleEducation({
                                name:event.target.innerText,
                                year:"",
                                info:"",
                                index1:0,

                            })
                        }}
                        className="blue-extended">{resume.education[0]}</h1>
                        {resume.education.map((data,index)=>{
                            if(index!=0){
                                return (
                                <div className="actual-education">
                                    <p 
                                onBlur={(event)=>{
                                    handleEducation({
                                        name:event.target.innerText,
                                        year:"",
                                        info:"",
                                        index1:index,

                                    })
                                }}
                                    suppressContentEditableWarning={true}
                                    contentEditable={edit}
                                    >{data.name}</p>
                                    <p
                                    onBlur={(event)=>{
                                        handleEducation({
                                            name:"",
                                            year:"",
                                            info:event.target.innerText,
                                            index1:index,

                                        })
                                    }}
                                    suppressContentEditableWarning={true}
                                    contentEditable={edit}>{data.info}</p>
                                    <p
                                    onBlur={(event)=>{
                                        handleEducation({
                                            name:"",
                                            year:event.target.innerText,
                                            info:"",
                                            index1:index,

                                        })
                                    }}
                                    suppressContentEditableWarning={true}
                                    contentEditable={edit}><i>{data.year}</i></p>
                                    <button onClick={()=>{handleEducationDelete(index)}}>Delete Education</button>
                                </div>
                                );
                            }
                        })}
                       

                    </div>

                </div>
            </div>


        </div>
        <div className="lower-sec">
        <ProjectExperi project={true} experience={false}></ProjectExperi>
        <ProjectExperi project={false} experience={true}></ProjectExperi>
        <EducationForm></EducationForm>
        <ContactForm></ContactForm>
        <Download current={ref}></Download>
        </div>
        </>
    );
}
export default ResumeThree;