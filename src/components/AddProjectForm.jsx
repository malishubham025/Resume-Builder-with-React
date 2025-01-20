import React,{useState} from "react";
import ResumeContext from "../Contexts/ResumeContext";
import { produce } from "immer";
function Form(props){
    let {resume,setResume}=React.useContext(ResumeContext);
    const [formData, setFormData] = useState({
        name: "",
        year: "",
        aboutDescription: "",
        description: "",
    });

    // Handler for input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(props.isProject ? "Project Data:" : "Experience Data:", formData);
        // Reset form data after submission
        let arr=formData.description.split("\n");
        let data={
            name:formData.name,
            year:formData.year,
            some_info:formData.aboutDescription,
            responsibilities:arr
        }
        if(props.isProject){
            setResume((pvalue)=>{
                return produce(pvalue,(draft)=>{
                    draft.projects.push(data);
                })
            })
        }
        else{
            setResume((pvalue)=>{
                return produce(pvalue,(draft)=>{
                    draft.experience.push(data);
                })
            })
        }
        console.log(data);
        setFormData({
            name: "",
            year: "",
            aboutDescription: "",
            description: "",
        });
    };
    return(
        <form onSubmit={handleSubmit}>
        <input
            type="text"
            name="name"
            placeholder={props.isProject ? "Name of project" : "Name of Experience"}
            value={formData.name}
            onChange={handleChange}
        />
        <input
            type="text"
            name="year"
            placeholder={props.isProject ? "Project Year" : "Experience Year"}
            value={formData.year}
            onChange={handleChange}
        />
        <input
            type="text"
            name="aboutDescription"
            placeholder="About description"
            value={formData.aboutDescription}
            onChange={handleChange}
        />
        <textarea
            rows="10"
            cols="20"
            name="description"
            placeholder="Description 
    Add new list items in new line"
            value={formData.description}
            onChange={handleChange}
        ></textarea>
        <button type="submit">
            {props.isProject ? <>Add Project</> : <>Add Experience</>}
        </button>
    </form>
    );
}
export default Form;