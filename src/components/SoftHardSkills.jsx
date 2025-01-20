import React from "react";
import ResumeContext from "../Contexts/ResumeContext";
import { produce } from "immer";
function AddList(props){
    let {resume,setResume}=React.useContext(ResumeContext);
    const [info,setInfo]=React.useState("");
    function handleChange(event){
        let info=event.target.value;
        setInfo(info);
    }
    function handleSubmit(event){
        if(props.project){
            let index=props.index;
            // console.log(resume.responsibilities[Number(index)]);
            
            setResume((pvalue)=>{
                
                return produce(pvalue,(draft)=>{
                    draft.projects[index].responsibilities.push(info);
                })
            })
        }
        else if(props.experience){
            let index=props.index;
            setResume((pvalue)=>{
                return produce(pvalue,(draft)=>{
                    draft.experience[index].responsibilities.push(info);
                })
            })
        }
        else if(props.soft){
            setResume((pvalue)=>{
                return produce(pvalue,(draft)=>{
                    draft.soft_skills.push(info);
                })
            })
        }
        else if(props.hard){
            setResume((pvalue)=>{
                return produce(pvalue,(draft)=>{
                    draft.skills.push(info);
                })
            })
        }
        setInfo("");
        event.preventDefault();
    }
    return (
        <form action="">
            <input type="text" onChange={handleChange} placeholder="Add bullet point" value={info} />
            <button onClick={handleSubmit}>Add</button>
        </form>
    );
}
function HandleContact() {
    let { resume, setResume } = React.useContext(ResumeContext);

    // Local state for form fields
    const [form, setForm] = React.useState({
        name: "",
        link: ""
    });

    // Handle input field changes
    function handleChange(event) {
        const { name, value } = event.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value
        }));
    }

    // Handle form submission
    function handleSubmit(event) {
        event.preventDefault(); // Prevent page reload
        setResume((prevResume) =>
            produce(prevResume, (draft) => {
                draft.my_contact.push(form);
            })
        );
        // Reset form fields
        setForm({
            name: "",
            link: ""
        });
    }

    return (
        <form onSubmit={handleSubmit} className="addlist">
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
            />
            <input
                type="text"
                name="link"
                placeholder="Link"
                value={form.link}
                onChange={handleChange}
            />
            <button type="submit">Submit</button>
        </form>
    );
}
export {AddList,HandleContact};