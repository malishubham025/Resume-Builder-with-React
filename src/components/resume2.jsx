import React, { useRef } from "react";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from "axios";
import { Navigate } from "react-router-dom";
function ResumeTwo(){
  const pdfRef=useRef();
    var [val,show]=React.useState(false);
    var [count,setcount]=React.useState(0);
    var [section,setSection]=React.useState({
        id:count,
        heading:null,
        subheading:null,
        text:null,
        paragraph:null

    })
    var [list,AddList]=React.useState([]);
    function setfalse(){
           show(!val);
    }
    function settrue(){
        show(!val);
    }
    function save(){
      const input=pdfRef.current;
      const data={
          templateid:2,
          templatedata:input.innerHTML
      }
      axios.post("http://localhost:5000/saveTemplate",data).then((res)=>{
          if(res.status==200){
              alert("saved !");
              <Navigate to ="/template1"></Navigate>
          }
      })
  }
    const download=()=>{
      const input=pdfRef.current;
      // setTimeout(()=>{
          var addsection=document.querySelectorAll(".after-delete");
          addsection.forEach((a)=>{
                 a.classList.add("temp-remove");
          })
          

      // },5000);
      
      html2canvas(input).then((canvas)=>{
          const imgData=canvas.toDataURL('image/png');
          const pdf=new  jsPDF('p','mm','a4',true);
          const pdfWidth=pdf.internal.pageSize.getWidth();
          const pdfHeight=pdf.internal.pageSize.getHeight();
          const imgWidth=canvas.width;
          const imgHeight=canvas.height;
          const ratio=Math.min(pdfWidth/imgWidth,pdfHeight/imgHeight);
          const imgX=(pdfWidth-imgWidth*ratio)/2;
          const imgY=30;
          pdf.addImage(imgData,'PNG',imgX,imgY,imgWidth*ratio,imgHeight*ratio);
          pdf.save('Resume.pdf');
      });
      addsection.forEach((a)=>{
          a.classList.remove("temp-remove");
   })

  };
  
    function change(event){
          var name=event.target.name;
          var value=event.target.value;
          if(name==="heading"){
            setSection((pvalue)=>{
                return{
                    ...pvalue,
                    heading:value
                }
            })
          }
          if(name==="subheading"){
            setSection((pvalue)=>{
                return{
                    ...pvalue,
                    subheading:value
                }
            })
          }
          if(name==="text"){
            setSection((pvalue)=>{
                return{
                    ...pvalue,
                    text:value
                }
            })
          }  
          if(name==="paragraph"){
            setSection((pvalue)=>{
                return{
                    ...pvalue,
                    paragraph:value
                }
            })
          }
         
    }
    function addlist(event) {
        AddList((prevList) => [...prevList, section]);

        setcount(++count);
        setSection({heading: "", subheading: "", paragraph: "", text: "" });
        
         console.log(list);
        event.preventDefault();
      }
      function del(ind){
        // // alert("hello");
        //console.log(ind);
        // // console.log(list);
        AddList(list.filter((element,index)=>{
            return index!==ind;
        }))
        // setSection()
      }
      var [url,changeurl]=React.useState("../images/jhon.png");
      function changephoto(event){
        var file=event.target.files[0];
        changeurl(URL.createObjectURL(file));

      }
      function Addlisttopage() {
        return (
          <div >
            {list.map((val, index) => (
              <div key={index}>
                <div className="heading">
                  <div className="before"></div>
                  <div>
                    <p>{val.heading}</p>
                  </div>
                </div>
                <p className="subheading">{val.subheading}</p>
                <p className="lightheading">{val.text}</p>
                <p className="lightheading">{val.paragraph}</p>
                <button
                  className="after-delete"
                  onClick={() => {
                    del(index);
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        );
      }
      
      
    return(
        <div ref={pdfRef} >
             <div  class="resume_two" >
       
              <div contentEditable="true"  class="nameandinfo">
                  <div class="back">
                      <div class="name2">
                          <p>Shubham</p>
                          <p>Mali</p>
                          
                          <p class="profession">Student</p>
                      </div>

                        
                  </div>
                  <div class="profile">
                      <div class="photo2" contentEditable="false">
                          <div class="photo">
                          <img  src={url?url:"../images/jhon.png"} alt="" />
                          </div>
                      </div>
                      <div class="section">
                        <div contentEditable="false">
                        <input type="file" accept="image/*" onChange={changephoto} />
                        </div>
                          <h4>PROFILE</h4>
                          <p>
                            business Administration Student.I consider myself a responsible and orderly person. I am looking forward for my first work experience
                          </p>
                          <div class="contact-me">
                              <h4>Contact Me</h4>
                              <p>123-456-789</p>
                              <p>hello@gmail.com</p>
                              <p>123,Anywhere St.,Any City ST 1234</p>
                          </div>

                      </div>
                      

                  </div>
                  <div class="profile-two">

                      <div class="profile-div">
                      <div class="education">
                          <div class="heading">
                              <div class="before" ></div>
                              <div><p> Education</p></div>
                              
                          </div>
                          
                          <p class="subheading">BORCELLE UNIVERSITY</p>
                          <p class="lightheading1">Business Administration career, in progress</p>
                          <p class="subheading">FAUGET COLLEGE</p>
                          <p class="lightheading">2018-2022</p>
                    </div>
                    <div class="language">
                      <div class="heading">
                          <div class="before"></div>
                          <div><p> Language</p></div>
                          
                      </div>                    
                        <p class="lightheading">Native English.</p>
                        <p class="lightheading">Advance d spanish.</p>
                  </div>
                  <div class="computerSkills">
                      <div class="heading">
                          <div class="before"></div>
                          <div><p> Computer Science</p></div>
                          
                      </div>  
                    <p class="lightheading">Text processor.</p>                 
                    <p class="lightheading">Spreadsheet.</p>
                    <p class="lightheading">Slide  presentation.</p>
                  </div>
                  <div class="education">
                  <div class="heading">
                      <div class="before"></div>
                      <div><p> VOLUNTEER EXPERIENCE</p></div>
                      
                  </div> 
                    <p class="subheading">INGOUDE COMPANY</p>
                    <p class="lightheading">Participation in collections to distribute in low-income schools.</p>
                  </div>
                  {/* {list.map(addlisttopage)} */}
                  <Addlisttopage></Addlisttopage>
                  <div contentEditable="false">
                  <button    className="after-delete button" onMouseOver={settrue} onMouseOut={setfalse}><span>Add Section</span></button>
                  <form   style={val?{visibility:"visible"}:{visibility:"hidden"}}  onMouseOver={settrue} onMouseOut={setfalse}  className="r2-form section-form" action="">
                    <input type="text" onChange={change} name="heading" value={section.heading}  placeholder="heading" autocomplete="off"/>
                    <br />
                    <input type="text" onChange={change} name="subheading" value={section.subheading} placeholder="Sub heading " autocomplete="off"/>
                    <br />
                    <input type="text" onChange={change} name="text" value={section.text} placeholder="text" autocomplete="off"/>
                    <br />
                    <textarea  id="" cols="30" name="paragraph" onChange={change} value={section.paragraph} rows="10" autocomplete="off"></textarea>
                    <br />
                    <button  className="after-delete add" onClick={addlist}> <span>Add</span> </button>
                  </form>
                  </div>
                      </div>
                  </div>

              </div>

              </div>
              <button className="after-delete download button" style={val?{visibility:"hidden"}:{visibility:"visible"}} onClick={download}><span>download</span></button>
             <button className="button download after-delete" style={val?{"opacity":0}:{"opacity":1}} onClick={save}> <span>Save</span></button>

        </div>
    )
}
export default ResumeTwo;