import React, { useState } from "react";
// import "./styles.css";
import { useRef } from "react";
import Download from "./download";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { Navigate } from "react-router-dom";
function ResumeFinal() {
  
  const [edit, setEdit] = useState(false);
  

  const [resumeTemplate, setResumeTemplate] = useState({
    heading: [
      {
        id: 1,
        type: "heading",
        content: "John Doe",
      },
      {
        id: 3,
        type: "link",
        content: [
          { name: "Github", to: "https://www.github.com" },
          { name: "LinkedIn", to: "https://www.linkedin.com" },
          { name: "Portfolio", to: "https://www.github.com" },
        ],
      },
    ],
    summary: [
      {
        id: 1,
        type: "heading",
        content: "Summary",
      },
      {
        id: 2,
        type: "para",
        content: "MERN Stack Enthusiast | C++ Programmer | Problem Solver",
      },
    ],
    education: [
      { school: "VIT Pune ENTC", description: "8.6 | 2020 - Present" },
      {
        school: "Sanjay Ghodawat Junior College XII (HSC)",
        description: "93% | 2020 - 2021",
      },
      {
        school: "New English School Achara X (SSC)",
        description: "93% | 2018 - 2019",
      },
    ],
    projects: [
      {
        heading: "Scribble Game with Audio Room",
        list: [
          "Created an interactive game UI in React.js and structured game logic in JavaScript.",
          "Utilized Socket.IO for real-time chat functionality and room creation.",
          "Incorporated PeerJS to support audio calls, enriching the overall game experience.",
        ],
      },
      {
        heading: "Resume Builder Web-App ",
        list: [
          "Developed a user-friendly frontend using React.js.",
          "Implemented backend using Node.js and MongoDB for efficient data storage and retrieval.",
          "Secured user authentication and session management using JWT (JSON Web Token)",
        ],
      },
      {
        heading: "2048 Ai",
        list: [
          "Designed and developed the game UI using HTML and CSS.",
          "Implemented the game logic in JavaScript for a seamless game-play experience.",
          "Integrated the Expectiminimax algorithm to create an AI-driven version of the 2048 game.",
        ],
      },
    ],
  });
  function notify (){
        
    toast("Saved !");
} 
  function onSave(){
    
    const data={
      templateid:4,
      templatedata:JSON.stringify(resumeTemplate)
    }
    axios.post("http://localhost:5000/saveTemplate",data).then((res)=>{
      if(res.status==200){
          // alert("saved !");
          notify();
          // saveSnapshot();
          <Navigate to ="/temp4"></Navigate>
      }
  })
  }
  function handlelink(event) {
    event.preventDefault();
    const name = event.target.linkname.value;
    const to = event.target.linkto.value;
    if (name && to) {
      setResumeTemplate((prevTemplate) => {
        return {
          ...prevTemplate,
          heading: prevTemplate.heading.map((data) => {
            if (data.type === "link") {
              return {
                ...data,
                content: [...data.content, { name, to }],
              };
            }
            return data;
          }),
        };
      });
      event.target.reset();
    }
  }

  function setedit() {
    setEdit(!edit);
  }

  function handletable(event) {
    event.preventDefault();
    const name = event.target.schoolname.value;
    const description = event.target.description.value;
    if (name && description) {
      setResumeTemplate((prevTemplate) => {
        return {
          ...prevTemplate,
          education: [...prevTemplate.education, { school: name, description }],
        };
      });
      event.target.reset();
    }
  }
  function handleProjectList(event) {
    event.preventDefault();
    
    const newListItem = event.target.listItem.value; // Get the new list item
    const projectIndex = event.target.listItem.id; // Get the project ID or index
  
    if (newListItem) {
      setResumeTemplate((prevTemplate) => {
        // Create a copy of the current projects
        const updatedProjects = [...prevTemplate.projects];
        
        // Update the specific project's list by adding the new list item
        updatedProjects[projectIndex] = {
          ...updatedProjects[projectIndex],
          list: [...updatedProjects[projectIndex].list, newListItem], // Append the new list item
        };
        
        // Return the updated state
        return {
          ...prevTemplate,
          projects: updatedProjects,
        };
      });
      
      event.target.reset(); // Reset the form after submission
    }
  }
  
  let heading = resumeTemplate.heading;
  let summary = resumeTemplate.summary;
  let education = resumeTemplate.education;
  let projects = resumeTemplate.projects;
  const pdfRef=useRef();
  function handleChange(name,type,content,x){
    let heading=resumeTemplate.heading;
    if(type=="heading"){
      
      heading[0].content=content;
      setResumeTemplate((pvalue)=>{
        return {
          ...pvalue,
          heading
        }
        
      });
     }
     else{
        let contentArr=heading[1].content;
        
        contentArr.forEach((obj)=>{
          if(obj.name==x){
            obj.name=content;
          }
        })
     }
    console.log(name,type,content);
  }
  return (
    <div className="resumefinal" ref={pdfRef}>
      <button onClick={setedit} className="after-delete">Edit</button>
      <div className="heading"  >
        {heading.map((section,index) => {
          if (section.type === "heading") {
            return <h1 key={section.id} onInput={(e)=>{
              handleChange("heading","heading",e.target.innerText);
            }} contentEditable={edit}>{section.content}</h1>;
          } else if (section.type === "link") {
            return (
              <div key={section.id} className="links">
                {section.content.map((link, index) => (
                  <a
                    key={index}
                    href={link.to}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link"
                    onInput={(e)=>{
                      handleChange("heading","link",e.target.innerText,link.name);
                    }} contentEditable={edit}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            );
          }
          return null;
        })}

        <form onSubmit={handlelink} contentEditable="false" className="after-delete">
          <input type="text" name="linkname" placeholder="Add Link Name" />
          <input type="text" name="linkto" placeholder="Link URL" />
          <button type="submit">Add Link</button>
        </form>
      </div>
      <div className="summary" contentEditable={edit}>
        <hr style={{ width: "100%" }} />
        {summary.map((data, index) => {
          if (data.type === "heading") {
            return <h3 key={index}>{data.content}</h3>;
          } else if (data.type === "para") {
            return <p key={index}>{data.content}</p>;
          }
        })}
        <hr style={{ width: "100%" }} />
      </div>
      <div className="education" contentEditable={edit}>
        <h3>Education</h3>
        <table>
          <tbody>
            {education.map((data, index) => (
              <tr key={index}>
                <td>{data.school}</td>
                <td>{data.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <form onSubmit={handletable} contentEditable="false" className="after-delete">
          <input type="text" name="schoolname" placeholder="Add School Name" />
          <input type="text" name="description" placeholder="Description" />
          <button type="submit">Add School</button>
        </form>
      </div>
      <div className="projects" contentEditable={edit}>
        <h3>Academic Projects</h3>
        <hr style={{ width: "100%" }} />

        {projects.map((data,index) => {
          return (
            <div className="p">
              <h3>{data.heading}</h3>
              {data.list.map((data2) => {
                return <li>{data2}</li>;
              })}

              <form onSubmit={handleProjectList} className="after-delete">
                <input type="text" name="listItem" id={index} />
                <input type="submit" />
              </form>
            </div>
          );
        })}
      </div>
      <Download name="shubham" current={pdfRef.current}></Download>
      <button onClick={onSave}>Save</button>
    </div>
  );
}

export default ResumeFinal;
