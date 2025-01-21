import React from "react";
import ThirdContext from "../Contexts/ThirdContext";
import { produce } from "immer";

function Form(props){
    let {resume,setResume}=React.useContext(ThirdContext);
    let [value,setvalue]=React.useState("");
    function handleChange(event){
        let val=event.target.value;
        setvalue(val);
    }
    function submitForm(event){
        if(props.language){
            setResume((pvalue)=>{
                return produce(pvalue,(draft)=>{
                    draft.language.push(value);
                })
            })
        }
        else if(props.expertise){
            setResume((pvalue)=>{
                return produce(pvalue,(draft)=>{
                    draft.expertise.push(value);
                })
            })
        }
        else if(props.skills){
            setResume((pvalue)=>{
                return produce(pvalue,(draft)=>{
                    draft.skills.push(value);
                })
            })
        }
        setvalue("");
        event.preventDefault();
    }
    return(
        <form action="">
            <input onChange={handleChange} type="text" placeholder="Add List" value={value}/>
            <button onClick={submitForm}>Add</button>
        </form>
    )
}
function ProjectExperi(props) {
    let { resume, setResume } = React.useContext(ThirdContext);
    let [formData, setFormData] = React.useState({
        name: "",
        year: "",
        info: ""
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    function submitForm(event) {
        event.preventDefault();

        if (props.project) {
            setResume((prevResume) => {
                return produce(prevResume, (draft) => {
                    draft.projects.push({ ...formData });
                });
            });
        } else if (props.experience) {
            setResume((prevResume) => {
                return produce(prevResume, (draft) => {
                    draft.experience.push({ ...formData });
                });
            });
        }

        setFormData({
            name: "",
            year: "",
            info: ""
        });
    }

    return (
        <form onSubmit={submitForm}>
            <input
                onChange={handleChange}
                name="name"
                type="text"
                placeholder={props.project ? "Name of Project" : "Name of Experience"}
                value={formData.name}
            />
            <input
                onChange={handleChange}
                name="year"
                type="text"
                placeholder="Year"
                value={formData.year}
            />
            <textarea
                onChange={handleChange}
                name="info"
                placeholder="Information"
                value={formData.info}
            ></textarea>
            <button type="submit">Add</button>
        </form>
    );
}
function ContactForm() {
    let { resume, setResume } = React.useContext(ThirdContext);
    let [contactData, setContactData] = React.useState({
        name: "",
        link: ""
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setContactData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    function submitForm(event) {
        event.preventDefault();

        setResume((prevResume) => {
            return produce(prevResume, (draft) => {
                draft.contact.push({ ...contactData });
            });
        });

        setContactData({
            name: "",
            link: ""
        });
    }

    return (
        <form onSubmit={submitForm}>
            <input
                onChange={handleChange}
                name="name"
                type="text"
                placeholder="Contact Name or Detail"
                value={contactData.name}
            />
            <input
                onChange={handleChange}
                name="link"
                type="text"
                placeholder="Link (Optional)"
                value={contactData.link}
            />
            <button type="submit">Add</button>
        </form>
    );
}

function EducationForm() {
    let { resume, setResume } = React.useContext(ThirdContext);
    let [educationData, setEducationData] = React.useState({
        name: "",
        info: "",
        year: ""
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setEducationData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    function submitForm(event) {
        event.preventDefault();

        setResume((prevResume) => {
            return produce(prevResume, (draft) => {
                draft.education.push({ ...educationData });
            });
        });

        setEducationData({
            name: "",
            info: "",
            year: ""
        });
    }

    return (
        <form onSubmit={submitForm}>
            <input
                onChange={handleChange}
                name="name"
                type="text"
                placeholder="Name of School/Institution"
                value={educationData.name}
            />
            <input
                onChange={handleChange}
                name="info"
                type="text"
                placeholder="Degree or Program"
                value={educationData.info}
            />
            <input
                onChange={handleChange}
                name="year"
                type="text"
                placeholder="Year"
                value={educationData.year}
            />
            <button type="submit">Add</button>
        </form>
    );
}

export {Form,ProjectExperi,EducationForm,ContactForm};