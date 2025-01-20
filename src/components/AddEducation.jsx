import React from "react";
import { produce } from "immer";
import ResumeContext from "../Contexts/ResumeContext";

function AddEducation() {
    let { resume, setResume } = React.useContext(ResumeContext);

    const [form, setForm] = React.useState({
        name: "",
        info: "",
        percentage: "",
    });

    function handleChange(event) {
        let { name, value } = event.target;
        setForm((prevValue) => ({
            ...prevValue,
            [name]: value,
        }));
    }

    function handleSubmit(event) {
        event.preventDefault(); // Prevent default form submission
        setResume((prevValue) =>
            produce(prevValue, (draft) => {
                draft.education.push(form);
            })
        );
        setForm({
            name: "",
            info: "",
            percentage: "",
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                onChange={handleChange}
                placeholder="Name of Education"
                value={form.name}
            />
            <input
                type="text"
                name="info"
                onChange={handleChange}
                placeholder="Description"
                value={form.info}
            />
            <input
                type="text"
                name="percentage"
                onChange={handleChange}
                placeholder="Marks"
                value={form.percentage}
            />
            <button type="submit">Add Education</button>
        </form>
    );
}

export default AddEducation;
