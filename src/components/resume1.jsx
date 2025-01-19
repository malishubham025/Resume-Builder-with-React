import React from "react";
import { produce } from "immer";
function FirstResume(){
    const [edit,setEdit]=React.useState(false);
    const [resume,setResume]=React.useState({
        name:{
            name:"Shubham Mali",
            role:"Financial Analyst"
        },
        my_contact:[
            {
                name:"My Contact",
                link:""
            },
            {
                name:"malishubham025@gmail.com",
                link:"malishubham025@gmail.com"
            },
            {
                name:"Github",
                link:"https://www.github.com"
            },
            {
                name:"9405623051",
                link:""
            }
        ],
        skills:[
            "Hard Skill",
            "C++",
            "Java",
            "DBMS",
            "Python"
        ],
        soft_skills:[
            "Soft Skill","Observation","Descision Making","Communication","Multitasking"
        ],
        education:[
            {
                name:"Education Background",
                info:"",
                percentage:""
            },
            {
                name:"Primary Education Here",
                info:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, neque?",
                percentage:"98%"
            },
            {
                name:"Secondary Education",
                info:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, neque?",
                percentage:"98%"
            },
            {
                name:"Graduation",
                info:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, neque?",
                percentage:"98%"
            }
        ],
        about_me:[
            "About Me",
            "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum dolores nemo aliquam harum aspernatur eligendi ducimus dignissimos fugit? Velit perspiciatis beatae doloribus id officiis repudiandae quae consequatur. Ratione, in corporis."
        ],
        experience:[
            {
                name:"Professional Experience",
                year:"",
                some_info:"",
                responsibilities:[]
            },
            {
                name:"Name of Experience",
                year:"2021-2023",
                some_info:"Key Responsibilities",
                responsibilities:[
                    "Lorem ipsum dolor sit amet consectetur adipisicing.","Lorem ipsum dolor sit amet consectetur adipisicing.","Lorem ipsum dolor sit amet consectetur adipisicing."
                ]
            },
            {
                name:"Name of Experience",
                year:"2021-2023",
                some_info:"Key Responsibilities",
                responsibilities:[
                    "Lorem ipsum dolor sit amet consectetur adipisicing.","Lorem ipsum dolor sit amet consectetur adipisicing.","Lorem ipsum dolor sit amet consectetur adipisicing."
                ]
            }
        ]
        ,
        projects:[
            {name:"Projects",
                year:"",
                some_info:"",
                responsibilities:[
                    ""
                ]
            },
            {
                name:"Name of project",
                year:"2021-2023",
                some_info:"Key Responsibilities",
                responsibilities:[
                    "Lorem ipsum dolor sit amet consectetur adipisicing.","Lorem ipsum dolor sit amet consectetur adipisicing.","Lorem ipsum dolor sit amet consectetur adipisicing."
                ]
            },
            {
                name:"Name of Project",
                year:"2021-2023",
                some_info:"Key Responsibilities",
                responsibilities:[
                    "Lorem ipsum dolor sit amet consectetur adipisicing.","Lorem ipsum dolor sit amet consectetur adipisicing.","Lorem ipsum dolor sit amet consectetur adipisicing."
                ]
            }
        ],
        achievements:[
            "Achievements",
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Et maiores dolorem cum aspernatur aperiam beatae magni officia obcaecati sint aut. Quos accusantium, quo iste nisi labore aspernatur sed optio excepturi?",
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita rerum accusantium amet quaerat possimus explicabo harum, aperiam soluta magni earum alias perspiciatis. Debitis aspernatur voluptatibus repellat sed, laboriosam mollitia earum."
        ]

    })
    function handleEdit(){
        setEdit(!edit);
    }
    function handleSkills(data){
        let index=data.index;
        let d=data.data.name;
        setResume((pvalue)=>{
            return produce(pvalue,(draft)=>{
                draft.skills[index]=d;
            })
        })
        // console.log(data);
    }
    function handleContact(data){
        // console.log(data);
        let index=data.index;
        
        let name=data.data.name;
        let link=data.data.link;
        setResume((pvalue)=>{
            
            return produce(pvalue,(draft)=>{
                    draft.my_contact[index].name=name;
                    draft.my_contact[index].link=link;
                })
            
        })
        

    }
    function handleSoftSkills(data){
        let index = data.index;
        let d = data.data.name;
        setResume((pvalue) => {
            return produce(pvalue, (draft) => {
                draft.soft_skills[index] = d;
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
            })
        );
    }
    
    function handleAchievements(data){
        let index=data.index;
        let info=data.info;
        
        setResume((pvalue)=>{
            return produce(pvalue,(draft)=>{
                draft.achievements[index]=info;
            })
        })
    }
    function handleSubmit(event){
        console.log(resume);
        event.preventDefault();
    }
    let name=resume.name;
    let my_contact=resume.my_contact;
    let skills=resume.skills;
    let soft_skills=resume.soft_skills;
    let education=resume.education,about_me=resume.about_me,achievements=resume.achievements,experience=resume.experience,projects=resume.projects;
    return (
        <>
        <div className="maindiv" >
             
            <div className="name-photo">
                <div className="photo-one">
                    <div className="one-photo">
                        <img src="../images/cat.png" alt="" />
                        <input type="file" />
                    </div>
                </div>
                <div className="name-one">
                    <h1 contentEditable={edit} >{name.name}</h1>
                    <h3 contentEditable={edit}>{name.role}</h3>
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
                                        <li 
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
                                        ><p>{data}</p></li>
                                    )
                                })}
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
                                    <li contentEditable={edit}
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
                                    ><p>{data}</p></li>
                                )
                            })}

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
                                                    <li><p 
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
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleSubmit}>Submit</button>
        </>
    )
}
export default FirstResume;