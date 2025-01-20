import React from "react";
import ResumeContext from "./ResumeContext";
function ResumeProvider({children}){
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
    return(
        <ResumeContext.Provider value={{resume,setResume}}>
            {children}
        </ResumeContext.Provider>
    )
}
export default ResumeProvider;