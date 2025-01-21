import React from "react";
import ThirdContext from "./ThirdContext";
function ThirdContextProvider({children}){
    const [resume,setResume]=React.useState({
        name:{
            first_name:"RICHARD",
            last_name:"SANCHEZ",
            title:"Product Engineer"
        },
        about_me:{
            name:"About Me",
            info:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos obcaecati velit quo iste repudiandae illum fugiat perspiciatis aliquid voluptate accusamus."
        },
        contact:[
            {
                name:"9405623015",
                link:""
            },
            {
                name:"malishubham025@gmail.com",
                link:""
            },
            {
                name:"AnyWhere any city.",
                link:""
            }   
        ],
        language:[
            "LANGUAGE","English","Marathi","Hindi"
        ]
        ,
        expertise:[
            "Expertise","Managmant Skills",
            "Creativity",
            "Leadership",
            "Digital Marketing"
        ]
        ,
        skills:[
            "Skills",
            "Java",
            "Python",
            "C++",
            "DBMS"
        ],
        experience:[
            {
                name:"Experience",
                year:"",
                info:""
            },
            {
                name:"Name of Experience",
                year:"year",
                info:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit debitis esse earum est, voluptatem commodi rerum voluptatibus fuga magni cupiditate deserunt aliquam modi eveniet doloremque sed aliquid asperiores."
            },
            {
                name:"Name of Experience",
                year:"year",
                info:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit debitis esse earum est, voluptatem commodi rerum voluptatibus fuga magni cupiditate deserunt aliquam modi eveniet doloremque sed aliquid asperiores."
            }
        ],
        projects:[
            {
                name:"Projects",
                year:"",
                info:""
            },
            {
                name:"Name of Project",
                year:"year",
                info:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit debitis esse earum est, voluptatem commodi rerum voluptatibus fuga magni cupiditate deserunt aliquam modi eveniet doloremque sed aliquid asperiores."
            },
            {
                name:"Name of Project",
                year:"year",
                info:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit debitis esse earum est, voluptatem commodi rerum voluptatibus fuga magni cupiditate deserunt aliquam modi eveniet doloremque sed aliquid asperiores."
            }
        ],
        education:[
            "Education",
            {
                name:"Name of school",
                info:"degree name",
                year:"year"
            },
            {
                name:"Name of school",
                info:"degree name",
                year:"year"
            },
        ],

    })
    return(<ThirdContext.Provider value={{resume,setResume}}>
     {children}
    </ThirdContext.Provider>);

}
export default ThirdContextProvider;