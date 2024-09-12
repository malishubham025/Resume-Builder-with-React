import React,{ useRef } from "react";
//import {obj} from "./form";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import skill from "../skill";
import axios from "axios";
import { Navigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
// import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';
// import html2canvas from 'html2canvas';

function FirstResume(prompts){
    const pdfRef=useRef();
    function notify (){
        
        toast("Saved !");
    } 
    
    function save(){
        const input=pdfRef.current;
        const data={
            templateid:1,
            templatedata:input.innerHTML
        }
        axios.post("http://localhost:5000/saveTemplate",data).then((res)=>{
            if(res.status==200){
                // alert("saved !");
                notify();
                // saveSnapshot();
                <Navigate to ="/template1"></Navigate>
            }
        })
    }
    const download=()=>{
        //const input=pdfRef.current;
        // setTimeout(()=>{
            var addsection=document.querySelectorAll(".after-delete");
            addsection.forEach((a)=>{
                   a.classList.add("temp-remove");
            })
            

        const input = pdfRef.current;
        const inputHeight = input.scrollHeight; // Capture the full height of the resume
        const inputWidth = input.scrollWidth; // Capture the full width of the resume
        html2canvas(input, {
            height: inputHeight,
            width: inputWidth,
          }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', [inputWidth, inputHeight], true);
      
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = pdfWidth;
            
            const imgHeight = (canvas.height / canvas.width) * imgWidth;
            const ratio=Math.min(pdfWidth/imgWidth,pdfHeight/imgHeight);
            const imgX = (pdfWidth-imgWidth*ratio)/4;
            const imgY = 0;
      
            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth, imgHeight);
            pdf.save('Resume.pdf');
          });
        addsection.forEach((a)=>{
            a.classList.remove("temp-remove");
     })

    };
    const [Section, setSection] = React.useState([]);
    const [Section2, setSection2] = React.useState([]);

    

    
    var [empty,putEmptyText]=React.useState({
        heading:null,
        tA:null,
        list:null
    });
    var [empty2,putEmptyText2]=React.useState({
        heading2:null,
        tA2:null,
        list2:null
    });
    function heading(event) {
        const name = event.target.name;
        const value = event.target.value;
      
        putEmptyText((prevState) => ({
          ...prevState,
          [name]: value
        }));
      
        //console.log(empty);
      }
      function heading2(event) {
        const name2 = event.target.name;
        const value2 = event.target.value;
      
        putEmptyText2((prevState) => ({
          ...prevState,
          [name2]: value2
        }));
      
        //console.log(empty2);
      }
      

      function AddSection(event) {
        console.log(Section);
        setSection((prevSection) => [...prevSection, empty]);
        putEmptyText({ heading: "", tA: "",list:"" }); // Clear the input values after adding to Section
        event.preventDefault();
        
      }
      function AddSection2(event) {
        
        setSection2((prevSection) => [...prevSection, empty2]);
        putEmptyText2({ heading2: "", tA2: "",list2:"" }); // Clear the input values after adding to Section
        event.preventDefault();
        
      }

      function del(ind){
        console.log(ind);
        setSection(Section.filter((element,index)=>{
            return index!==ind;
        }))
        
      }
      function del2(ind){
        console.log(ind);
        setSection2(Section2.filter((element,index)=>{
            return index!==ind;
        }))
        
      }
      function S() {
        return (
          <div>
            {Section.map((val, index) => (
              <div key={index}>
                <h3>{val.heading}</h3>
                <div class="resume-line" style={val.heading?null:{display:"none"}}></div>
                <p>{val.tA}</p>
                
                   
                    <ul style={val.list?null:{display:"none"}}>
                    <li>{val.list}</li>
                    </ul>
                   
                
                
                <button className="after-delete" style={{marginBottom:"40px"}} onClick={()=>{
                      del(index);
                }}>Delete</button>
              </div>
            ))}
          </div>
        );
      }
      function S2() {
        

        return (
          <div>
            {Section2.map((val, index) => (
              <div key={index}>
                <h3>{val.heading2}</h3>
                <div class="resume-line" style={val.heading2?{visibility:"visible"}:{visibility:"hidden"}}></div>
                <p>{val.tA2}</p>
                
                   
                    <ul style={val.list?null:{display:"none"}}>
                    <li>{val.list2}</li>
                    </ul>
                   
                
                
                <button className="after-delete" style={{marginBottom:"40px"}} onClick={()=>{
                      del2(index);
                }}>Delete</button>
              </div>
            ))}
          </div>
        );
      }
    function fun(skill){ 
        //console.log(skill)
         return(
           
            <li>
                   {skill.content}
               </li>
         )
    }
    var [value,setValue]=React.useState(false);
    var [value2,setValue2]=React.useState(false);
    var [value3,s]=React.useState(value);
    // if(value){
    //     document.querySelector(".download").style.opacity="0"
        
    // }
    var [setUserProfilePhoto,handleProfilePhotoChange]=React.useState("../images/cat (1).png");
    function ProfilePhotoChange(event){
        const file=event.target.files[0];
        // console.log(file);
        handleProfilePhotoChange(URL.createObjectURL(file));
    }
    document.addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.key === 's') {
          // Prevent the default browser save action
          event.preventDefault(); 
      
          // Your custom save logic here
          save();
        }
      });
      const [isset,setisSet]=React.useState(false);
      const [data,setData]=React.useState('');
      React.useEffect(()=>{
        let user=Cookies.get("userid");
        
        // console.log(x);
        axios.post("http://localhost:5000/checkuser",{user:user,template:1}).then((res)=>{
            if(res.status==200){
                // console.log();
                if(res.data.message){
                    setisSet(true);
                    console.log(res.data.result.data);
                    document.querySelector(".resume-mainPage").innerHTML=res.data.result.data;
                    let x=document.querySelector(".add1");
                    console.log(x);
                    x.addEventListener("click",AddSection);
                    setData(res.data.result.data);
                }

                <Navigate to ="/template1"></Navigate>
            }
        }).catch((err)=>{
            console.log(err);
        })
      },[]);
    return(
        <div>
            <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"

/>
        <div ref={pdfRef} id="resume" className="resume-mainPage" contenteditable="true">
                    <div className="resume-name-and-photo">
                        <div contentEditable="false"  className="resume-photo">
                            <img  src={setUserProfilePhoto?setUserProfilePhoto:"../images/cat (1).png"} alt="" />
                            
                        </div>
                        <div className="resume-name">
                        
                            <h1 style={{fontWeight: "800 ", fontSize:"3rem"}}>{prompts.name}</h1>
                            <p style={{fontWeight: "400 ", fontSize:"2rem"}}>{prompts.des}</p>
                        </div>
                    </div>
        <div class="resume-content-two">
            
                <div class="resume-sub">
                                <input className="after-delete imagebutton" type="file"  accept="image/*"  onChange={ProfilePhotoChange}/>
                                <div class="resume-mycontact">
                                    <h3>My Contact</h3>
                                    <div class="resume-line"></div>
                                    <p>{prompts.email}</p>
                                    <p>{prompts.phone}</p>
                                    <p>{prompts.linked}</p>
                                    <p>{prompts.address}</p>
                                    
                                </div>
                            <div className="resume-hardskill">
                                    <h3>Hard Skill</h3>
                                    <div className="resume-line"></div>
                                    <ul>
                                            {/* {console.log(skill)} */}
                                            {Array.isArray(prompts.skill)?prompts.skill.map(fun):skill.map(fun)}
                                        
                                        
                                    </ul>
                            </div>
                        <div className="resume-softskill">
                            <h3>Soft Skill</h3>
                            <div class="resume-line"></div>
                            <ul>
                                <li>
                                    Observation
                                </li>
                                <li>
                                    Decision making
                                </li>
                                <li>
                                    Communication
                                </li>
                                <li>
                                    Multi-tasking
                                </li>
                            </ul>
                        </div>
                    <div className="resume-education">
                        <h3>Education Background</h3>
                        <div className="resume-line"></div>
                        <ul>
                            <li>
                                Borcelle Business School
                                Masters in Accounting
                                Completed in 2016
                            </li>
                            <li>
                                Larana Business School
                                Certificate in Financial Management,
                                Financial Analysis, and Public Budgeting
                                Completed in 2014
                            </li>
                            <li>
                                Borcelle Business School
                                Bachelor of Economics, Major in Finance,
                                Minor in Data Analytics
                                Completed in 2012
                            </li>
                        </ul>
                    </div>
                    <S2></S2>
                    <button className="after-delete button" contenteditable="false" style={{cursor:"pointer"} } onMouseOver={()=>{
                    setValue2(!value2);
                } } onMouseOut={()=>{
                    setValue2(!value2);
                }}><span>Add Section</span></button>
                <form className="section-form" action="" style={value2?{position:"absolute",width:"30%",padding:"50px"}:{position:"absolute",visibility:"hidden"}} onMouseOver={()=>{
                    setValue2(!value2);
                } } onMouseOut={()=>{
                    setValue2(!value2);
                }}>
                     <input type="text" value={empty2.heading2} name="heading2" placeholder="Its Heading" onChange={heading2} autocomplete="off"/>
                    <br />
                    <textarea name="tA2" id="" cols="30" rows="10" value={empty2.tA2} placeholder="Write Paragraph"  onChange={heading2} autocomplete="off"></textarea>
                    <br />
                    <input type="text" value={empty2.list2} name="list2" placeholder="List Item(Any)" onChange={heading2} autocomplete="off"/>
                    <br />
                    <button className="add add2" onClick={AddSection2} contenteditable="false"><span>Add</span></button>
                </form>
                </div>
              <div className="resume-main">
                    <div className="resume-About-Me">
                        <h3>About Me</h3>
                        <div className="resume-line"></div>
                        <p>Dedicated and detail-oriented Financial Analyst with 10
                            years of experience. Eager to apply proven-budget
                            maximization skills for Bank of Brocelle in monitoring,
                            maintaining, and completing client billing and
                            reconciliations. Special interest in achieving the
                            millennial market and helping with retirement and
                            general financial planning.</p>
                    </div>
                <div className="resume-prop">
                    <div className="resume-propExp1">
                    <h3>Professional Experience</h3>
                    <div className="resume-line"></div>
                    <p>Ginyard International Co. | Financial Analyst
                        2020 – Present
                    </p>
                    <p>Key responsibilities</p>
                    <ul>
                        <li>Analyze current and past financial dat</li>
                        <li>Look at recent financial performance and identify trends
                        </li>
                        <li>Prepare reports on the above information and communicate the
                            insights of these reports to the broader business
                            </li>
                        <li>Consult with the management team to develop long-term
                            commercial plans</li>
                        <li>Suggest budgets and improvements based on the above
                            information
                            </li>
                        </ul>
                    </div>
                    <div className="resume-propExp2">
                        <p>Ginyard International Co. | Financial Analyst
                            2020 – Present
                        </p>
                        <p>Key responsibilities</p>
                        <ul>
                            <li>Analyze current and past financial dat</li>
                            <li>Look at recent financial performance and identify trends
                            </li>
                            <li>Prepare reports on the above information and communicate the
                                insights of these reports to the broader business
                                </li>
                            <li>Consult with the management team to develop long-term
                                commercial plans</li>
                            <li>Suggest budgets and improvements based on the above
                                information
                                </li>
                            
                            </ul>
                    </div>
                    <div className="resume-propExp2">
                        <p>Ginyard International Co. | Financial Analyst
                            2020 – Present
                        </p>
                        <p>Key responsibilities</p>
                        <ul>
                            <li>Analyze current and past financial dat</li>
                            <li>Look at recent financial performance and identify trends
                            </li>
                            <li>Prepare reports on the above information and communicate the
                                insights of these reports to the broader business
                                </li>
                            <li>Consult with the management team to develop long-term
                                commercial plans</li>
                            <li>Suggest budgets and improvements based on the above
                                information
                                </li>
                            
                            </ul>
                    </div>
                            <div className="resume-propExp2">
                                <p>Ginyard International Co. | Financial Analyst
                                    2020 – Present
                                </p>
                                <p>Key responsibilities</p>
                                <ul>
                                    <li>Analyze current and past financial dat</li>
                                    <li>Look at recent financial performance and identify trends
                                    </li>
                                    <li>Prepare re ports on the above information and communicate the
                                        insights of these reports to the broader business
                                        </li>
                                    <li>Consult with the management team to develop long-term
                                        commercial plans</li>
                                    <li>Suggest budgets and improvements based on the above
                                        information
                                        </li>
                                    
                                </ul>
                            </div>
                </div>
                <S></S>
                
                <button className="after-delete button" contenteditable="false" style={{cursor:"pointer"} } onMouseOver={()=>{
                    setValue(!value);
                } } onMouseOut={()=>{
                    setValue(!value);
                }}><span>Add Section</span></button>
                <form className="section-form" contentEditable="false" action="" style={value?{position:"absolute",width:"30%",padding:"30px"}:{position:"absolute",visibility:"hidden"}} onMouseOver={()=>{
                    setValue(!value);
                } } onMouseOut={()=>{
                    setValue(!value);
                }}>  
                    
                    <input type="text" placeholder="Write Paragraph" name="heading" value={empty.heading} onChange={heading} autocomplete="off"/>
                    <br />
                    <textarea name="tA" id="" cols="30" rows="10" placeholder="Write Paragraph" value={empty.tA} onChange={heading}></textarea>
                    <br />
                    <input type="text" placeholder="List Item(Any)" name="list" onChange={heading} value={empty.list} autocomplete="off"/>
                    <br />
                    <button className="add add1" onClick={AddSection} contenteditable="false"><span>Add</span> </button>

                </form>
              </div>
              
        </div>
        
    </div>
    <button className="button download after-delete" style={value?{"opacity":0}:{"opacity":1}} onClick={download}> <span>Download</span></button>
    <button className="button download after-delete" style={value?{"opacity":0}:{"opacity":1}} onClick={save}> <span>Save</span></button>

    </div>
    )
}

export default FirstResume;
